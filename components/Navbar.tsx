"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  UserRound,
  LoaderCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const user = session?.user;

  const userName = user?.name?.trim() || "ব্যবহারকারী";
  const userEmail = user?.email || "";

  const firstLetter = (
    userName !== "ব্যবহারকারী"
      ? userName.charAt(0)
      : userEmail.charAt(0) || "U"
  ).toUpperCase();

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setDropdownOpen(false);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "লগ আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে লগ আউট হয়েছে।");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগ আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex min-h-[68px] w-full max-w-[1135px] items-center justify-between px-4 sm:px-6 lg:px-0">
        {/* Logo and Website Information */}
        <Link href="/" className="flex items-center gap-3">
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

        {/* Authentication and User Menu */}
        <div className="flex items-center gap-3 sm:gap-5">
          {isPending ? (
            <div
              className="h-9 w-24 animate-pulse rounded-lg bg-zinc-100"
              aria-label="অপেক্ষা করুন"
            />
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-700/20 sm:gap-2.5 sm:pr-3"
              >
                {/* User Avatar */}
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${userName} এর প্রোফাইল`}
                    referrerPolicy="no-referrer"
                    className="h-9 w-9 rounded-full border border-zinc-200 object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 text-base font-semibold text-white">
                    {firstLetter}
                  </span>
                )}

                <span className="hidden max-w-[150px] truncate text-[13px] font-medium text-zinc-800 sm:block">
                  {userName}
                </span>

                <ChevronDown
                  size={15}
                  className={`text-zinc-500 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Dropdown */}
              {dropdownOpen && (
                <>
                  <button
                    type="button"
                    aria-label="মেনু বন্ধ করুন"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setDropdownOpen(false)}
                  />

                  <div
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-2 w-[250px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg"
                  >
                    <div className="border-b border-zinc-100 px-4 py-3.5">
                      <p className="truncate text-sm font-semibold text-zinc-900">
                        {userName}
                      </p>

                      <p className="mt-1 truncate text-xs text-zinc-500">
                        {userEmail}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/profile"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] text-zinc-700 transition-colors hover:bg-green-50 hover:text-green-800"
                      >
                        <UserRound size={17} />
                        আমার প্রোফাইল
                      </Link>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loggingOut ? (
                          <LoaderCircle
                            size={17}
                            className="animate-spin"
                          />
                        ) : (
                          <LogOut size={17} />
                        )}

                        {loggingOut ? "লগ আউট হচ্ছে..." : "লগ আউট"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Logged-out Buttons */}
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}