import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1135px] px-4 pt-7 sm:px-6 sm:pt-8 lg:px-0">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-[#f8fbf8]">
          <div className="relative flex min-h-[210px] items-center px-5 py-7 sm:min-h-[220px] sm:px-7 md:px-9 lg:min-h-[225px] lg:px-3">

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-[670px]">

              {/* Date */}
              <div className="mb-2.5 inline-flex rounded-full bg-[#e7f5eb] px-3 py-1 text-[10px] font-medium text-green-700 sm:text-[11px]">
                সোমবার, ৬ অক্টোবর, ২০২৬
              </div>

              {/* Heading */}
              <h1 className="text-[25px] font-bold leading-[1.25] tracking-tight text-zinc-900 sm:text-[29px] md:text-[31px] lg:text-[32px]">
                আজকের বাজারের দাম এক নজরে
              </h1>

              {/* Description */}
              <p className="mt-3 max-w-[650px] text-[11px] leading-[1.8] text-zinc-500 sm:text-[12px] md:text-[13px]">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক
                জায়গায়।
              </p>

              {/* Button */}
              <a
                href="#সব-পণ্য"
                className="mt-4 inline-flex items-center justify-center rounded-md bg-green-700 px-4 py-2 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-green-800 sm:px-5 sm:py-2.5 sm:text-[12px]"
              >
                সব পণ্য দেখুন
              </a>
            </div>

            {/* Hero Image */}
            <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[190px] w-[280px] -translate-y-1/2 sm:block md:right-5 md:h-[200px] md:w-[300px] lg:right-6 lg:h-[205px] lg:w-[315px]">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের পণ্য"
                fill
                priority
                sizes="315px"
                className="object-contain"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}