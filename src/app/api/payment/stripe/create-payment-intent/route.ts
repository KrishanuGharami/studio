// src/app/api/payment/stripe/create-payment-intent/route.ts
import { NextResponse } from 'next/server';
// import Stripe from 'stripe'; // No longer needed for mock

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    // This is a mock implementation.
    // In a real app, you would use the Stripe SDK to create a payment intent
    // and return the client_secret.
    /*
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
    });
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    */

    // MOCK RESPONSE
    // This avoids calling the real Stripe API which would fail with placeholder keys.
    const mockClientSecret = `mock_pi_${Date.now()}_secret_${Date.now()}`;
    console.log(`Created mock Stripe Payment Intent with amount ${amount}. Client secret: ${mockClientSecret}`);

    return NextResponse.json({ clientSecret: mockClientSecret });

  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
