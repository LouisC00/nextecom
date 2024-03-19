import ProductList from "@/components/product/ProductList";
import TagsList from "@/components/tag/TagList";

// export const dynamic = "force-dynamic";

export async function generateMetadata({ slug }) {
  const category = await getCategory(slug);

  return {
    title: category?.name,
    description: `Best selling products on category ${category?.name}`,
  };
}

async function getCategory(slug) {
  try {
    const response = await fetch(`${process.env.API}/category/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching search results1:", error);
    return { category: null, products: [] }; // Return a default value in case of error
  }
}

export default async function CategoryViewPage({ params }) {
  const { category, products } = await getCategory(params?.slug);

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 mt-5">
            <div className="btn btn-raised border-20 col p-4 mb-3">
              {category?.name}
              <div className="mt-4">
                <TagsList category={category} />
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <p className="text-center lead fw-bold">
              Products in category "{category?.name}"
            </p>
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </main>
  );
}
