"use client";
import React from "react";
import Image from "next/image";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";

const ProductList = ({ products, currentPage, totalPages }) => {
  const router = useRouter();

  const handleProductClick = (productSlug) => {
    router.push(`/product/${productSlug}`);
  };

  return (
    <div className="container my-5">
      <div className="row gx-3">
        {products.map((product) => (
          <div key={product._id} className="col-lg-4 col-md-6 mb-4">
            <div
              className="card h-100"
              onClick={() => handleProductClick(product.slug)}
            >
              <div style={{ height: "200px", overflow: "hidden" }}>
                <Image
                  src={product.images[0]?.secure_url || "/images/default.jpeg"}
                  alt={product.title}
                  layout="responsive"
                  width={500}
                  height={300}
                  objectFit="cover"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  ${product.price.toFixed(2)} {product.title}
                </h5>
                <p className="card-text">
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname="/shop"
      />
    </div>
  );
};

export default ProductList;
