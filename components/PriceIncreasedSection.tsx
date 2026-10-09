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
    dir: "up" | "down";
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
    dozen: "ডজন",
    pcs: "টি",
  };

  return units[unit.toLowerCase()] || unit;
}

async function getIncreasedProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await response.json();

  return products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
}

export default async function PriceIncreasedSection() {
  const products = await getIncreasedProducts();

  return (
    <section className="mx-auto w-full max-w-[1135px] px-4 sm:px-6 lg:px-0">
      {/* Section heading */}
      <div className="mb-3 flex items-center gap-1.5">
        <span className="text-[11px] text-red-600">▲</span>

        <h2 className="text-[16px] font-bold tracking-tight text-zinc-900">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const unit = toBanglaUnit(product.unit);

          return (
            <div
              key={product.id}
              className="relative h-[100px] rounded-[11px] border border-zinc-200 bg-white px-3.5 py-3"
            >
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

              {/* Price under image */}
              <div className="absolute left-3.5 top-[62px]">
                <p className="text-[8px] leading-[10px] text-zinc-500">
                  আজকের দাম
                </p>

                <p className="mt-[2px] text-[14px] font-bold leading-[16px] text-zinc-900">
                  {toBanglaNumber(product.today)} টাকা
                </p>
              </div>

              {/* Percentage */}
              <span className="absolute right-3.5 bottom-3 rounded-full bg-[#fff1f1] px-2 py-[3px] text-[8px] font-semibold leading-none text-red-600">
                ▲ {toBanglaNumber(product.change.pct)}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}