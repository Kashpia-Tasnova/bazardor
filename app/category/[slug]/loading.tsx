export default function Loading() {
  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#f8fbf8]">
      <div className="mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-6 lg:px-0">
        {/* Category header skeleton */}
        <div className="animate-pulse rounded-2xl border border-[#e1e7e2] bg-white px-5 py-6 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#edf2ee]" />

            <div>
              <div className="h-6 w-20 rounded bg-[#edf2ee]" />
              <div className="mt-2 h-4 w-52 rounded bg-[#edf2ee]" />
            </div>
          </div>
        </div>

        {/* Sort skeleton */}
        <div className="mt-6 flex h-16 animate-pulse items-center justify-end rounded-2xl border border-[#e1e7e2] bg-white px-6">
          <div className="h-9 w-24 rounded-lg bg-[#edf2ee]" />
        </div>

        {/* Product skeletons */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-[#e1e7e2] bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-[#edf2ee]" />

                <div>
                  <div className="h-4 w-28 rounded bg-[#edf2ee]" />
                  <div className="mt-2 h-3 w-16 rounded bg-[#edf2ee]" />
                </div>
              </div>

              <div className="mt-6 h-3 w-20 rounded bg-[#edf2ee]" />
              <div className="mt-2 h-6 w-24 rounded bg-[#edf2ee]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}