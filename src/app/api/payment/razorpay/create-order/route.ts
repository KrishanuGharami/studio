// src/app/api/payment/razorpay/create-order/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    // This is a mock implementation.
    // In a real app, initialize this securely and handle errors properly.
    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amount, // amount in the smallest currency unit (paise for INR)
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    // In a real app, this would be a real API call.
    const order = await razorpay.orders.create(options);
    
    if (!order) {
        return new NextResponse("Razorpay order creation failed", { status: 500 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
  }
}
