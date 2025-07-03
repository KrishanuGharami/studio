'use client'

import {
  PayPalScriptProvider,
  PayPalButtons,
  type OnApproveData,
  type OnApproveActions,
  type CreateOrderData,
  type CreateOrderActions
} from '@paypal/react-paypal-js'
import { useToast } from '@/hooks/use-toast'

export const PayPalButtonsWrapper = ({ amount }: { amount: string }) => {
  const { toast } = useToast()

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
    // Mock API call to create an order
    const res = await fetch('/api/payment/paypal/create-order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ amount }),
    })
    const order = await res.json()
    return order.id
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    // This is where you would capture the payment on your server
    // For now, we'll just show a success message
    toast({
      variant: 'success',
      title: 'Payment Successful!',
      description: `PayPal Order ID: ${data.orderID}`,
    })
  }
  
  const onError = (err: any) => {
     toast({
        variant: 'destructive',
        title: 'PayPal Error',
        description: 'An error occurred with the PayPal transaction.',
      })
      console.error("PayPal Checkout onError", err);
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: 'INR',
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  )
}
