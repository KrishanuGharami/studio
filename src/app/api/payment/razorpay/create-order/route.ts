// src/app/api/payment/razorpay/create-order/route.ts
import { NextResponse } from 'next/server';
// import Razorpay from 'razorpay'; // No longer needed for mock

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    // This is a mock implementation.
    // In a real app, you would use the Razorpay SDK to create an order
    // and return the order object.
    /*
    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amount, // amount in the smallest currency unit (paise for INR)
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    if (!order) {
        return new NextResponse("Razorpay order creation failed", { status: 500 });
    }

    return NextResponse.json(order);
    */

    // MOCK RESPONSE
    // This avoids calling the real Razorpay API which would fail with placeholder keys.
    const mockOrder = {
        id: `mock_order_${Date.now()}`,
        amount: amount,
        currency: 'INR',
        status: 'created',
    };

    console.log("Created mock Razorpay order:", mockOrder);

    return NextResponse.json(mockOrder);

  } catch (error: any) {
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
  }
}
