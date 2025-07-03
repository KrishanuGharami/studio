import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mobile, Wifi, Tv, Droplets, Lightbulb, Flame, Landline, Pipeline } from 'lucide-react'
import Link from "next/link"

const billCategories = [
  { name: 'Mobile Recharge', icon: Mobile, href: '#' },
  { name: 'Broadband', icon: Wifi, href: '#' },
  { name: 'DTH Recharge', icon: Tv, href: '#' },
  { name: 'Water Bill', icon: Droplets, href: '#' },
  { name: 'Electricity', icon: Lightbulb, href: '#' },
  { name: 'Piped Gas', icon: Flame, href: '#' },
  { name: 'Landline', icon: Landline, href: '#' },
  { name: 'LPG Cylinder', icon: Pipeline, href: '#' },
];


export default function BillsPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
             <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Bills & Recharges</h1>
                <p className="text-muted-foreground">One place for all your payments.</p>
            </header>
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Pay Your Bills</CardTitle>
                    <CardDescription>Select a category to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {billCategories.map(category => (
                            <Link href={category.href} key={category.name} className="group">
                                <div className="flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-pointer space-y-3 h-full hover:shadow-lg hover:-translate-y-1">
                                    <div className="p-4 bg-primary/10 rounded-full group-hover:bg-accent-foreground/10 transition-colors">
                                        <category.icon className="h-8 w-8 text-primary group-hover:text-accent-foreground" />
                                    </div>
                                    <span className="text-center font-medium text-sm">{category.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
