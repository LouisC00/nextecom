"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

export default function ProductLike({ product }) {
  const { data, status } = useSession();
  const [likes, setLikes] = useState(product?.likes);
  const router = useRouter();
  const pathname = usePathname();
  const isLiked = likes?.includes(data?.user?._id);

  const updateLikeStatus = async (url, successMessage, errorMessage) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(
          `${errorMessage}: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setLikes(data.likes);
      toast.success(successMessage);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(errorMessage);
    }
  };

  const handleLike = async () => {
    if (status !== "authenticated") {
      toast.error("Please login to like");
      router.push(
        `/login?callbackUrl=${process.env.API.replace("/api", "")}${pathname}`
      );
      return;
    }

    if (isLiked) {
      const answer = window.confirm("You liked it. Want to unlike?");
      if (answer) {
        updateLikeStatus(
          `${process.env.API}/user/product/unlike`,
          "Product unliked",
          "Error unliking product"
        );
      }
    } else {
      updateLikeStatus(
        `${process.env.API}/user/product/like`,
        "Product liked",
        "Error liking product"
      );
    }
  };

  return (
    <small className="text-muted pointer" onClick={handleLike}>
      ❤️{" "}
      {likes?.length
        ? `${likes.length} people liked`
        : "Be the first person to like"}
    </small>
  );
}
