import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet } from 'lucide-react'

export default function LoginPage() {
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
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
           <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardContent>
        <CardFooter className="text-center text-sm">
            <p className="w-full">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline font-semibold">
                    Sign up
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}
