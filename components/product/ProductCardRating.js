// RelatedProductRating.js
"use client";
import { useState, useEffect } from "react";
import Stars from "@/components/product/Stars";
import { calculateAverageRating } from "@/utils/helpers";

export default function RelatedProductRating({ product }) {
  const [averageRating, setAverageRating] = useState(0);
  //   const [productRatings, setProductRatings] = useState(product?.ratings || []);

  useEffect(() => {
    if (product?.ratings) {
      const average = calculateAverageRating(product?.ratings);
      setAverageRating(average);
    }
  }, [product?.ratings]);

  return (
    <div className="d-flex justify-content-between">
      <div>
        <Stars rating={averageRating} />
        <small className="text-muted"> ({product?.ratings?.length})</small>
      </div>
    </div>
  );
}
