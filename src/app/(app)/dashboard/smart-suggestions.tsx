'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSmartSuggestions, type SmartSuggestionsOutput } from '@/ai/flows/smart-transaction-suggestions';
import { Bot, Zap, ArrowRight, ShoppingCart, Tv, Wifi } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for recent transactions
const mockRecentTransactions = [
  { transactionType: 'recharge', merchantName: 'Jio', amount: 239, timestamp: '2023-10-25T10:00:00Z' },
  { transactionType: 'payment', merchantName: 'Starbucks', amount: 450, timestamp: '2023-10-24T15:30:00Z' },
  { transactionType: 'bill_payment', merchantName: 'Electricity Board', amount: 1200, timestamp: '2023-10-20T11:00:00Z' },
  { transactionType: 'transfer', amount: 500, timestamp: '2023-10-18T09:00:00Z' },
];

const ICONS: { [key: string]: React.ElementType } = {
    'recharge': Zap,
    'payment': ShoppingCart,
    'bill': Tv,
    'transfer': ArrowRight,
    'default': Wifi
}

const getIcon = (type: string) => {
    const key = Object.keys(ICONS).find(k => type.toLowerCase().includes(k));
    return key ? ICONS[key] : ICONS['default'];
}

export function SmartSuggestions() {
  const [suggestions, setSuggestions] = useState<SmartSuggestionsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestions() {
      // The AI-powered suggestions are disabled by default
      // as they require a valid API key.
      // If you have a valid GEMINI_API_KEY, you can uncomment the following block.
      /*
      try {
        setLoading(true);
        const result = await getSmartSuggestions({
          userId: 'user-123',
          recentTransactions: mockRecentTransactions,
        });
        setSuggestions(result);
      } catch (error) {
        console.error('Failed to get smart suggestions:', error);
      } finally {
        setLoading(false);
      }
      */
      
      // Using mock data to display the component.
      const mockSuggestions: SmartSuggestionsOutput = {
        suggestedTransactions: [
            {
                transactionType: 'recharge',
                merchantName: 'Mobile Recharge',
                amount: 299,
                description: 'Your monthly mobile plan might be due for a recharge.'
            },
            {
                transactionType: 'bill',
                merchantName: 'Electricity Bill',
                description: 'Pay your electricity bill to avoid late fees.'
            },
            {
                transactionType: 'payment',
                merchantName: 'Starbucks',
                amount: 450,
                description: 'Your usual coffee order.'
            }
        ]
      };
      setSuggestions(mockSuggestions);
      setLoading(false);
    }
    fetchSuggestions();
  }, []);

  return (
    <section>
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="text-primary" />
            <CardTitle>Smart Suggestions</CardTitle>
          </div>
          <CardDescription>AI-powered recommendations based on your habits.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loading && Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 border rounded-lg flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
            {suggestions?.suggestedTransactions.map((suggestion, index) => {
                const Icon = getIcon(suggestion.transactionType);
                return (
                    <div key={index} className="p-4 border rounded-lg flex flex-col justify-between gap-4 bg-background hover:bg-accent/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">
                                    {suggestion.merchantName || suggestion.transactionType}
                                    {suggestion.amount && ` - ₹${suggestion.amount}`}
                                </p>
                                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                            </div>
                        </div>
                         <Button size="sm" className="self-end">Pay Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                )
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
