import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search } from "lucide-react";

const transactions = [
    { id: 1, name: 'Starbucks', type: 'Food', amount: -450.00, status: 'Completed', date: '2023-10-26' },
    { id: 2, name: 'Ankit Sharma', type: 'Transfer', amount: 2000.00, status: 'Completed', date: '2023-10-25' },
    { id: 3, name: 'Jio Recharge', type: 'Bills', amount: -239.00, status: 'Completed', date: '2023-10-25' },
    { id: 4, name: 'Netflix', type: 'Subscription', amount: -199.00, status: 'Pending', date: '2023-10-24' },
    { id: 5, name: 'Salary Credit', type: 'Credit', amount: 50000.00, status: 'Completed', date: '2023-10-20' },
    { id: 6, name: 'Amazon', type: 'Shopping', amount: -1500.00, status: 'Completed', date: '2023-10-19' },
    { id: 7, name: 'Zomato', type: 'Food', amount: -350.00, status: 'Failed', date: '2023-10-18' },
    { id: 8, name: 'Electricity Bill', type: 'Bills', amount: -1250.00, status: 'Completed', date: '2023-10-15' },
];

const getBadgeVariant = (status: string): BadgeProps['variant'] => {
    switch (status) {
        case 'Completed': return 'success';
        case 'Pending': return 'warning';
        case 'Failed': return 'destructive';
        default: return 'secondary';
    }
}

export default function HistoryPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
                    <p className="text-muted-foreground">View and manage all your past transactions.</p>
                </div>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download Statement</Button>
            </header>
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-grow md:flex-grow-0">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                           <Input placeholder="Search transactions..." className="pl-10 max-w-xs"/>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Transaction Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="transfer">Transfer</SelectItem>
                                    <SelectItem value="bills">Bills</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map(t => (
                                <TableRow key={t.id}>
                                    <TableCell>
                                        <p className="font-medium">{t.name}</p>
                                        <p className="text-sm text-muted-foreground">{t.type}</p>
                                    </TableCell>
                                    <TableCell>{new Date(t.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</TableCell>
                                    <TableCell className={`text-right font-semibold ${t.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                                        {t.amount > 0 ? `+₹${t.amount.toFixed(2)}` : `₹${Math.abs(t.amount).toFixed(2)}`}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={getBadgeVariant(t.status)}>{t.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
