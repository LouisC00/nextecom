import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({ time: new Date().toLocaleString() });
}

//mongodb+srv://xnb43ucb:gortos-xonryB-5pyvku@cluster0.3oaredg.mongodb.net/?retryWrites=true&w=majority
