
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex min-h-[68px] w-full max-w-[1135px] items-center justify-between px-4 sm:px-6 lg:px-0">
        {/* Logo and Website Information */}
        <Link href="/" className="flex items-center gap-3">
          {/* Green Logo Background */}
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[9px] bg-green-700">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={30}
              height={30}
              priority
              className="h-[30px] w-[30px]"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-[18px] font-bold leading-tight tracking-tight text-zinc-900 sm:text-[20px]">
              বাজার দর
            </h1>

            <p className="mt-0.5 text-[9px] leading-tight text-zinc-500 sm:text-[10px]">
              সোমবার, ৬ অক্টোবর, ২০২৬
            </p>
          </div>
        </Link>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/signin"
            className="text-[13px] font-medium text-zinc-800 transition-colors hover:text-green-700 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-700 px-3.5 py-2 text-[13px] font-medium text-white shadow-sm transition-all hover:bg-green-800 hover:shadow-md sm:px-4 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      </div>
    </nav>
  );
}