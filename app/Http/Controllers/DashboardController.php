<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $today = Carbon::today();

        $todaySales = Sale::whereDate('created_at', $today)->sum('total_amount');
        $todayTransactions = Sale::whereDate('created_at', $today)->count();
        $totalProducts = Product::where('is_active', true)->count();
        $lowStockCount = Product::where('is_active', true)->lowStock()->count();

        $lowStockProducts = Product::where('is_active', true)
            ->lowStock()
            ->select('id', 'name', 'stock_quantity', 'low_stock_threshold')
            ->limit(5)
            ->get();

        $recentSales = Sale::with('saleItems')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($sale) => [
                'id' => $sale->id,
                'invoice_number' => $sale->invoice_number,
                'total_amount' => $sale->total_amount,
                'items_count' => $sale->saleItems->count(),
                'created_at' => $sale->created_at->format('M d, Y h:i A'),
            ]);

        return Inertia::render('dashboard', [
            'todaySales' => number_format($todaySales, 2),
            'todayTransactions' => $todayTransactions,
            'totalProducts' => $totalProducts,
            'lowStockCount' => $lowStockCount,
            'lowStockProducts' => $lowStockProducts,
            'recentSales' => $recentSales,
        ]);
    }
}
