import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex min-h-[68px] w-full max-w-[1135px] items-center justify-between px-4 sm:px-6 lg:px-0">
        
        {/* Logo and Website Information */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর"
            width={42}
            height={42}
            priority
            className="h-[42px] w-[42px] rounded-[10px]"
          />

          <div className="flex flex-col">
            <h1 className="text-[20px] font-bold leading-tight tracking-tight text-zinc-900 sm:text-[22px]">
              বাজার দর
            </h1>

            <p className="mt-0.5 text-[10px] leading-tight text-zinc-500 sm:text-[11px]">
              সোমবার, ৬ অক্টোবর, ২০২৬
            </p>
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            className="text-sm font-medium text-zinc-800 transition-colors hover:text-green-700 sm:text-[15px]"
          >
            সাইন ইন
          </button>

          <button
            type="button"
            className="rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-green-800 hover:shadow-md sm:px-5 sm:text-[15px]"
          >
            সাইন আপ
          </button>
        </div>
      </div>
    </nav>
  );
}