'use client'

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, QrCode, User, Repeat, Wallet } from "lucide-react"
import { SmartSuggestions } from "./smart-suggestions"
import { RecentTransactions } from "./recent-transactions"
import { Label } from "@/components/ui/label"

export default function DashboardPage() {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Krishanu!</h1>
        <p className="text-muted-foreground">Here&apos;s your financial overview for today.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Current Balance</CardTitle>
                <CardDescription>Your available funds</CardDescription>
              </div>
              <Wallet className="h-8 w-8 text-primary"/>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">₹75,430.50</p>
              <p className="text-sm text-muted-foreground mt-1">+2.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Send Money</CardTitle>
              <CardDescription>Quickly send money to your contacts or any UPI ID.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                 <Label htmlFor="upi-id">Recipient UPI ID</Label>
                <div className="relative flex-grow">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input 
                    id="upi-id"
                    placeholder="Enter UPI ID or Mobile Number" 
                    className="pl-10 h-11" 
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              </div>
               <div className="space-y-2">
                 <Label htmlFor="amount">Amount (₹)</Label>
                 <Input 
                  id="amount"
                  type="number" 
                  placeholder="0.00" 
                  className="h-11" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  />
               </div>
              <Button asChild size="lg" className="w-full h-11" disabled={!upiId || !amount || parseFloat(amount) <= 0}>
                <Link href={`/payment?amount=${amount}&recipient=${encodeURIComponent(upiId)}`}>
                  Send <ArrowUpRight className="ml-2" />
                </Link>
              </Button>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="w-full">
                  <QrCode className="mr-2" />
                  Scan QR Code
                </Button>
                <Button variant="outline" className="w-full">
                  <Repeat className="mr-2" />
                  Repeat Last Transaction
                </Button>
              </div>
            </CardContent>
          </Card>

           <SmartSuggestions />
        </div>

        <div className="lg:col-span-1">
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}
