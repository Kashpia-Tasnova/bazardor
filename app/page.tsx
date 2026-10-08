import Hero from "@/components/Hero";
import PriceIncreasedSection from "@/components/PriceIncreasedSection";
import PriceDecreasedSection from "@/components/PriceDecreasedSection";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="mt-7">
        <PriceIncreasedSection />
      </div>
    </>
  );
}