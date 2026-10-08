export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1135px] flex-col gap-2 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-0">
        {/* Left side */}
        <p className="text-[10px] text-zinc-600 sm:text-[11px]">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right side */}
        <p className="text-[9px] text-zinc-400 sm:text-[10px] md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}