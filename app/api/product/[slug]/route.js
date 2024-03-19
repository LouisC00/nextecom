import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function GET(req, context) {
  await dbConnect();

  try {
    const product = await Product.findOne({ slug: context.params.slug })
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .populate({
        path: "ratings.postedBy",
        model: "User",
        select: "name",
      });

    // Fetch related products based on category or tags
    const relatedProducts = await Product.find({
      $or: [
        { category: product.category }, // Fetch products in the same category
        { tags: { $in: product.tags } }, // Fetch products with similar tags
      ],
      _id: { $ne: product._id }, // Exclude the current product
    })
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .limit(3); // Limit the number of related products

    return NextResponse.json({ product, relatedProducts });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
