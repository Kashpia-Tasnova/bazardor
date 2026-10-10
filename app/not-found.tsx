
import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
          <SearchX className="h-12 w-12 text-blue-600" />
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
          Error 404
        </p>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mb-2 text-lg font-semibold text-gray-700">
          Page Not Found
        </p>

        <p className="mx-auto mb-8 max-w-md leading-7 text-gray-500">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          পেজটি সরানো হয়েছে অথবা ঠিকানাটি ভুল হতে পারে।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition  focus:outline-none focus:ring-4 focus:ring-green-200"
        >
          <Home className="h-5 w-5" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}