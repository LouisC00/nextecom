import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductRating from "./ProductRating";
import AddToCart from "@/components/product/AddToCart";
import { stockStatus } from "@/utils/helpers";

dayjs.extend(relativeTime);

export default function ProductCard({ product }) {
  return (
    <div key={product?._id} className="card my-3">
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Image
          src={product?.images?.[0]?.secure_url || "/images/default.jpeg"}
          width={500}
          height={300}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          alt={product?.title}
        />
      </div>
      <div className="card-body">
        <Link href={`/product/${product?.slug}`}>
          <h5 className="card-title">
            <strong>${product?.price?.toFixed(2)}</strong> {product?.title}
          </h5>
        </Link>
        {product?.previousPrice > product?.price && (
          <h5 className="card-title">
            <del className="card-title alert-danger">
              ${product?.previousPrice?.toFixed(2)}
            </del>
          </h5>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html:
              product?.description?.length > 160
                ? `${product?.description?.substring(0, 160)}..`
                : product?.description,
          }}
        />
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small>
          Category:{" "}
          <Link
            href={`/category/${product?.category?.slug}`}
            className="tag-link"
          >
            {product?.category?.name}
          </Link>
        </small>
        <small>
          Tags:{" "}
          {product?.tags?.map((t) => (
            <Link key={t?._id} href={`/tag/${t?.slug}`} className="tag-link">
              {t?.name + " "}
            </Link>
          ))}
        </small>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small>
          ❤️
          {product?.likes?.length
            ? `${product?.likes.length} people liked`
            : "Be the first person to like"}
        </small>
        <small>Posted {dayjs(product?.createdAt).fromNow()}</small>
      </div>

      <div className="card-footer d-flex justify-content-between align-items-center">
        <small>Brand: {product?.brand}</small>
        <ProductRating product={product} leaveARating={false} />
      </div>

      <div className="card-footer">
        <div className="bg-warning text-center">
          {stockStatus(product?.stock)}
        </div>
        <AddToCart product={product} />
      </div>
    </div>
  );
}
