"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import Stars from "@/components/product/Stars";
import { calculateAverageRating } from "@/utils/helpers";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useProduct } from "@/context/product";

export default function MainProductRating({ product, updateProductRatings }) {
  // const [showRatingModal, setShowRatingModal] = useState(false);
  // const [currentRating, setCurrentRating] = useState(0);
  // const [comment, setComment] = useState("");
  const [productRatings, setProductRatings] = useState(product?.ratings || []);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    setProductRatings(product?.ratings || []);
  }, [product?.ratings]);

  const {
    showRatingModal,
    setShowRatingModal,
    currentRating,
    setCurrentRating,
    comment,
    setComment,
  } = useProduct();

  useEffect(() => {
    if (product?.ratings) {
      const average = calculateAverageRating(product?.ratings);
      setAverageRating(average);
    }
  }, [product?.ratings]);

  const adjustTextareaHeight = () => {
    const textarea = document.querySelector(".review-textarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  const handleTextareaInput = (e) => {
    const newComment = e.target.value;

    if (newComment.length > 2000) {
      if (comment.length <= 2000) {
        toast.error("Review comment cannot exceed 2000 characters");
      }
      return;
    }

    setComment(newComment);

    adjustTextareaHeight();
  };

  // current user
  const { data, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const alreadyRated = productRatings?.find(
    (rate) => rate?.postedBy?._id === data?.user?._id
  );

  useEffect(() => {
    if (alreadyRated) {
      setCurrentRating(alreadyRated.rating);
      setComment(alreadyRated.comment);
    } else {
      setCurrentRating(0);
      setComment("");
    }
    // Ensure the textarea resizes after the comment is set
    adjustTextareaHeight();
  }, [alreadyRated, showRatingModal]); // Also depend on showRatingModal to trigger resizing when the modal opens

  const submitRating = async () => {
    if (status !== "authenticated") {
      toast.error("You must be logged in to leave a rating");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }

    if (comment.length > 2000) {
      toast.error("Review comment cannot exceed 2000 characters");
      return;
    }

    try {
      const response = await fetch(`${process.env.API}/user/product/rating`, {
        method: "POST",
        body: JSON.stringify({
          productId: product?._id,
          rating: currentRating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to leave a rating");
      }

      // Update the ratings in the parent component
      updateProductRatings(currentRating, comment);
      setShowRatingModal(false);
      toast.success("Thanks for leaving a rating");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-between">
      <div>
        <Stars rating={averageRating} />
        <small className="text-muted"> ({productRatings?.length})</small>
      </div>
      <small onClick={() => setShowRatingModal(true)} className="pointer">
        {alreadyRated ? "Update your rating" : "Leave a rating"}
      </small>
      {showRatingModal && (
        <Modal>
          <textarea
            className="form-control mb-3 review-textarea"
            placeholder="Write a review"
            value={comment}
            onChange={handleTextareaInput}
            style={{ overflowY: "auto", resize: "none" }}
          />
          <div className="pointer">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <span
                  key={ratingValue}
                  className={
                    ratingValue <= currentRating ? "star-active lead" : "lead"
                  }
                  onClick={() => setCurrentRating(ratingValue)}
                >
                  {ratingValue <= currentRating ? (
                    <FaStar className="text-danger" />
                  ) : (
                    <FaRegStar />
                  )}
                </span>
              );
            })}
          </div>
          <button
            onClick={submitRating}
            className="btn btn-primary btn-raised my-3"
          >
            Submit
          </button>
        </Modal>
      )}
    </div>
  );
}
