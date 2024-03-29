"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductImage from "@/components/product/ProductImage";
import ProductLike from "@/components/product/ProductLike";
import ProductRating from "@/components/product/ProductRating";
import UserReviews from "@/components/product/UserReviews";
import CouponCode from "@/components/product/CouponCode";
import AddToCart from "@/components/product/AddToCart";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { useSession } from "next-auth/react";

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

import { useState, useEffect } from "react";
import Loading from "@/app/loading";

export default function ProductViewPage({ params }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { product, relatedProducts } = await getProduct(params?.slug);
      setProduct(product);
      setRelatedProducts(relatedProducts);
    };
    fetchData();
  }, [params.slug]);

  const { data } = useSession();
  const updateProductRatings = (newRating, newComment) => {
    const existingRatingIndex = product.ratings.findIndex(
      (rating) => rating.postedBy._id === data.user._id
    );

    if (existingRatingIndex !== -1) {
      // Update the existing rating
      const updatedRatings = [...product.ratings];
      updatedRatings[existingRatingIndex] = {
        ...updatedRatings[existingRatingIndex],
        rating: newRating,
        comment: newComment,
      };
      setProduct({ ...product, ratings: updatedRatings });
    } else {
      // Add a new rating
      const updatedRatings = [
        ...product.ratings,
        {
          rating: newRating,
          comment: newComment,
          postedBy: { _id: data.user._id, name: data.user.name },
        },
      ];
      setProduct({ ...product, ratings: updatedRatings });
    }
  };

  if (product == null) return <Loading />;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 card pt-5">
          <h1 className="text-center">{product?.title}</h1>
          <CouponCode product={product} />
          <ProductImage product={product} />
          <div className="card-body">
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description.replace(/\./g, "<br/><br/>"),
              }}
            />
            <div className="alert alert-primary mt-4">
              Brand: {product?.brand}
            </div>
          </div>

          <div className="card-footer d-flex justify-content-between">
            <small className="text-muted">
              Category:{" "}
              <Link
                key={product?._id}
                href={`/category/${product?.category.slug}`}
                className="tag-link"
              >
                {product?.category.name}
              </Link>
            </small>
            <small className="text-muted">
              Tags:{" "}
              {product?.tags?.map((tag) => (
                <Link
                  key={tag?._id}
                  href={`/tag/${tag?.slug}`}
                  className="tag-link"
                >
                  {tag?.name}{" "}
                </Link>
              ))}
            </small>{" "}
          </div>

          <div className="card-footer d-flex justify-content-between">
            <ProductLike product={product} />
            <small>Posted {dayjs(product?.createdAt).fromNow()}</small>
          </div>

          <div className="card-footer">
            <ProductRating
              product={product}
              updateProductRatings={updateProductRatings}
            />
            <div className="my-3">
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <p className="lead text-center my-5">Other products you may like</p>
          <div className="row">
            {relatedProducts &&
              relatedProducts.length > 0 &&
              relatedProducts.map((p) => (
                <div className="col-lg-4" key={p._id}>
                  <ProductCard product={p} />
                </div>
              ))}
          </div>
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
