import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl">
         <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-primary text-primary-foreground">
                    <Wallet size={24} />
                </div>
                <h1 className="text-3xl font-bold text-primary">PayMate</h1>
            </div>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
                Enter your information to create a new account
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" placeholder="Krishanu Gharami" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required/>
            </div>
            <Button type="submit" className="w-full">
                Create account
            </Button>
            <Button variant="outline" className="w-full">
                Sign up with Google
            </Button>
        </CardContent>
         <CardFooter className="text-center text-sm">
            <p className="w-full">
                Already have an account?{" "}
                <Link href="/login" className="underline font-semibold">
                    Login
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}
