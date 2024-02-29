import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Category from "@/models/category";
import Tag from "@/models/tag";
import queryString from "query-string";

export async function GET(req) {
  await dbConnect();
  const { productSearchQuery } = queryString.parseUrl(req.url).query;

  try {
    const [categories, tags] = await Promise.all([
      Category.find({ name: { $regex: productSearchQuery, $options: "i" } }),
      Tag.find({ name: { $regex: productSearchQuery, $options: "i" } }),
    ]);

    const categoryIds = categories.map((category) => category._id);
    const tagIds = tags.map((tag) => tag._id);

    const products = await Product.find({
      $or: [
        { title: { $regex: productSearchQuery, $options: "i" } },
        { description: { $regex: productSearchQuery, $options: "i" } },
        { brand: { $regex: productSearchQuery, $options: "i" } },
        { category: { $in: categoryIds } }, // Search for products with matching category IDs
        { tags: { $in: tagIds } }, // Search for products with matching tag IDs
      ],
    })
      .populate("category", "name")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
