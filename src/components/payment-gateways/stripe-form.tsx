
'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (!stripe || !elements) {
      setIsLoading(false)
      return
    }

    try {
        const response = await fetch('/api/payment/stripe/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount }),
        });

        if (!response.ok) {
            throw new Error('Failed to create payment intent');
        }

        const { clientSecret } = await response.json();

        // If we are using a mock secret, bypass the Stripe confirmation
        // and simulate a successful payment.
        if (clientSecret.startsWith('mock_pi_')) {
            console.log("Mock payment successful for Stripe.");
            toast({
                variant: 'success',
                title: 'Payment Successful!',
                description: `Mock Payment ID: ${clientSecret.split('_secret_')[0]}`,
            });
            setIsLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement)
        if (!cardElement) {
            setIsLoading(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            toast({
                variant: 'destructive',
                title: 'Payment failed',
                description: error.message,
            });
        } else if (paymentIntent.status === 'succeeded') {
            toast({
                variant: 'success',
                title: 'Payment Successful!',
                description: `Payment ID: ${paymentIntent.id}`,
            });
        }
    } catch (e: any) {
         toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: e.message,
        })
    } finally {
         setIsLoading(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: theme === 'dark' ? '#ffffff' : '#424770',
        '::placeholder': {
          color: theme === 'dark' ? '#aab7c4' : '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 border rounded-md bg-background">
        <CardElement options={cardElementOptions} />
      </div>
      <Button disabled={!stripe || isLoading} className="w-full" type="submit">
        {isLoading ? <Loader2 className="animate-spin" /> : `Pay ₹${(amount / 100).toFixed(2)}`}
      </Button>
    </form>
  )
}

export const StripeForm = ({ amount }: { amount: number }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} />
  </Elements>
)
