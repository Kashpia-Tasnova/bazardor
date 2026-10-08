import { notFound } from "next/navigation";
import CategoryProductGrid from "../../../components/category/CategoryProductGrid";
const API_BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

async function getProducts(slug: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products?category=${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = await getProducts(slug);

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#f8fbf8]">
      <div className="mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-6 lg:px-0">
        {/* Category Header */}
        <section className="rounded-2xl border border-[#e1e7e2] bg-white px-5 py-6 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f3f7f3] text-3xl">
              {category.icon}
            </div>

            <div>
              <h1 className="text-[24px] font-bold leading-tight text-[#202622]">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-[14px] text-[#737a75]">
                {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও
                পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <CategoryProductGrid products={products} />
      </div>
    </main>
  );
}

function toBengaliNumber(value: number) {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";

  return value
    .toString()
    .split("")
    .map((digit) => bengaliDigits[Number(digit)] ?? digit)
    .join("");
}