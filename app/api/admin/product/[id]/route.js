import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import product from "@/models/product";

export async function PUT(req, context) {
  await dbConnect();
  const body = await req.json();
  try {
    const updatedProduct = await product.findByIdAndUpdate(
      context.params.id,
      {
        ...body,
      },
      {
        new: true,
      }
    );
    return NextResponse.json(updatedProduct);
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

export async function DELETE(req, context) {
  await dbConnect();

  try {
    const deletedProduct = await product.findByIdAndDelete(context.params.id);
    return NextResponse.json(deletedProduct);
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
