import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
};

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

function toBanglaNumber(value: number | string) {
  return String(value).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

function toBanglaUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    g: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    ml: "মিলিলিটার",
    piece: "পিস",
    pcs: "টি",
    dozen: "ডজন",
  };

  return units[unit.toLowerCase()] || unit;
}

function formatPrice(value: number) {
  return toBanglaNumber(
    Number(value.toFixed(2)).toString()
  );
}

async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await response.json();

  const matchedProduct = products.find(
    (product) => product.slug === slug
  );

  if (!matchedProduct) {
    return null;
  }

  const detailResponse = await fetch(
    `${API_URL}/products/${matchedProduct.id}`,
    { cache: "no-store" }
  );

  if (!detailResponse.ok) {
    if (detailResponse.status === 404) {
      return null;
    }

    throw new Error("Failed to fetch product details");
  }

  const data = await detailResponse.json();

  // Handle either a direct product object or { product: ... }.
  const product: Product = data.product ?? data;

  return product;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Step 1: Check the existing Better Auth session.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Step 2: Send signed-out visitors to the sign-in page.
  if (!session) {
    redirect("/signin");
  }

  // Step 3: Find the requested product.
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];
  const unit = toBanglaUnit(product.unit);

  const lowestPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const highestPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  // Average of each market's min/max midpoint.
  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0
        ) / markets.length
      : product.today;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const changePercentage = Math.abs(
    product.change?.pct ?? 0
  ).toFixed(1);

  return (
    <main className="min-h-screen bg-[#f8fbf8] px-4 pb-16 pt-7 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[940px]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex flex-wrap items-center gap-2 text-[11px] text-zinc-600"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-zinc-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product overview card */}
        <section className="mb-5 flex flex-col justify-between gap-5 rounded-[14px] border border-[#e0e9e1] bg-white p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[14px] bg-[#f0f5f0] text-[34px]">
              {product.image || product.categoryIcon}
            </div>

            <div className="min-w-0">
              <h1 className="text-[22px] font-bold leading-tight tracking-tight text-[#1c2921] sm:text-[26px]">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-[12px] text-zinc-500">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-[11px] text-zinc-700">
                {isUp
                  ? "গতকালের তুলনায় আজ দাম বেড়েছে"
                  : isDown
                    ? "গতকালের তুলনায় আজ দাম কমেছে"
                    : "গতকালের তুলনায় আজ দামের পরিবর্তন নেই"}
                {" · "}
                {toBanglaNumber(product.yesterday)} টাকা
              </p>
            </div>
          </div>

          {/* Today's price */}
          <div className="flex min-w-[100px] flex-col items-center justify-center self-start rounded-[14px] bg-[#f0f5f0] px-5 py-3 sm:self-auto">
            <p className="text-[10px] text-zinc-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-[28px] font-bold leading-none text-[#1c2921]">
              {toBanglaNumber(product.today)}
            </p>

            <p className="mt-1 text-[11px] text-zinc-500">
              টাকা / {unit}
            </p>

            <p
              className={`mt-2 text-[10px] font-semibold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-600"
                    : "text-zinc-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {toBanglaNumber(changePercentage)}%
            </p>
          </div>
        </section>

        {/* Summary card */}
        <section className="rounded-[14px] border border-[#e0e9e1] bg-white p-4 sm:p-5">
          <h2 className="mb-3 text-[15px] font-bold text-[#1c2921]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <div className="rounded-[13px] border border-[#e0e9e1] bg-white px-4 py-3">
              <p className="text-[10px] text-zinc-600">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-[21px] font-bold leading-tight text-green-600">
                {toBanglaNumber(lowestPrice)}{" "}
                <span className="text-[11px] font-normal">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-[10px] text-zinc-600">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-[13px] border border-[#e0e9e1] bg-white px-4 py-3">
              <p className="text-[10px] text-zinc-600">
                সর্বাধিক দাম
              </p>

              <p className="mt-1 text-[21px] font-bold leading-tight text-red-600">
                {toBanglaNumber(highestPrice)}{" "}
                <span className="text-[11px] font-normal">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-[10px] text-zinc-600">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-[13px] border border-[#e0e9e1] bg-white px-4 py-3">
              <p className="text-[10px] text-zinc-600">
                গড় দাম
              </p>

              <p className="mt-1 text-[21px] font-bold leading-tight text-green-600">
                {toBanglaNumber(formatPrice(averagePrice))}{" "}
                <span className="text-[11px] font-normal">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-[10px] text-zinc-600">
                প্রতি {unit}-এর হিসাবে
              </p>
            </div>
          </div>

          {/* Market price table */}
          <h2 className="mb-3 text-[15px] font-bold text-[#1c2921]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-hidden rounded-[13px] border border-[#e0e9e1]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left text-[11px]">
                  <thead>
                    <tr className="bg-[#fbfcfb] text-zinc-500">
                      <th className="px-3 py-3 font-semibold">
                        বাজার
                      </th>

                      <th className="px-3 py-3 font-semibold">
                        বিভাগ
                      </th>

                      <th className="px-3 py-3 text-right font-semibold">
                        সর্বনিম্ন
                      </th>

                      <th className="px-3 py-3 text-right font-semibold">
                        সর্বাধিক
                      </th>

                      <th className="px-3 py-3 text-right font-semibold">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => {
                      const marketAverage =
                        (market.min + market.max) / 2;

                      return (
                        <tr
                          key={`${market.market}-${market.division}-${index}`}
                          className={`border-t border-[#dce4dd] ${
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-[#f0f5f0]"
                          }`}
                        >
                          <td className="whitespace-nowrap px-3 py-3 text-zinc-800">
                            {market.market}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-zinc-700">
                            {market.division}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right text-zinc-800">
                            {toBanglaNumber(market.min)} টাকা
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right text-zinc-800">
                            {toBanglaNumber(market.max)} টাকা
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-zinc-900">
                            {toBanglaNumber(
                              formatPrice(marketAverage)
                            )}{" "}
                            টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="rounded-lg bg-[#f8fbf8] p-4 text-[12px] text-zinc-500">
              এই পণ্যের জন্য বর্তমানে কোনো বাজারের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
}