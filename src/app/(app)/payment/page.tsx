'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StripeForm } from '@/components/payment-gateways/stripe-form'
import { PayPalButtonsWrapper } from '@/components/payment-gateways/paypal-button'
import { RazorpayButton } from '@/components/payment-gateways/razorpay-button'
import { CreditCard } from 'lucide-react'
import Image from 'next/image'

// Simple SVG for Razorpay logo
const RazorpayLogo = () => (
    <svg width="80" height="20" viewBox="0 0 95 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 dark:text-white">
        <path d="M57.25 14.125V5.875H58.625L60.5 10.125L62.375 5.875H63.75V14.125H62.625V7.625L60.875 11.625H60.125L58.375 7.625V14.125H57.25Z" fill="currentColor" className="fill-white"/>
        <path d="M66.1119 14.125V5.875H69.4369C70.6369 5.875 71.4369 6.125 71.8369 6.625C72.2369 7.125 72.4369 7.875 72.4369 8.875C72.4369 9.875 72.2369 10.625 71.8369 11.125C71.4369 11.625 70.6369 11.875 69.4369 11.875H67.2369V14.125H66.1119ZM67.2369 10.75H69.2619C70.1369 10.75 70.6869 10.5 70.9119 10C71.1369 9.5 71.2619 9.125 71.2619 8.875C71.2619 8.625 71.1369 8.25 70.9119 7.75C70.6869 7.25 70.1369 7 69.2619 7H67.2369V10.75Z" fill="currentColor" className="fill-white"/>
        <path d="M25.0441 12.6C25.0441 12.96 24.9361 13.28 24.7201 13.56C24.5041 13.84 24.2241 14.04 23.8801 14.16V14.24C24.2881 14.32 24.6241 14.52 24.8881 14.84C25.1521 15.16 25.2841 15.56 25.2841 16.04C25.2841 16.8 25.0201 17.38 24.4921 17.78C23.9641 18.18 23.2201 18.38 22.2601 18.38H18.8841V11.5H22.4041C23.2921 11.5 23.9641 11.68 24.4201 12C24.8761 12.32 25.0441 12.84 25.0441 12.6ZM22.3641 13.8C21.8441 13.8 21.4601 13.71 21.2121 13.53C20.9641 13.35 20.8401 13.06 20.8401 12.66C20.8401 12.28 20.9641 11.99 21.2121 11.81C21.4601 11.63 21.8361 11.54 22.3401 11.54H23.0841C23.2281 11.54 23.3481 11.56 23.4441 11.6C23.5401 11.64 23.6361 11.71 23.7321 11.81C23.8281 11.91 23.9041 12.03 23.9601 12.17C24.0161 12.31 24.0441 12.45 24.0441 12.59C24.0441 13.03 23.9241 13.37 23.6841 13.61C23.4441 13.85 22.9641 13.97 22.2441 13.97L22.3641 13.8ZM22.5401 17.31C23.0601 17.31 23.4441 17.22 23.6921 17.04C23.9401 16.86 24.0641 16.57 24.0641 16.17C24.0641 15.75 23.9441 15.44 23.7041 15.24C23.4641 15.04 22.9961 14.94 22.3001 14.94H20.8841V17.31H22.5401Z" fill="#3B82F6"/>
        <path d="M30.4862 18.2H27.0262V11.5H30.3502C31.5502 11.5 32.3502 11.75 32.7502 12.25C33.1502 12.75 33.3502 13.5 33.3502 14.5C33.3502 15.5 33.1502 16.25 32.7502 16.75C32.3502 17.25 31.5502 17.5 30.3502 17.5H28.1502V18.2H30.4862ZM28.1502 16.37H30.1742C31.0492 16.37 31.5992 16.12 31.8242 15.62C32.0492 15.12 32.1742 14.75 32.1742 14.5C32.1742 14.25 32.0492 13.87 31.8242 13.37C31.5992 12.87 31.0492 12.62 30.1742 12.62H28.1502V16.37Z" fill="#3B82F6"/>
        <path d="M40.421 11.5L37.165 18.2H35.861L34.117 14.78C34.021 14.6 33.941 14.39 33.877 14.15C33.813 13.91 33.773 13.7 33.757 13.52H33.709C33.693 13.72 33.653 13.93 33.589 14.15C33.525 14.37 33.445 14.58 33.349 14.78L31.605 18.2H30.301L33.557 11.5H34.829L36.565 15.02C36.661 15.22 36.737 15.42 36.793 15.62C36.849 15.82 36.885 15.99 36.901 16.13H36.949C36.965 15.97 37.001 15.78 37.057 15.56C37.113 15.34 37.189 15.12 37.285 14.9L39.045 11.5H40.421Z" fill="#3B82F6"/>
        <path d="M41.7429 18.2H46.3149V17.21L43.2069 13.25H46.1229V11.5H41.6709V12.49L44.7309 16.4H41.7429V18.2Z" fill="#3B82F6"/>
        <path d="M47.9203 14.85C47.9203 15.59 48.1283 16.19 48.5443 16.65C48.9603 17.11 49.5203 17.34 50.2243 17.34C50.9283 17.34 51.4883 17.11 51.9043 16.65C52.3203 16.19 52.5283 15.59 52.5283 14.85C52.5283 14.11 52.3203 13.51 51.9043 13.05C51.4883 12.59 50.9283 12.36 50.2243 12.36C49.5203 12.36 48.9603 12.59 48.5443 13.05C48.1283 13.51 47.9203 14.11 47.9203 14.85ZM49.1203 14.85C49.1203 14.41 49.2243 14.06 49.4323 13.8C49.6403 13.54 49.9043 13.41 50.2243 13.41C50.5443 13.41 50.8083 13.54 51.0163 13.8C51.2243 14.06 51.3283 14.41 51.3283 14.85C51.3283 15.29 51.2243 15.64 51.0163 15.9C50.8083 16.16 50.5443 16.29 50.2243 16.29C49.9043 16.29 49.6403 16.16 49.4323 15.9C49.2243 15.64 49.1203 15.29 49.1203 14.85Z" fill="#3B82F6"/>
        <path d="M53.818 18.2H56.554L54.434 14.85C55.074 14.65 55.534 14.32 55.814 13.86C56.094 13.4 56.234 12.87 56.234 12.27C56.234 11.39 55.994 10.71 55.514 10.23C55.034 9.75 54.334 9.51 53.414 9.51H50.038V18.2H51.19V14.51L53.818 18.2ZM53.318 11.2C53.838 11.2 54.222 11.29 54.47 11.47C54.718 11.65 54.842 11.94 54.842 12.34C54.842 12.72 54.718 13.01 54.47 13.19C54.222 13.37 53.846 13.46 53.342 13.46H51.19V11.2H53.318Z" fill="#3B82F6"/>
    </svg>
)

