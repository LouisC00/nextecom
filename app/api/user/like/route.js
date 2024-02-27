import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import { currentUser } from "@/utils/currentUser";
import product from "@/models/product";

export async function PUT(req) {
  await dbConnect();
  const user = await currentUser();

  const { productId } = await req.json();

  try {
    const updated = await Product.findByIdAndUpdate(
      product,
      {
        $addToSet: { likes: user._id },
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
