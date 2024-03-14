import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
// import Order from "@/models/order";
import { currentUser } from "@/utils/currentUser";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { productId, rating, comment } = body;
  const user = await currentUser(req);

  try {
    const product = await Product.findById(productId);
    // Check if the user has already rated the product
    const existingRating = product.ratings.find(
      (rate) => rate.postedBy.toString() === user._id.toString()
    );

    // Check if the user has purchased the product
    const userPurchased = await Order.findOne({
      userId: token.user._id,
      "cartItems._id": productId,
    });

    if (!userPurchased) {
      return NextResponse.json(
        {
          err: "You can only leave a review for products you've purchased.",
        },
        { status: 400 }
      );
    }

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
      existingRating.comment = comment;
      await product.save();

      return NextResponse.json(product);
    }
    // If the user has not already rated, add a new rating
    product.ratings.push({
      rating,
      comment,
      postedBy: user._id,
    });

    const updated = await product.save();

    return NextResponse.json(updated);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
