import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Category from "@/models/category";
import Tag from "@/models/tag";
import Order from "@/models/order";
import Blog from "@/models/blog";

export async function GET(req, context) {
  await dbConnect();
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalTags = await Tag.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const data = [
      { label: "Products", count: totalProducts },
      { label: "Orders", count: totalOrders },
      { label: "Categories", count: totalCategories },
      { label: "Tags", count: totalTags },
      { label: "Blogs", count: totalBlogs },
    ];
    return NextResponse.json({ data });
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
