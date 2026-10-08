"use client";

import { useEffect, useState } from "react";

const categories = [
  { icon: "⚪", name: "চাল" },
  { icon: "🫘", name: "ডাল" },
  { icon: "🛢️", name: "তেল" },
  { icon: "🥬", name: "সবজি" },
  { icon: "🐟", name: "মাছ" },
  { icon: "🍗", name: "মাংস" },
  { icon: "🥛", name: "দুধ-মধু" },
  { icon: "🌶️", name: "মসলা" },
];

const marketPrices = [
  {
    icon: "⚪",
    name: "স্বর্ণমতি চাল",
    price: "১৪৮ টাকা/কেজি",
    change: "▲ ৫.৬%",
    type: "up",
  },
  {
    icon: "⚪",
    name: "মিনিকেট চাল",
    price: "৯৯ টাকা/কেজি",
    change: "▼ ২.৯%",
    type: "down",
  },
  {
    icon: "⚪",
    name: "বাটাম সাইজ চাল",
    price: "৬৬ টাকা/কেজি",
    change: "▲ ০.৫%",
    type: "up",
  },
  {
    icon: "🫘",
    name: "মসুর ডাল",
    price: "৪২৯ টাকা/কেজি",
    change: "▲ ১.৯%",
    type: "up",
  },
  {
    icon: "🫘",
    name: "ছোলা",
    price: "৪২০ টাকা/কেজি",
    change: "▼ ২.৮%",
    type: "down",
  },
  {
    icon: "🫘",
    name: "আলাস ডাল",
    price: "২৮০ টাকা/কেজি",
    change: "▼ ১.২%",
    type: "down",
  },
];

export default function MarketNavigation() {
  const [activeCategory, setActiveCategory] = useState("চাল");
  const [isPaused, setIsPaused] = useState(false);

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

  return (
    <div className="w-full bg-white">
      {/* Category Navigation */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1135px] overflow-x-auto px-4 sm:px-6 lg:px-0">
          <div className="flex min-w-max items-center gap-6 py-2.5 sm:gap-8">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveCategory(category.name)}
                className={`flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-[12px] transition-colors sm:text-[13px] ${
                  activeCategory === category.name
                    ? "font-semibold text-zinc-900"
                    : "font-medium text-zinc-700 hover:text-green-700"
                }`}
              >
                <span className="text-[12px]">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
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
          {[...marketPrices, ...marketPrices].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex h-[38px] items-center border-r border-zinc-200 px-4 sm:px-5"
            >
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[11px]">{item.icon}</span>

                <span className="text-[11px] font-medium text-zinc-700 sm:text-[12px]">
                  {item.name}
                </span>

                <span className="text-[11px] text-zinc-500 sm:text-[12px]">
                  {item.price}
                </span>

                <span
                  className={`text-[10px] font-semibold sm:text-[11px] ${
                    item.type === "up"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}