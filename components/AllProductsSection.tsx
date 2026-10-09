import Link from "next/link";

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
};

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

function toBanglaNumber(value: number | string) {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(
    /\d/g,
    (digit) => banglaDigits[Number(digit)]
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
    pcs: "পিস",
    dozen: "ডজন",
  };

  return units[unit.toLowerCase()] || unit;
}

async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function AllProductsSection() {
  const products = await getProducts();

  return (
    <section
      id="সব-পণ্য"
      className="mx-auto w-full max-w-[1135px] px-4 pb-10 pt-1 sm:px-6 lg:px-0"
    >
      {/* Section heading */}
      <div className="mb-3">
        <h2 className="text-[16px] font-bold tracking-tight text-zinc-900">
          সব পণ্য
        </h2>

        <p className="mt-1 text-[9px] leading-[14px] text-zinc-500 sm:text-[10px]">
          মোট ৩৩ টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const unit = toBanglaUnit(product.unit);
          const change = product.change?.pct ?? 0;

          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";

          const formattedChange = Math.abs(change).toFixed(1);

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group"
            >
              <div className="relative h-[100px] rounded-[11px] border border-zinc-200 bg-white px-3.5 py-3 transition-shadow hover:shadow-sm">
                {/* Product image */}
                <div className="absolute left-3.5 top-3 flex h-[40px] w-[40px] items-center justify-center rounded-[9px] bg-[#f2f6f1] text-[22px]">
                  {product.image || product.categoryIcon}
                </div>

                {/* Product name + unit */}
                <div className="absolute left-[63px] right-3.5 top-3">
                  <h3 className="truncate text-[12px] font-semibold leading-[15px] text-zinc-800">
                    {product.nameBn}
                  </h3>

                  <p className="mt-[2px] text-[9px] leading-[12px] text-zinc-500">
                    প্রতি {unit}
                  </p>
                </div>

                {/* Price */}
                <div className="absolute left-3.5 top-[62px]">
                  <p className="text-[8px] leading-[10px] text-zinc-500">
                    আজকের দাম
                  </p>

                  <p className="mt-[2px] text-[14px] font-bold leading-[16px] text-zinc-900">
                    {toBanglaNumber(product.today)} টাকা
                  </p>
                </div>

                {/* Change badge */}
                <span
                  className={`absolute bottom-3 right-3.5 rounded-full px-2 py-[3px] text-[8px] font-semibold leading-none ${
                    isUp
                      ? "bg-[#fff1f1] text-red-600"
                      : isDown
                        ? "bg-[#effaf1] text-green-600"
                        : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {isUp
                    ? `▲ ${toBanglaNumber(formattedChange)}%`
                    : isDown
                      ? `▼ ${toBanglaNumber(formattedChange)}%`
                      : `—${toBanglaNumber(formattedChange)}%`}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}