import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Landmark, QrCode, ArrowUpRight } from "lucide-react"

export default function TransferPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 h-full">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Money Transfer</h1>
                <p className="text-muted-foreground">Securely send money to anyone, anytime.</p>
            </header>
            <Tabs defaultValue="upi" className="max-w-xl mx-auto">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upi"><User className="mr-2 h-4 w-4" /> UPI ID</TabsTrigger>
                    <TabsTrigger value="bank"><Landmark className="mr-2 h-4 w-4" /> Bank Account</TabsTrigger>
                    <TabsTrigger value="qr"><QrCode className="mr-2 h-4 w-4" /> Scan QR</TabsTrigger>
                </TabsList>
                <TabsContent value="upi" className="mt-4">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>Send to UPI ID</CardTitle>
                            <CardDescription>Enter the recipient's UPI ID and the amount.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="upi-id">Recipient UPI ID</Label>
                                <Input id="upi-id" placeholder="name@bank" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="upi-amount">Amount (₹)</Label>
                                <Input id="upi-amount" type="number" placeholder="0.00" />
                            </div>
                            <Button className="w-full" size="lg">Verify & Proceed <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="bank" className="mt-4">
                     <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>Send to Bank Account</CardTitle>
                            <CardDescription>Enter recipient's bank details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="acc-number">Account Number</Label>
                                <Input id="acc-number" placeholder="Enter account number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ifsc">IFSC Code</Label>
                                <Input id="ifsc" placeholder="Enter IFSC code" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="acc-holder">Account Holder Name</Label>
                                <Input id="acc-holder" placeholder="Enter account holder name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bank-amount">Amount (₹)</Label>
                                <Input id="bank-amount" type="number" placeholder="0.00" />
                            </div>
                            <Button className="w-full" size="lg">Proceed to Pay <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="qr" className="mt-4">
                     <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>Scan & Pay</CardTitle>
                            <CardDescription>Use your camera to scan a QR code.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-6 p-16 bg-muted/30 rounded-lg">
                            <div className="p-6 bg-background rounded-lg border-2 border-dashed border-muted-foreground/50">
                                <QrCode className="h-24 w-24 text-muted-foreground" />
                            </div>
                            <Button size="lg">Open Camera</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
