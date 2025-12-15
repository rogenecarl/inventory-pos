import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { index, store } from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: index().url,
    },
    {
        title: 'Create',
        href: '#',
    },
];

interface Category {
    id: number;
    name: string;
}

interface ProductsCreateProps {
    categories: Category[];
}

export default function ProductsCreate({ categories }: ProductsCreateProps) {
    const form = useForm({
        name: '',
        category_id: '',
        sku: '',
        barcode: '',
        cost_price: '0',
        selling_price: '',
        stock_quantity: '0',
        low_stock_threshold: '10',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Create Product</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>
                                    Enter the product details.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">
                                        Product Name{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        value={form.data.name}
                                        onChange={(e) =>
                                            form.setData('name', e.target.value)
                                        }
                                        placeholder="Enter product name"
                                    />
                                    <InputError message={form.errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="category_id">Category</Label>
                                    <Select
                                        value={form.data.category_id}
                                        onValueChange={(value) =>
                                            form.setData('category_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        message={form.errors.category_id}
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="sku">SKU</Label>
                                        <Input
                                            id="sku"
                                            value={form.data.sku}
                                            onChange={(e) =>
                                                form.setData(
                                                    'sku',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="e.g., SKU-001"
                                        />
                                        <InputError message={form.errors.sku} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="barcode">Barcode</Label>
                                        <Input
                                            id="barcode"
                                            value={form.data.barcode}
                                            onChange={(e) =>
                                                form.setData(
                                                    'barcode',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="e.g., 1234567890123"
                                        />
                                        <InputError
                                            message={form.errors.barcode}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pricing & Stock */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing & Stock</CardTitle>
                                <CardDescription>
                                    Set the product pricing and inventory.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="cost_price">
                                            Cost Price{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <div className="relative">
                                            <span className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2">
                                                ₱
                                            </span>
                                            <Input
                                                id="cost_price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={form.data.cost_price}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'cost_price',
                                                        e.target.value,
                                                    )
                                                }
                                                className="pl-7"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <InputError
                                            message={form.errors.cost_price}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="selling_price">
                                            Selling Price{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <div className="relative">
                                            <span className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2">
                                                ₱
                                            </span>
                                            <Input
                                                id="selling_price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={form.data.selling_price}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'selling_price',
                                                        e.target.value,
                                                    )
                                                }
                                                className="pl-7"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <InputError
                                            message={form.errors.selling_price}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="stock_quantity">
                                            Stock Quantity{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="stock_quantity"
                                            type="number"
                                            min="0"
                                            value={form.data.stock_quantity}
                                            onChange={(e) =>
                                                form.setData(
                                                    'stock_quantity',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="0"
                                        />
                                        <InputError
                                            message={form.errors.stock_quantity}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="low_stock_threshold">
                                            Low Stock Threshold{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="low_stock_threshold"
                                            type="number"
                                            min="0"
                                            value={form.data.low_stock_threshold}
                                            onChange={(e) =>
                                                form.setData(
                                                    'low_stock_threshold',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="10"
                                        />
                                        <InputError
                                            message={
                                                form.errors.low_stock_threshold
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={form.data.is_active}
                                        onCheckedChange={(checked) =>
                                            form.setData(
                                                'is_active',
                                                checked as boolean,
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor="is_active"
                                        className="text-sm font-normal"
                                    >
                                        Product is active and available for sale
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href={index()}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing && <Spinner />}
                            Create Product
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
