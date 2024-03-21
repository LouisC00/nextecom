import ProductFilter from "@/components/product/ProductFilter";
import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams.page || 1,
    minPrice: searchParams.minPrice || "",
    maxPrice: searchParams.maxPrice || "",
    ratings: searchParams.ratings || "",
    category: searchParams.category || "",
    tag: searchParams.tag || "",
    brand: searchParams.brand || "",
  }).toString();

  try {
    const response = await fetch(
      `${process.env.API}/product/filter?${searchQuery}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.products)) {
      throw new Error("Noo products returned");
    }

    return data;
  } catch (err) {
    console.log(err);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
}

export default async function Shop({ searchParams }) {
  const { products, currentPage, totalPages } = await getProducts(searchParams);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 overflow-auto" style={{ maxHeight: "90vh" }}>
          <ProductFilter searchParams={searchParams} />
        </div>
        <div className="col-lg-9 overflow-auto" style={{ maxHeight: "90vh" }}>
          <h4 className="text-center fw-bold mt-3">Shop Latest products</h4>

          <div className="row">
            {products?.map((product) => (
              <div className="col-lg-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <br />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pathname="/shop"
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
}

// import ProductFilter from "@/components/product/ProductFilter";
// import Pagination from "@/components/product/Pagination";
// import ProductCard from "@/components/product/ProductCard";
// import ProductList from "@/components/product/ProductList";

// export const dynamic = "force-dynamic";

// export const metadata = {
//   title: "Next Ecommerce",
//   description: "Find the latest in fashion, electronics and more",
// };

// // async function getProducts(searchParams) {
// //   const searchQuery = new URLSearchParams({
// //     page: searchParams.page || 1,
// //     minPrice: searchParams.minPrice || "",
// //     maxPrice: searchParams.maxPrice || "",
// //     ratings: searchParams.ratings || "",
// //     category: searchParams.category || "",
// //     tag: searchParams.tag || "",
// //     brand: searchParams.brand || "",
// //   }).toString();

// async function getProducts(searchParams) {
//   const searchQuery = new URLSearchParams({
//     page: searchParams?.page || 1,
//   }).toString();

//   try {
//     const response = await fetch(`${process.env.API}/product?${searchQuery}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       next: { revalidate: 1 },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch products");
//     }

//     const data = await response.json();

//     if (!data || !Array.isArray(data.products)) {
//       throw new Error("Noo products returned");
//     }

//     return data;
//   } catch (err) {
//     console.log(err);
//     return { products: [], currentPage: 1, totalPages: 1 };
//   }
// }

// export default async function Prducts({ searchParams }) {
//   // console.log("searchParams in products page => ", searchParams);
//   const data = await getProducts(searchParams);
//   return (
//     <main>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col">
//             <p className="text-center lead fw-bold">Latest Products</p>
//             <ProductList products={data?.products} />
//           </div>
//         </div>
//         <Pagination
//           currentPage={data?.currentPage}
//           totalPages={data?.totalPages}
//           pathname="/shop"
//           searchParams={searchParams}
//         />
//       </div>
//     </main>
//   );
// }
