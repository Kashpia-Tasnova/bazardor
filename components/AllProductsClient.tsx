"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";

export type Product = {
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

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

type SortOption = "default" | "price-asc" | "price-desc";

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

export default function AllProductsClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let list = products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;

      const matchesSearch =
        !query || product.nameBn.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.today - b.today);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.today - a.today);
    }

    return list;
  }, [products, search, activeCategory, sort]);

  return (
    <>
      {/* Section heading */}
      <div className="mb-3">
        <h2 className="text-[16px] font-bold tracking-tight text-zinc-900">
          সব পণ্য
        </h2>
      </div>

      {/* Search + category + sort bar */}
      <div className="mb-3 flex flex-col gap-3 rounded-[14px] border border-zinc-200 bg-white px-3.5 py-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative w-full shrink-0 lg:w-[190px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="পণ্যের নাম লিখুন..."
            className="h-[34px] w-full rounded-lg border border-zinc-200 bg-white pl-8 pr-3 text-[11px] text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
          />
        </div>

        {/* Category chips */}
        <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`inline-flex h-[28px] shrink-0 items-center rounded-full px-3.5 text-[10px] font-semibold transition ${
              activeCategory === "all"
                ? "bg-green-700 text-white shadow-sm"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            সব
          </button>

          {categories.map((category) => {
            const isActive = activeCategory === category.slug;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.slug)}
                className={`inline-flex h-[28px] shrink-0 items-center gap-1.5 rounded-full px-3 text-[10px] font-semibold transition ${
                  isActive
                    ? "bg-green-700 text-white shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                <span className="text-[11px] leading-none">
                  {category.icon}
                </span>
                {category.nameBn}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div className="flex shrink-0 items-center gap-2">
          <label
            htmlFor="sort"
            className="text-[11px] text-zinc-500"
          >
            সাজান
          </label>

          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-[34px] w-[110px] cursor-pointer appearance-none rounded-lg border border-zinc-200 bg-white pl-3 pr-8 text-[11px] text-zinc-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="mb-3 text-[9px] leading-[14px] text-zinc-500 sm:text-[10px]">
        মোট {toBanglaNumber(visibleProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product grid */}
      {visibleProducts.length === 0 ? (
        <div className="rounded-[11px] border border-zinc-200 bg-white px-4 py-10 text-center text-[12px] text-zinc-500">
          কোনো পণ্য পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => {
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
                        : `— ${toBanglaNumber(formattedChange)}%`}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}