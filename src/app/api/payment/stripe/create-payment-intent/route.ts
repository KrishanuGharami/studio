// src/app/api/payment/stripe/create-payment-intent/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    // This is a mock implementation.
    // In a real app, initialize this securely and handle errors properly.
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
    });

    const { amount } = await request.json();

    // In a real app, you would fetch or calculate the amount on the server
    // to prevent manipulation from the client.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'inr',
      // In the latest version of the API, specifying the `automatic_payment_methods` 
      // parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
