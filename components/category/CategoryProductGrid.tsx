"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
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

type SortOption = "default" | "low" | "high";

export default function CategoryProductGrid({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sort === "high") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <section className="mt-6">
      {/* Sort bar */}
      <div className="flex min-h-[64px] items-center justify-end rounded-2xl border border-[#e1e7e2] bg-white px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-[#737a75]">সাজান</span>

          <div className="relative">
            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as SortOption)
              }
              className="h-9 appearance-none rounded-lg border border-[#d6ddd7] bg-white py-1 pl-3 pr-9 text-[14px] text-[#3f4541] outline-none transition focus:border-[#008f43]"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>

            <ChevronDown
              size={15}
              strokeWidth={1.8}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4f5651]"
            />
          </div>
        </div>
      </div>

      {/* Product count */}
      <p className="mb-4 mt-4 text-[14px] text-[#747b76]">
        মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#e1e7e2] bg-white py-16 text-center">
          <p className="text-[16px] text-[#737a75]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const changeText = bengaliPercent(product.change.pct);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-[#e1e7e2] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#cfd8d1] hover:shadow-sm"
    >
      {/* Product top */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3f7f3] text-[27px]">
            {product.image || product.categoryIcon}
          </div>

          <div>
            <h2 className="text-[16px] font-semibold leading-tight text-[#242a26]">
              {product.nameBn}
            </h2>

            <p className="mt-1 text-[13px] text-[#747a76]">
              প্রতি {getUnitText(product.unit)}
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-[12px] text-[#707772]">আজকের দাম</p>

          <p className="mt-0.5 text-[19px] font-bold text-[#252b27]">
            {toBengaliNumber(product.today)}{" "}
            <span className="text-[13px] font-normal">টাকা</span>
          </p>
        </div>

        <ChangeBadge
          direction={product.change.dir}
          percent={changeText}
        />
      </div>
    </Link>
  );
}

function ChangeBadge({
  direction,
  percent,
}: {
  direction: "up" | "down" | "flat";
  percent: string;
}) {
  if (direction === "up") {
    return (
      <span className="rounded-full bg-[#f1f7f2] px-2.5 py-1 text-[11px] font-medium text-[#e13d3d]">
        ▲ {percent}
      </span>
    );
  }

  if (direction === "down") {
    return (
      <span className="rounded-full bg-[#f1f7f2] px-2.5 py-1 text-[11px] font-medium text-[#0b9b4b]">
        ▼ {percent}
      </span>
    );
  }

  return (
    <span className="rounded-full bg-[#f1f7f2] px-2.5 py-1 text-[11px] font-medium text-[#737a75]">
      — {percent}
    </span>
  );
}

function getUnitText(unit: string) {
  switch (unit) {
    case "kg":
      return "কেজি";
    case "litre":
      return "লিটার";
    case "dozen":
      return "ডজন";
    case "piece":
      return "পিস";
    default:
      return unit;
  }
}

function toBengaliNumber(value: number) {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";

  return value
    .toString()
    .split("")
    .map((digit) => bengaliDigits[Number(digit)] ?? digit)
    .join("");
}

function bengaliPercent(value: number) {
  return `${toBengaliNumber(value)}%`;
}