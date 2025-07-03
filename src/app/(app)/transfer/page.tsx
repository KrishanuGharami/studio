'use client'

import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Landmark, QrCode, ArrowUpRight, CameraOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function TransferPage() {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

    const enableCamera = async () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setHasCameraPermission(true);
            } else {
                 setHasCameraPermission(false);
                 toast({
                    variant: 'destructive',
                    title: 'Camera Not Supported',
                    description: 'Your browser does not support camera access.',
                });
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
                variant: 'destructive',
                title: 'Camera Access Denied',
                description: 'Please enable camera permissions in your browser settings to scan QR codes.',
            });
        }
    };
    
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
                        </Header>
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
                            <CardDescription>Use your camera to scan a UPI QR code.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
                            <div className="relative w-full aspect-square max-w-sm bg-muted rounded-lg overflow-hidden border-2 border-dashed flex items-center justify-center">
                                <video ref={videoRef} className={cn("w-full h-full object-cover transition-opacity", hasCameraPermission ? 'opacity-100' : 'opacity-0')} autoPlay muted playsInline />
                                
                                {hasCameraPermission !== true && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                        {hasCameraPermission === false ? (
                                            <>
                                                <CameraOff className="h-16 w-16 text-destructive mb-4"/>
                                                <p className="font-semibold text-destructive">Camera Disabled</p>
                                                <p className="text-xs text-muted-foreground">Please grant camera permission.</p>
                                            </>
                                        ) : (
                                            <>
                                                <QrCode className="h-16 w-16 text-muted-foreground mb-4"/>
                                                <p className="text-muted-foreground">Click below to start your camera</p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            <Button size="lg" onClick={enableCamera} disabled={hasCameraPermission === true}>
                               {hasCameraPermission === true ? 'Scanning...' : 'Open Camera'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
