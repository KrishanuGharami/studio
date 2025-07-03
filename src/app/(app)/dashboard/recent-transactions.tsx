import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <section>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>A quick look at your latest financial activities.</CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/history">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-11 w-11">
                         <AvatarImage src={`https://placehold.co/44x44.png`} data-ai-hint={t.avatar} />
                        <AvatarFallback>{getInitials(t.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{t.name}</p>
                        <p className="text-sm text-muted-foreground hidden md:block">Oct 26, 2023</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{t.type}</TableCell>
                  <TableCell>
                    <Badge variant={t.status === 'Completed' ? 'success' : 'warning'}>{t.status}</Badge>
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${t.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                    {t.amount > 0 ? `+₹${t.amount.toFixed(2)}` : `-₹${Math.abs(t.amount).toFixed(2)}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}
