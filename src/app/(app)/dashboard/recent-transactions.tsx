import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
  { id: 1, name: 'Starbucks', type: 'Food & Drinks', amount: -450.00, status: 'Completed', avatar: 'coffee cup' },
  { id: 2, name: 'Ankit Sharma', type: 'Transfer', amount: 2000.00, status: 'Completed', avatar: 'person smiling' },
  { id: 3, name: 'Jio Recharge', type: 'Bills', amount: -239.00, status: 'Completed', avatar: 'mobile phone' },
  { id: 4, name: 'Netflix', type: 'Subscription', amount: -199.00, status: 'Pending', avatar: 'television screen' },
  { id: 5, name: 'Salary Credit', type: 'Credit', amount: 50000.00, status: 'Completed', avatar: 'money bag' },
];

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

export function RecentTransactions() {
  return (
    <Card className="shadow-md h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest transactions.</CardDescription>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/history">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Avatar className="h-11 w-11">
                 <AvatarImage src={`https://placehold.co/44x44.png`} data-ai-hint={t.avatar} />
                <AvatarFallback>{getInitials(t.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.type}</p>
              </div>
              <div className="text-right">
                <p className={cn("font-semibold flex items-center justify-end gap-1", t.amount > 0 ? 'text-success' : 'text-destructive')}>
                   {t.amount > 0 ? <ArrowDownCircle size={16}/> : <ArrowUpCircle size={16} />}
                   {`₹${Math.abs(t.amount).toFixed(2)}`}
                </p>
                 <p className="text-xs text-muted-foreground">Oct 26, 2023</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
