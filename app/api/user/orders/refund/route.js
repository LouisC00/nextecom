import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";
import Product from "@/models/product";
import { currentUser } from "@/utils/currentUser";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();

  try {
    const user = await currentUser(req);

    const orderId = req.nextUrl.searchParams.get("orderId");
    const order = await Order.findById(orderId);

    if (!order || order.userId.toString() !== user._id.toString()) {
      return NextResponse.json({ err: "Order not found" }, { status: 404 });
    }

    if (order.delivery_status !== "Not Processed") {
      return NextResponse.json(
        { err: "Order cannot be cancelled" },
        { status: 400 }
      );
    }

    const refund = await stripe.refunds.create({
      payment_intent: order.payment_intent,
      reason: "requested_by_customer",
    });

    for (const cartItem of order.cartItems) {
      const product = await Product.findById(cartItem._id);

      if (product) {
        product.stock += cartItem.quantity;
        await product.save();
      }
    }

    order.status = "Refunded";
    order.refunded = true;
    order.delivery_status = "Cancelled";
    order.refundId = refund.id;
    await order.save();

    return NextResponse.json({ message: "Order refunded successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}
