import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
import {
    adjustStock,
    create,
    destroy,
    edit,
    index,
} from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2, Package } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: index().url,
    },
];

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    sku: string | null;
    category_id: number | null;
    category: Category | null;
    selling_price: string;
    stock_quantity: number;
    low_stock_threshold: number;
    is_active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface ProductsIndexProps {
    products: PaginatedProducts;
    categories: Category[];
    filters: {
        search: string;
        category: string;
    };
}

export default function ProductsIndex({
    products,
    categories,
    filters,
}: ProductsIndexProps) {
    const [search, setSearch] = useState(filters.search);
    const [category, setCategory] = useState(filters.category);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isAdjustOpen, setIsAdjustOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );

    const adjustForm = useForm({
        adjustment: 0,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            index().url,
            { search, category },
            { preserveState: true },
        );
    };

    const handleCategoryFilter = (value: string) => {
        const newCategory = value === 'all' ? '' : value;
        setCategory(newCategory);
        router.get(
            index().url,
            { search, category: newCategory },
            { preserveState: true },
        );
    };

    const openDelete = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteOpen(true);
    };

    const handleDelete = () => {
        if (!selectedProduct) return;
        router.delete(destroy(selectedProduct.id).url, {
            onSuccess: () => {
                setIsDeleteOpen(false);
                setSelectedProduct(null);
            },
        });
    };

    const openAdjust = (product: Product) => {
        setSelectedProduct(product);
        adjustForm.setData('adjustment', 0);
        setIsAdjustOpen(true);
    };

    const handleAdjust = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
        adjustForm.post(adjustStock(selectedProduct.id).url, {
            onSuccess: () => {
                setIsAdjustOpen(false);
                setSelectedProduct(null);
                adjustForm.reset();
            },
        });
    };

    const getStockBadge = (product: Product) => {
        if (product.stock_quantity === 0) {
            return <Badge variant="destructive">Out of Stock</Badge>;
        }
        if (product.stock_quantity <= product.low_stock_threshold) {
            return (
                <Badge className="bg-amber-500 hover:bg-amber-600">
                    Low Stock
                </Badge>
            );
        }
        return <Badge variant="secondary">In Stock</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Button asChild>
                        <Link href={create()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-1 gap-2"
                    >
                        <div className="relative flex-1">
                            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Search by name, SKU, or barcode..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Button type="submit" variant="secondary">
                            Search
                        </Button>
                    </form>
                    <Select
                        value={category || 'all'}
                        onValueChange={handleCategoryFilter}
                    >
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem
                                    key={cat.id}
                                    value={cat.id.toString()}
                                >
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {products.data.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-8">
                        <div className="text-center">
                            <Package className="text-muted-foreground mx-auto h-12 w-12" />
                            <h3 className="mt-4 text-lg font-medium">
                                No products found
                            </h3>
                            <p className="text-muted-foreground mt-1 text-sm">
                                {filters.search || filters.category
                                    ? 'Try adjusting your search or filter.'
                                    : 'Get started by creating your first product.'}
                            </p>
                            {!filters.search && !filters.category && (
                                <Button className="mt-4" asChild>
                                    <Link href={create()}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Product
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-lg border">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            SKU
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Category
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">
                                            Price
                                        </th>
                                        <th className="px-4 py-3 text-center text-sm font-medium">
                                            Stock
                                        </th>
                                        <th className="px-4 py-3 text-center text-sm font-medium">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="px-4 py-3 text-sm font-medium">
                                                {product.name}
                                            </td>
                                            <td className="text-muted-foreground px-4 py-3 text-sm">
                                                {product.sku || '-'}
                                            </td>
                                            <td className="text-muted-foreground px-4 py-3 text-sm">
                                                {product.category?.name || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm">
                                                ₱{product.selling_price}
                                            </td>
                                            <td className="px-4 py-3 text-center text-sm">
                                                <button
                                                    onClick={() =>
                                                        openAdjust(product)
                                                    }
                                                    className="hover:underline"
                                                >
                                                    {product.stock_quantity}
                                                </button>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {getStockBadge(product)}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={edit(
                                                                product.id,
                                                            )}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            openDelete(product)
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="flex items-center justify-between">
                                <p className="text-muted-foreground text-sm">
                                    Showing {products.data.length} of{' '}
                                    {products.total} products
                                </p>
                                <div className="flex gap-1">
                                    {products.links.map((link, idx) => (
                                        <Button
                                            key={idx}
                                            variant={
                                                link.active
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() =>
                                                link.url &&
                                                router.get(link.url)
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "
                            {selectedProduct?.name}"? This action cannot be
                            undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDeleteOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Stock Adjustment Modal */}
            <Dialog open={isAdjustOpen} onOpenChange={setIsAdjustOpen}>
                <DialogContent>
                    <form onSubmit={handleAdjust}>
                        <DialogHeader>
                            <DialogTitle>Adjust Stock</DialogTitle>
                            <DialogDescription>
                                Current stock: {selectedProduct?.stock_quantity}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="adjustment">
                                    Adjustment (+/-)
                                </Label>
                                <Input
                                    id="adjustment"
                                    type="number"
                                    value={adjustForm.data.adjustment}
                                    onChange={(e) =>
                                        adjustForm.setData(
                                            'adjustment',
                                            parseInt(e.target.value) || 0,
                                        )
                                    }
                                    placeholder="Enter positive or negative number"
                                />
                                {adjustForm.errors.adjustment && (
                                    <p className="text-sm text-red-500">
                                        {adjustForm.errors.adjustment}
                                    </p>
                                )}
                                <p className="text-muted-foreground text-sm">
                                    New stock:{' '}
                                    {(selectedProduct?.stock_quantity || 0) +
                                        adjustForm.data.adjustment}
                                </p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsAdjustOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={adjustForm.processing}
                            >
                                {adjustForm.processing && <Spinner />}
                                Adjust Stock
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
