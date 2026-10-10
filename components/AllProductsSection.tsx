import AllProductsClient, {
  type Category,
  type Product,
} from "./AllProductsClient";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export default async function AllProductsSection() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <section
      id="সব-পণ্য"
      className="mx-auto w-full max-w-[1135px] px-4 pb-10 pt-1 sm:px-6 lg:px-0"
    >
      <AllProductsClient products={products} categories={categories} />
    </section>
  );
}