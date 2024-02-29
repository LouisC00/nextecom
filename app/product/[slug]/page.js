import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductImage from "@/components/product/ProductImage";
import ProductLike from "@/components/product/ProductLike";
import ProductRating from "@/components/product/ProductRating";
import UserReviews from "@/components/product/UserReviews";

export async function generateMetadata({ params }) {
  const product = await getProduct(params?.slug);

  return {
    title: product?.title,
    description: product?.description?.substring(0, 160),
    openGraph: {
      images: product?.images[0]?.secure_url,
    },
  };
}

dayjs.extend(relativeTime);

async function getProduct(slug) {
  try {
    const response = await fetch(`${process.env.API}/product/${slug}`, {
      method: "GET",
      next: { revalidate: 1 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ProductViewPage({ params }) {
  const product = await getProduct(params.slug);

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card">
            <ProductImage product={product} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <div className="card-text">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.description.replace(/\./g, "<br/><br/>"),
                  }}
                ></div>

                <div className="alert alert-primary">
                  Brand: {product?.brand}
                </div>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-between">
              <small className="text-muted">
                Category: {product.category.name}
              </small>
              <small className="text-muted">
                Tags: {product.tags.map((tag) => tag.name).join(" ")}
              </small>{" "}
            </div>

            <div className="card-footer d-flex justify-content-between">
              <ProductLike product={product} />
              <small>Posted {dayjs(product?.createdAt).fromNow()}</small>
            </div>

            <div className="card-footer">
              <ProductRating product={product} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">Add to cart / wishlist</div>
      </div>

      <div className="row">
        <div className="col my-5">
          <p className="lead">Related products</p>
        </div>
      </div>

      <div className="row">
        <div className="col my-5">
          <UserReviews reviews={product?.ratings} />
        </div>
      </div>
    </div>
  );
}