export default function PaymentPage() {
    const searchParams = useSearchParams()
    const amount = searchParams.get('amount') || '0';
    const recipient = searchParams.get('recipient');
    const description = searchParams.get('description');

    const amountInCents = Math.round(parseFloat(amount) * 100);

    return (
        <div className="p-4 sm:p-6 lg:p-8 h-full">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Complete Your Payment</h1>
                <p className="text-muted-foreground mt-2">You are paying <span className="font-bold text-primary">₹{amount}</span> {recipient ? `to ${recipient}` : ''}</p>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </header>
            
            <div className="max-w-md mx-auto">
                <Card className="shadow-lg border-none">
                    <CardHeader>
                        <CardTitle>Choose Payment Method</CardTitle>
                        <CardDescription>Select a provider to finalize your transaction.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="stripe" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 h-auto">
                                <TabsTrigger value="stripe" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md"><CreditCard className="mr-2 h-4 w-4" /> Card</TabsTrigger>
                                <TabsTrigger value="paypal" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md">
                                    <Image src="https://www.paypalobjects.com/images/shared/momgram@2x.png" alt="PayPal" width={60} height={16} className="dark:brightness-0 dark:invert-[1]"/>
                                </TabsTrigger>
                                <TabsTrigger value="razorpay" className="py-2.5 data-[state=active]:bg-[#0353a2] data-[state=active]:text-white data-[state=active]:shadow-md flex items-center justify-center">
                                    <svg viewBox="0 0 280 60" width="100" height="24" className="fill-current"><path d="M242.4 34.2c0 2.2-1.4 3-2.9 3.2-1.7.3-3.2.4-4.6.4s-2.8-.1-4.6-.4c-1.5-.2-2.9-.9-2.9-3.2V20.3h2.6v12.8c0 1.2 1.1 1.6 2.1 1.7 1.2.2 2.5.3 3.8.3s2.6-.1 3.8-.3c1-.1 2.1-.5 2.1-1.7V20.3h2.6v13.9zM224.4 20.3h-3.4l-4.2 11.2-4.2-11.2h-3.4l6.1 14.8h2.8l6.1-14.8zM200.2 20.3h10.1v2.1h-7.5v4.3h7.1v2.1h-7.1v4.3h7.5v2.1h-10.1V20.3zM186.1 20.3h2.6v14.8h-2.6V20.3zM172.6 35.1h-3.2l.9-2.1h5.6l.9 2.1h-3.1l-1.1-2.9zM170.8 28l-2.1-5.1-2.1 5.1h4.2zM161.4 20.3h2.6v14.8h-2.6V20.3zM147.2 20.3h3.5c4.7 0 7.5 2.4 7.5 7.4 0 5-2.8 7.4-7.5 7.4h-3.5V20.3zm2.6 12.8h.9c3 0 4.9-1.5 4.9-5.4s-1.9-5.4-4.9-5.4h-.9v10.8zM128.8 20.3h10.1v2.1h-7.5v4.3h7.1v2.1h-7.1v4.3h7.5v2.1h-10.1V20.3zM102.3 27.7c0 4.9 2.4 7.5 7.3 7.5 2.4 0 4.4-.9 6-2.5l-1.6-1.3c-1.3 1.2-2.6 1.8-4.4 1.8-3.3 0-4.8-1.9-4.8-5.5s1.5-5.5 4.8-5.5c1.8 0 3.1.6 4.4 1.8l1.6-1.3c-1.6-1.6-3.6-2.5-6-2.5-4.9 0-7.3 2.5-7.3 7.5zM88.7 20.3h2.5L85 30.6v4.5h-2.6v-4.5L76.2 20.3h2.5l5.1 8.8 5-8.8zM63.8 34.2c0 2.2-1.4 3-2.9 3.2-1.7.3-3.2.4-4.6.4s-2.8-.1-4.6-.4c-1.5-.2-2.9-.9-2.9-3.2V20.3h2.6v12.8c0 1.2 1.1 1.6 2.1 1.7 1.2.2 2.5.3 3.8.3s2.6-.1 3.8-.3c1-.1 2.1-.5 2.1-1.7V20.3h2.6v13.9zM42.3 20.3h2.6v12.8c0 .8.6 1.1 1.2 1.2l.9.1h.2v2.2c-.6 0-1.3-.1-2-.1-1.8-.2-3-1.1-3-3.5V20.3zM25.6 20.3h3.5c4.7 0 7.5 2.4 7.5 7.4s-2.8 7.4-7.5 7.4h-3.5V20.3zm2.6 12.8h.9c3 0 4.9-1.5 4.9-5.4s-1.9-5.4-4.9-5.4h-.9v10.8zM14.3 22.4h-2.8v-2.1h8.2v2.1h-2.8V35.1h-2.6V22.4z"></path></svg>
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="stripe" className="mt-6">
                               <StripeForm amount={amountInCents} />
                            </TabsContent>
                            <TabsContent value="paypal" className="mt-6">
                                <PayPalButtonsWrapper amount={amount} />
                            </TabsContent>
                            <TabsContent value="razorpay" className="mt-6">
                                <RazorpayButton amount={amountInCents} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
