import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index as posIndex } from '@/routes/pos';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    DollarSign,
    Monitor,
    Package,
    ShoppingCart,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface LowStockProduct {
    id: number;
    name: string;
    stock_quantity: number;
    low_stock_threshold: number;
}

interface RecentSale {
    id: number;
    invoice_number: string;
    total_amount: string;
    items_count: number;
    created_at: string;
}

interface DashboardProps {
    todaySales: string;
    todayTransactions: number;
    totalProducts: number;
    lowStockCount: number;
    lowStockProducts: LowStockProduct[];
    recentSales: RecentSale[];
}

export default function Dashboard({
    todaySales,
    todayTransactions,
    totalProducts,
    lowStockCount,
    lowStockProducts,
    recentSales,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Today's Sales
                            </CardTitle>
                            <DollarSign className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ₱{todaySales}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Total revenue today
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Transactions
                            </CardTitle>
                            <ShoppingCart className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {todayTransactions}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Sales today
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Products
                            </CardTitle>
                            <Package className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalProducts}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Active products
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Low Stock
                            </CardTitle>
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-500">
                                {lowStockCount}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Products need restocking
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Open POS Button */}
                <div>
                    <Button asChild size="lg" className="w-full md:w-auto">
                        <Link href={posIndex()}>
                            <Monitor className="mr-2 h-5 w-5" />
                            Open POS Terminal
                        </Link>
                    </Button>
                </div>

                {/* Recent Sales & Low Stock */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Recent Sales */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>
                                Latest transactions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentSales.length === 0 ? (
                                <p className="text-muted-foreground text-sm">
                                    No sales yet
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {recentSales.map((sale) => (
                                        <div
                                            key={sale.id}
                                            className="flex items-center justify-between"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {sale.invoice_number}
                                                </p>
                                                <p className="text-muted-foreground text-xs">
                                                    {sale.items_count} items •{' '}
                                                    {sale.created_at}
                                                </p>
                                            </div>
                                            <div className="font-medium">
                                                ₱{sale.total_amount}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Low Stock Alerts */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Low Stock Alerts</CardTitle>
                            <CardDescription>
                                Products that need restocking
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {lowStockProducts.length === 0 ? (
                                <p className="text-muted-foreground text-sm">
                                    All products are well stocked
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {lowStockProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex items-center justify-between"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {product.name}
                                                </p>
                                                <p className="text-muted-foreground text-xs">
                                                    Threshold:{' '}
                                                    {product.low_stock_threshold}
                                                </p>
                                            </div>
                                            <div
                                                className={`font-medium ${
                                                    product.stock_quantity === 0
                                                        ? 'text-red-500'
                                                        : 'text-amber-500'
                                                }`}
                                            >
                                                {product.stock_quantity} left
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
