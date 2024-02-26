import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function ProductCard({ product }) {
  return (
    <div key={product?._id} className="card my-4 col-lg-4">
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
        <h5 className="card-title">{product?.title}</h5>
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
        <small>Category: {product?.category?.name}</small>
        <small>
          Tags:{" "}
          {product?.tags?.map((t) => (
            <span key={t?._id}>{t?.name}</span>
          ))}
        </small>
      </div>
    </div>
  );
}
