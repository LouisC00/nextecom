import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function GET(request) {
  await dbConnect();

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const categoryId = searchParams.get("category");

  try {
    const brands = await Product.find({
      category: categoryId,
    }).distinct("brand");

    return new NextResponse(JSON.stringify(brands));
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ err: "An error occurred. Try again" }),
      { status: 500 }
    );
  }
}
