<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Categories Routes
    Route::resource('categories', CategoryController::class)->except(['show', 'create', 'edit']);

    // Products Routes
    Route::post('products/{product}/adjust-stock', [ProductController::class, 'adjustStock'])->name('products.adjust-stock');
    Route::resource('products', ProductController::class)->except(['show']);

    // POS Routes (to be implemented)
    Route::get('pos', fn () => Inertia::render('pos/terminal'))->name('pos.index');

    // Sales Routes (to be implemented)
    Route::get('sales', fn () => Inertia::render('sales/index'))->name('sales.index');

    // Settings Routes (to be implemented)
    Route::get('store-settings', fn () => Inertia::render('settings/store'))->name('store-settings.index');
});

require __DIR__.'/settings.php';
