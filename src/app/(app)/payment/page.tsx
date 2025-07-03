
import { Suspense } from 'react';
import { PaymentPageClient } from './payment-page-client';
import { Skeleton } from '@/components/ui/skeleton';

function PaymentPageSkeleton() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 h-full">
            <header className="mb-8 text-center">
                <Skeleton className="h-9 w-3/4 mx-auto" />
                <Skeleton className="h-5 w-1/2 mx-auto mt-3" />
            </header>
            
            <div className="max-w-md mx-auto">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
                    <div className="space-y-1.5">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="grid grid-cols-3 gap-1 h-11 p-1 bg-muted rounded-md">
                        <Skeleton className="h-full w-full rounded-sm" />
                        <Skeleton className="h-full w-full rounded-sm" />
                        <Skeleton className="h-full w-full rounded-sm" />
                    </div>
                     <div className="space-y-4 mt-6">
                        <div className="p-3 border rounded-md">
                            <Skeleton className="h-5 w-full" />
                        </div>
                        <Skeleton className="h-11 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function PaymentPage() {
    return (
        <Suspense fallback={<PaymentPageSkeleton />}>
            <PaymentPageClient />
        </Suspense>
    );
}
