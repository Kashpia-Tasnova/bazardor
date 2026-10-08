import Hero from "@/components/Hero";
import PriceIncreasedSection from "@/components/PriceIncreasedSection";
import PriceDecreasedSection from "@/components/PriceDecreasedSection";
import AllProductsSection from "@/components/AllProductsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fbf8]">
      <Hero />

      <div className="mt-7">
        <PriceIncreasedSection />
      </div>

      <div className="mt-7">
        <PriceDecreasedSection />
      </div>

      <div className="mt-7">
        <AllProductsSection />
      </div>
    </main>
  );
}