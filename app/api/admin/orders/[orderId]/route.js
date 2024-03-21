import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";

export async function PUT(req, context) {
  await dbConnect();
  const body = await req.json();

  try {
    const order = await Order.findById(context.params.orderId);

    if (!order) {
      return NextResponse.json({ err: "Order not found" }, { status: 404 });
    }

    if (order.refunded) {
      return NextResponse.json(
        { err: "Cannot update delivery status for a refunded order" },
        { status: 400 }
      );
    }

    // Update the order status without fetching the updated order
    await Order.findByIdAndUpdate(context.params.orderId, {
      delivery_status: body.delivery_status,
    });

    // Return a success message
    return NextResponse.json({ message: "Order status updated successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server error. Please try again." },
      { status: 500 }
    );
  }
}

// export async function PUT(req, context) {
//   await dbConnect();
//   const body = await req.json();

//   try {
//     const order = await Order.findById(context.params.orderId);

//     if (!order) {
//       return NextResponse.json({ err: "Order not found" }, { status: 404 });
//     }

//     if (order.refunded) {
//       return NextResponse.json(
//         { err: "Cannot update delivery status for a refunded order" },
//         { status: 400 }
//       );
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       context.params.orderId,
//       {
//         delivery_status: body.delivery_status,
//       },
//       { new: true }
//     );

//     return NextResponse.json(updatedOrder);
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json(
//       { err: "Server error. Please try again." },
//       { status: 500 }
//     );
//   }
// }
