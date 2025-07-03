// src/app/api/payment/paypal/create-order/route.ts
import { NextResponse } from 'next/server';

// This is a simplified mock. A real implementation would use the PayPal REST SDK
// to create an order on the server.
export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    // For a real integration, you would use the PayPal SDK here
    // to create an order and return the order ID.
    // Example:
    // const paypal_order = await paypalClient.orders.create({ ... });
    // return NextResponse.json({ id: paypal_order.id });

    // We'll mock the response for now.
    const mockOrderId = `PAYPAL_MOCK_${Date.now()}`;
    console.log(`Mock PayPal order created: ${mockOrderId} for amount ${amount}`);

    return NextResponse.json({ id: mockOrderId });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
