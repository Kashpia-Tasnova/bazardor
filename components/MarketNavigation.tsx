"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const API_BASE = "https://api.abcz.workers.dev/api/bazardor";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
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
    dir: "up" | "down";
    pct: number;
  };
};

export default function MarketNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [marketPrices, setMarketPrices] = useState<Product[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/products`),
        ]);

        if (!categoriesResponse.ok || !productsResponse.ok) {
          throw new Error("Failed to fetch BazarDor data");
        }

        const categoriesData: Category[] =
          await categoriesResponse.json();

        const productsData: Product[] =
          await productsResponse.json();

        setCategories(categoriesData);
        setMarketPrices(productsData);
      } catch (error) {
        console.error("Error fetching BazarDor data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsPaused(true);

      window.clearTimeout(
        (handleScroll as typeof handleScroll & { timer?: number }).timer
      );

      (handleScroll as typeof handleScroll & { timer?: number }).timer =
        window.setTimeout(() => {
          setIsPaused(false);
        }, 1000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCategoryClick = (slug: string) => {
    router.push(`/category/${slug}`);
  };

  return (
    <div className="w-full bg-white">
      {/* Category Navigation */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1135px] overflow-x-auto px-4 sm:px-6 lg:px-0">
          <div className="flex min-w-max items-center gap-6 py-2.5 sm:gap-8">
            {categories.map((category) => {
              const isActive =
                pathname === `/category/${category.slug}`;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    handleCategoryClick(category.slug)
                  }
                  className={`flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[12px] transition-colors sm:text-[13px] ${
                    isActive
                      ? "bg-green-700 font-semibold text-white"
                      : "font-medium text-zinc-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <span className="text-[12px]">
                    {category.icon}
                  </span>

                  <span>{category.nameBn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Price Marquee */}
      <div className="sticky top-[68px] z-40 w-full overflow-hidden border-b border-zinc-200 bg-white">
        <div
          className={`flex w-max ${
            isPaused ? "" : "animate-market-marquee"
          }`}
        >
          {[...marketPrices, ...marketPrices].map(
            (item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex h-[38px] items-center border-r border-zinc-200 px-4 sm:px-5"
              >
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-[11px]">
                    {item.image || item.categoryIcon}
                  </span>

                  <span className="text-[11px] font-medium text-zinc-700 sm:text-[12px]">
                    {item.nameBn}
                  </span>

                  <span className="text-[11px] text-zinc-500 sm:text-[12px]">
                    {item.today} টাকা/{item.unit}
                  </span>

                  <span
                    className={`text-[10px] font-semibold sm:text-[11px] ${
                      item.change.dir === "up"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.change.dir === "up" ? "▲" : "▼"}{" "}
                    {item.change.pct}%
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}