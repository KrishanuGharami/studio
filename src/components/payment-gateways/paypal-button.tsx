
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

  const createOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    // This function sets up the details of the transaction, including the amount.
    // It's called when the PayPal button is clicked.
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
            currency_code: 'USD',
          },
        },
      ],
    });
  };

  const onApprove = (data: OnApproveData, actions: OnApproveActions) => {
    // This function captures the funds from the transaction.
    // It is called after the buyer approves the payment.
    return actions.order!.capture().then(function (details) {
      toast({
        variant: 'success',
        title: 'Payment Successful!',
        description: `PayPal Order ID: ${data.orderID}`,
      })
    });
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
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
        currency: 'USD',
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
