
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      const message = "ইমেইল ও পাসওয়ার্ড লিখুন।";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (result.error) {
        const message =
          result.error.message ||
          "সাইন ইন করা যায়নি। ইমেইল ও পাসওয়ার্ড পরীক্ষা করুন।";

        setError(message);
        toast.error(message);
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      router.push("/");
      router.refresh();
    } catch {
      const message =
        "সাইন ইন করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignin(provider: "google" | "github") {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        const message =
          result.error.message || "সোশ্যাল সাইন ইন করা যায়নি।";

        setError(message);
        toast.error(message);
        setSocialLoading("");
      }
    } catch {
      const message = "সাইন ইন শুরু করা যায়নি। আবার চেষ্টা করুন.";

      setError(message);
      toast.error(message);
      setSocialLoading("");
    }
  }

  const isBusy = loading || socialLoading !== "";

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#f8fbf8] px-4 py-10 sm:py-12">
      <div className="mx-auto flex w-full max-w-[416px] flex-col items-center">
        {/* Page heading */}
        <div className="mb-6 text-center">
          <h1 className="text-[25px] font-bold tracking-tight text-[#252c27] sm:text-[27px]">
            সাইন ইন
          </h1>

          <p className="mt-1.5 text-[13px] text-[#737b75] sm:text-sm">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign-in card */}
        <section className="w-full rounded-2xl border border-[#e0e7e1] bg-white/60 p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[13px] font-medium text-[#303832]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={isBusy}
                className="h-[41px] w-full rounded-lg border border-[#dfe6e0] bg-transparent px-3 text-[13px] text-[#252c27] outline-none transition placeholder:text-[#858c86] focus:border-green-700 focus:ring-2 focus:ring-green-700/10 disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[13px] font-medium text-[#303832]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                disabled={isBusy}
                className="h-[41px] w-full rounded-lg border border-[#dfe6e0] bg-transparent px-3 text-[13px] text-[#252c27] outline-none transition placeholder:text-[#858c86] focus:border-green-700 focus:ring-2 focus:ring-green-700/10 disabled:opacity-60"
              />
            </div>

            {/* Form error */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-[12px] leading-5 text-red-700"
              >
                {error}
              </p>
            )}

            {/* Sign-in button */}
            <button
              type="submit"
              disabled={isBusy}
              className="flex h-[42px] w-full items-center justify-center rounded-lg bg-green-700 px-4 text-[13px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.16)] transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#dfe5df]" />
            <span className="text-[12px] text-[#6f776f]">অথবা</span>
            <div className="h-px flex-1 bg-[#dfe5df]" />
          </div>

          {/* Social sign-in buttons */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => handleSocialSignin("google")}
              className="flex h-[41px] items-center justify-center gap-2 rounded-lg border border-[#dfe6e0] bg-transparent px-2 text-[12px] font-semibold text-[#303832] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                viewBox="0 0 48 48"
                aria-hidden="true"
                className="h-[15px] w-[15px] shrink-0"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.43 37.95 46.98 31.8 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>

              {socialLoading === "google"
                ? "Google-এ সংযোগ হচ্ছে..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              disabled={isBusy}
              onClick={() => handleSocialSignin("github")}
              className="flex h-[41px] items-center justify-center gap-2 rounded-lg border border-[#dfe6e0] bg-transparent px-2 text-[12px] font-semibold text-[#303832] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-[15px] w-[15px] shrink-0 fill-current"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.76 2.06 3.04 1.56.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.05-1.15 3.05-1.15.61 1.55.23 2.69.11 2.98.72.78 1.16 1.78 1.16 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              {socialLoading === "github"
                ? "GitHub-এ সংযোগ হচ্ছে..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          {/* Link to signup */}
          <p className="mt-4 text-center text-[12px] text-[#424a43]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-green-700 hover:text-green-800 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        {/* Back to home */}
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-[#828a83] transition hover:text-green-700"
        >
          <ArrowLeft size={14} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}