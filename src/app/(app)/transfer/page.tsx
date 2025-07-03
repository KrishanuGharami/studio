'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Landmark, QrCode, ArrowUpRight, CameraOff, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function TransferPage() {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [activeTab, setActiveTab] = useState("upi");

    const [upiId, setUpiId] = useState('');
    const [upiAmount, setUpiAmount] = useState('');
    const [accNumber, setAccNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [accHolder, setAccHolder] = useState('');
    const [bankAmount, setBankAmount] = useState('');


    useEffect(() => {
        if (activeTab === 'qr') {
            const getCameraPermission = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    setHasCameraPermission(true);

                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (error) {
                    console.error('Error accessing camera:', error);
                    setHasCameraPermission(false);
                    toast({
                        variant: 'destructive',
                        title: 'Camera Access Denied',
                        description: 'Please enable camera permissions in your browser settings to use this app.',
                    });
                }
            };
            getCameraPermission();
        } else {
            // Stop camera when switching away from QR tab
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        }
    }, [activeTab, toast]);
    
    return (
        <div className="p-4 sm:p-6 lg:p-8 h-full">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Money Transfer</h1>
                <p className="text-muted-foreground">Securely send money to anyone, anytime.</p>
            </header>
            <Tabs defaultValue="upi" className="max-w-2xl mx-auto" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 h-auto">
                    <TabsTrigger value="upi" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md"><User className="mr-2 h-4 w-4" /> UPI ID</TabsTrigger>
                    <TabsTrigger value="bank" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md"><Landmark className="mr-2 h-4 w-4" /> Bank Account</TabsTrigger>
                    <TabsTrigger value="qr" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md"><QrCode className="mr-2 h-4 w-4" /> Scan QR</TabsTrigger>
                </TabsList>
                <TabsContent value="upi" className="mt-6">
                    <Card className="shadow-lg border-none">
                        <CardHeader>
                            <CardTitle>Send to UPI ID</CardTitle>
                            <CardDescription>Enter the recipient's UPI ID and the amount.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="upi-id">Recipient UPI ID</Label>
                                <Input id="upi-id" placeholder="name@bank" className="h-11" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="upi-amount">Amount (₹)</Label>
                                <Input id="upi-amount" type="number" placeholder="0.00" className="h-11" value={upiAmount} onChange={(e) => setUpiAmount(e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter>
                             <Button asChild className="w-full" size="lg" disabled={!upiId || !upiAmount || parseFloat(upiAmount) <= 0}>
                                <Link href={`/payment?amount=${upiAmount}&recipient=${encodeURIComponent(upiId)}`}>
                                    Verify & Proceed <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>
                             </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="bank" className="mt-6">
                     <Card className="shadow-lg border-none">
                        <CardHeader>
                            <CardTitle>Send to Bank Account</CardTitle>
                            <CardDescription>Enter recipient's bank details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="acc-number">Account Number</Label>
                                <Input id="acc-number" placeholder="Enter account number" className="h-11" value={accNumber} onChange={(e) => setAccNumber(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ifsc">IFSC Code</Label>
                                <Input id="ifsc" placeholder="Enter IFSC code" className="h-11" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="acc-holder">Account Holder Name</Label>
                                <Input id="acc-holder" placeholder="Enter account holder name" className="h-11" value={accHolder} onChange={(e) => setAccHolder(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bank-amount">Amount (₹)</Label>
                                <Input id="bank-amount" type="number" placeholder="0.00" className="h-11" value={bankAmount} onChange={(e) => setBankAmount(e.target.value)} />
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button asChild className="w-full" size="lg" disabled={!accNumber || !ifsc || !accHolder || !bankAmount || parseFloat(bankAmount) <= 0}>
                                <Link href={`/payment?amount=${bankAmount}&recipient=${encodeURIComponent(accHolder)}&description=${encodeURIComponent('A/C: ' + accNumber)}`}>
                                    Proceed to Pay <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                         </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="qr" className="mt-6">
                     <Card className="shadow-lg border-none">
                        <CardHeader>
                            <CardTitle>Scan & Pay</CardTitle>
                            <CardDescription>Point your camera at a UPI QR code to pay.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
                            <div className="relative w-full aspect-video max-w-md bg-muted rounded-lg overflow-hidden border-2 border-dashed flex items-center justify-center">
                                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                                {hasCameraPermission === false && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-background/80">
                                        <CameraOff className="h-16 w-16 text-destructive mb-4"/>
                                        <p className="font-semibold text-lg text-destructive">Camera Disabled</p>
                                        <p className="text-sm text-muted-foreground">Please grant camera permission in your browser.</p>
                                    </div>
                                )}
                            </div>
                             {hasCameraPermission === false && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Camera Access Required</AlertTitle>
                                    <AlertDescription>
                                        Please allow camera access to use this feature.
                                    </AlertDescription>
                                </Alert>
                             )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
