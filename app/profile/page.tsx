"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Undo2, LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const DISPLAY_NAME_STORAGE_PREFIX = "bazardor-display-name:";
const DISPLAY_NAME_EVENT = "bazardor-display-name-updated";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const userId = user?.id ? String(user.id) : "";

  const originalName = user?.name?.trim() || "";
  const email = user?.email?.trim() || "";
  const image = user?.image || "";

  const [displayName, setDisplayName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [loadingName, setLoadingName] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Load the custom BazarDor display name for the current user.
  useEffect(() => {
    if (isPending) return;

    if (!userId) {
      setDisplayName("");
      setSavedName("");
      setLoadingName(false);
      return;
    }

    try {
      const storageKey = `${DISPLAY_NAME_STORAGE_PREFIX}${userId}`;
      const storedName = localStorage.getItem(storageKey)?.trim() || "";
      const initialName = storedName || originalName;

      setDisplayName(initialName);
      setSavedName(initialName);
    } catch {
      setDisplayName(originalName);
      setSavedName(originalName);
    } finally {
      setLoadingName(false);
    }
  }, [isPending, userId, originalName]);

  // Redirect signed-out users to the sign-in page.
  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  function handleSaveName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId) {
      toast.error("আপনাকে প্রথমে লগ ইন করতে হবে।");
      return;
    }

    const trimmedName = displayName.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length > 60) {
      toast.error("নাম সর্বোচ্চ ৬০ অক্ষরের হতে পারবে।");
      return;
    }

    setSaving(true);

    try {
      const storageKey = `${DISPLAY_NAME_STORAGE_PREFIX}${userId}`;
      localStorage.setItem(storageKey, trimmedName);

      setDisplayName(trimmedName);
      setSavedName(trimmedName);

      // Tell the navbar to reload the saved display name.
      window.dispatchEvent(new Event(DISPLAY_NAME_EVENT));

      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch {
      toast.error("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

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

  const userName = savedName || originalName || email || "ব্যবহারকারী";
  const firstLetter = userName.trim().charAt(0).toLocaleUpperCase();

  if (isPending || loadingName || !user) {
    return (
      <main className="flex min-h-[55vh] items-center justify-center bg-[#f1f5f0]">
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <LoaderCircle className="h-5 w-5 animate-spin text-green-700" />
          প্রোফাইল লোড হচ্ছে...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] bg-[#f1f5f0] px-4 pb-14">
      <div className="mx-auto max-w-[736px] pt-10">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile summary card */}
        <section className="rounded-2xl border border-zinc-200 bg-[#fafcfa] p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              {image && !imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt={`${userName} এর প্রোফাইল`}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-20 w-20 shrink-0 rounded-2xl bg-zinc-100 object-cover"
                />
              ) : (
                <div
                  aria-label={`${userName} এর প্রোফাইল`}
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-3xl font-semibold text-white"
                >
                  {firstLetter}
                </div>
              )}

              <div className="min-w-0">
                <h2 className="truncate text-xl font-medium text-zinc-900">
                  {userName}
                </h2>
                <p className="mt-0.5 truncate text-base text-zinc-500">
                  {email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-md border border-red-500 bg-transparent px-4 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Undo2 className="h-4 w-4" />
              )}
              {loggingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </section>

        {/* Info card */}
        <section className="mt-6 rounded-2xl border border-zinc-200 bg-[#fafcfa] px-5 pb-10 pt-6">
          <h2 className="text-base font-semibold text-zinc-900">তথ্য</h2>

          <form onSubmit={handleSaveName} className="mt-8 px-6">
            <label
              htmlFor="displayName"
              className="mb-2 block text-sm text-zinc-800"
            >
              নাম
            </label>

            <input
              id="displayName"
              name="displayName"
              type="text"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              autoComplete="name"
              maxLength={60}
              required
              className="h-10 w-full rounded-lg border border-zinc-200 bg-[#fafcfa] px-3 text-sm text-zinc-900 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
            />

            <button
              type="submit"
              disabled={saving}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#078a40] text-sm font-medium text-white shadow-md shadow-green-900/20 transition hover:bg-[#067536] focus:outline-none focus:ring-4 focus:ring-green-700/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && <LoaderCircle className="h-4 w-4 animate-spin" />}
              {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}