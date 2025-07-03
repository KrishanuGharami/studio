import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, QrCode, User, Repeat } from "lucide-react"
import { SmartSuggestions } from "./smart-suggestions"
import { RecentTransactions } from "./recent-transactions"

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">Here&apos;s your financial overview for today.</p>
      </header>

      <section>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Send Money</CardTitle>
            <CardDescription>Quickly send money to your contacts or any UPI ID.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input placeholder="Enter UPI ID or Mobile Number" className="pl-10 h-11" />
              </div>
              <Button size="lg">Send <ArrowUpRight className="ml-2" /></Button>
            </div>
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
      </section>

      <SmartSuggestions />
      <RecentTransactions />

    </div>
  )
}
