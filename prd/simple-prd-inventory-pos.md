# Simple Inventory + POS System
## 1-Week Project with Claude Code

---

## Project Overview

A minimal inventory management system with POS for small businesses. Designed to be built in **5-7 days** using Laravel 12 + React Inertia + Supabase.

---

## Tech Stack

- **Backend:** Laravel 12 + PHP 8.2
- **Frontend:** React + Inertia.js + Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Laravel Breeze (already installed)

---

## Features (Keep It Simple!)

### ✅ What We're Building
1. **Dashboard** - Sales today, product count, low stock alerts
2. **Products** - Add, edit, delete products with categories
3. **Categories** - Simple category management
4. **POS** - Sell products, cash payment only
5. **Sales** - View sales history
6. **Inventory** - Track stock, adjust quantities

### ❌ What We're NOT Building (Save for V2)
- Multiple payment methods
- Customer management
- Suppliers/Purchases
- Invoices
- Complex reports
- User roles (just owner for now)
- Receipt printing

---

## Database Schema (6 Tables Only)

### Table 1: stores
```sql
id
name
slug
address
phone
currency (default: 'PHP')
tax_rate (default: 0)
created_at
updated_at
```

### Table 2: users (modify existing)
```sql
+ store_id (foreign key)
+ role (default: 'owner')
+ is_active (default: true)
```

### Table 3: categories
```sql
id
store_id (foreign key)
name
created_at
updated_at
```

### Table 4: products
```sql
id
store_id (foreign key)
category_id (foreign key, nullable)
name
sku (nullable)
barcode (nullable)
cost_price (default: 0)
selling_price
stock_quantity (default: 0)
low_stock_threshold (default: 10)
is_active (default: true)
created_at
updated_at
```

### Table 5: sales
```sql
id
store_id (foreign key)
user_id (foreign key)
invoice_number (unique)
subtotal
tax_amount (default: 0)
total_amount
paid_amount
change_amount
status (default: 'completed')
created_at
updated_at
```

### Table 6: sale_items
```sql
id
sale_id (foreign key)
product_id (foreign key)
product_name (stored for history)
quantity
unit_price
total_price
created_at
```

---

## Pages Structure (10 Pages Only)

```
/dashboard          → Dashboard with stats
/products           → Product list
/products/create    → Add product form
/products/{id}/edit → Edit product form
/categories         → Category list (with modal create/edit)
/pos                → POS terminal
/sales              → Sales history list
/sales/{id}         → Sale details
/settings           → Store settings
```

---

## Development Schedule

### Day 1: Setup & Database
- [x] Configure Supabase connection
- [x] Create 6 migrations
- [x] Create 6 models with relationships
- [x] Create BelongsToStore trait
- [x] Modify registration to create store

### Day 2: Layout & Dashboard
- [x] Create sidebar layout
- [x] Build dashboard page with stats
- [x] Add navigation

### Day 3: Products & Categories
- [x] Categories CRUD (with modal)
- [x] Products CRUD (full pages)
- [x] Product search

### Day 4: POS Interface
- [ ] POS layout (products grid + cart)
- [ ] Add to cart functionality
- [ ] Cart management (qty, remove)

### Day 5: POS Checkout
- [ ] Payment modal (cash only)
- [ ] Process sale (create records)
- [ ] Deduct stock automatically
- [ ] Show success with receipt preview

### Day 6: Sales & Inventory
- [ ] Sales list page
- [ ] Sale details page
- [ ] Simple inventory view
- [ ] Stock adjustment

### Day 7: Polish
- [ ] Settings page (store info)
- [ ] Fix bugs
- [ ] Test all features
- [ ] Deploy

---

## File Structure

```
app/
├── Http/Controllers/
│   ├── DashboardController.php
│   ├── ProductController.php
│   ├── CategoryController.php
│   ├── POSController.php
│   ├── SaleController.php
│   └── SettingsController.php
├── Models/
│   ├── Store.php
│   ├── User.php
│   ├── Category.php
│   ├── Product.php
│   ├── Sale.php
│   └── SaleItem.php
├── Services/
│   └── POSService.php
└── Traits/
    └── BelongsToStore.php

resources/js/Pages/
├── Dashboard.jsx
├── Products/
│   ├── Index.jsx
│   ├── Create.jsx
│   └── Edit.jsx
├── Categories/
│   └── Index.jsx
├── POS/
│   └── Terminal.jsx
├── Sales/
│   ├── Index.jsx
│   └── Show.jsx
└── Settings/
    └── Index.jsx
```

---

## Routes

```php
// routes/web.php

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::resource('products', ProductController::class)->except(['show']);
    Route::resource('categories', CategoryController::class)->except(['show', 'create', 'edit']);
    
    Route::get('/pos', [POSController::class, 'index'])->name('pos.index');
    Route::post('/pos/checkout', [POSController::class, 'checkout'])->name('pos.checkout');
    
    Route::get('/sales', [SaleController::class, 'index'])->name('sales.index');
    Route::get('/sales/{sale}', [SaleController::class, 'show'])->name('sales.show');
    
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::put('/settings', [SettingsController::class, 'update'])->name('settings.update');
});
```

---

## Claude Code Commands (Copy & Paste)

### Day 1: Setup & Database

**Command 1 - Create Migrations:**
```
claude "Create Laravel migrations for a simple POS system with Supabase/PostgreSQL:

1. stores table: id, name, slug, address, phone, currency (default PHP), tax_rate (decimal 5,2 default 0), timestamps

2. Modify users table: add store_id (foreign key nullable), role (string default 'owner'), is_active (boolean default true)

3. categories table: id, store_id (foreign key cascade delete), name, timestamps

4. products table: id, store_id (foreign key cascade delete), category_id (foreign key nullable), name, sku (nullable), barcode (nullable), cost_price (decimal 10,2 default 0), selling_price (decimal 10,2), stock_quantity (integer default 0), low_stock_threshold (integer default 10), is_active (boolean default true), timestamps. Add indexes on store_id+barcode and store_id+name

5. sales table: id, store_id (foreign key cascade delete), user_id (foreign key cascade delete), invoice_number (string unique), subtotal (decimal 10,2), tax_amount (decimal 10,2 default 0), total_amount (decimal 10,2), paid_amount (decimal 10,2), change_amount (decimal 10,2 default 0), status (string default 'completed'), timestamps. Add index on store_id+created_at

6. sale_items table: id, sale_id (foreign key cascade delete), product_id (foreign key cascade delete), product_name (string), quantity (integer), unit_price (decimal 10,2), total_price (decimal 10,2), timestamps"
```

**Command 2 - Create Models:**
```
claude "Create Laravel Eloquent models:

1. Store model - hasMany: users, categories, products, sales. Fillable: name, slug, address, phone, currency, tax_rate

2. Update User model - belongsTo: store. Add to fillable: store_id, role, is_active. Add methods: isOwner()

3. Category model - belongsTo: store. hasMany: products. Fillable: store_id, name. Use BelongsToStore trait

4. Product model - belongsTo: store, category. hasMany: saleItems. Fillable: store_id, category_id, name, sku, barcode, cost_price, selling_price, stock_quantity, low_stock_threshold, is_active. Cast decimals. Use BelongsToStore trait. Add scope: lowStock()

5. Sale model - belongsTo: store, user. hasMany: saleItems. Fillable: store_id, user_id, invoice_number, subtotal, tax_amount, total_amount, paid_amount, change_amount, status. Cast decimals. Use BelongsToStore trait

6. SaleItem model - belongsTo: sale, product. Fillable: sale_id, product_id, product_name, quantity, unit_price, total_price. Cast decimals"
```

**Command 3 - Create BelongsToStore Trait:**
```
claude "Create app/Traits/BelongsToStore.php trait that:
1. In booted() method, adds creating event to set store_id from auth()->user()->store_id
2. Adds global scope to always filter by auth()->user()->store_id when user is logged in
3. Adds store() belongsTo relationship to Store model"
```

**Command 4 - Modify Registration:**
```
claude "Modify the Laravel Breeze registration:
1. Add 'store_name' field to RegisteredUserController validation and RegisterRequest
2. In the store method: first create Store with name and generated slug, then create User with store_id and role='owner'
3. Update resources/js/Pages/Auth/Register.jsx to include store_name input field with label 'Business Name'"
```

### Day 2: Layout & Dashboard

**Command 5 - Create Layout:**
```
claude "Update resources/js/Layouts/AuthenticatedLayout.jsx to have:
1. Fixed left sidebar (w-64) with dark background (#1f2937)
2. Logo/app name at top of sidebar
3. Navigation links with icons (use Lucide React): Dashboard, POS, Products, Categories, Sales, Settings
4. Main content area on the right with white background
5. Simple header with user dropdown (logout only)
6. Make it responsive - sidebar hidden on mobile with hamburger toggle
Use Tailwind CSS classes"
```

**Command 6 - Create Dashboard:**
```
claude "Create Dashboard page and controller:

1. DashboardController@index returns Inertia page with:
   - todaySales: sum of sales.total_amount where created_at is today
   - todayTransactions: count of sales today
   - totalProducts: count of products
   - lowStockProducts: products where stock_quantity <= low_stock_threshold (limit 5)
   - recentSales: latest 5 sales with items count

2. resources/js/Pages/Dashboard.jsx with:
   - 4 stat cards in grid: Today's Sales (₱), Transactions, Total Products, Low Stock Count
   - 'Go to POS' button linking to /pos
   - Recent Sales simple list (invoice#, time, amount)
   - Low Stock Alerts list (product name, current stock)"
```

### Day 3: Products & Categories

**Command 7 - Create Categories:**
```
claude "Create Categories module:

1. CategoryController with index (list all), store (create), update, destroy methods
   - All return Inertia or redirect back

2. resources/js/Pages/Categories/Index.jsx:
   - Simple table: Name, Products Count, Actions (edit/delete)
   - 'Add Category' button opens modal
   - Modal form with just 'name' field
   - Edit uses same modal
   - Delete with confirm dialog
   - Use Inertia useForm for submissions"
```

**Command 8 - Create Products:**
```
claude "Create Products module:

1. ProductController with full resource methods
   - index: paginated products with search query, category filter
   - create: return form page with categories
   - store: validate and create product
   - edit: return form page with product and categories  
   - update: validate and update product
   - destroy: delete product

2. resources/js/Pages/Products/Index.jsx:
   - Search input (searches name, sku, barcode)
   - Category filter dropdown
   - Table: Name, SKU, Category, Price, Stock, Status badge, Actions
   - Status badge: green if stock > threshold, yellow if low, red if 0
   - Pagination component
   - Link to create page

3. resources/js/Pages/Products/Create.jsx:
   - Form: name*, category dropdown, sku, barcode, cost_price, selling_price*, stock_quantity*, low_stock_threshold, is_active toggle
   - Validation errors display
   - Submit creates and redirects to index

4. resources/js/Pages/Products/Edit.jsx:
   - Same form as create, pre-filled with product data
   - Update button"
```

### Day 4-5: POS

**Command 9 - Create POS Interface:**
```
claude "Create POS Terminal:

1. POSController@index returns:
   - products: all active products with category
   - categories: all categories

2. resources/js/Pages/POS/Terminal.jsx:
   
   LEFT SIDE (65%):
   - Search input at top
   - Category tabs/pills (All + each category)
   - Product grid (3-4 columns): card with name, price, stock
   - Click card adds to cart

   RIGHT SIDE (35%):
   - Cart title with item count
   - Cart items: name, qty with +/- buttons, price, remove X
   - Subtotal line
   - Tax line (calculate from store.tax_rate)
   - Total line (bold, large)
   - PAY button (full width, green)
   - Clear button (text button)

   Use useState for cart: [{product_id, name, price, quantity}]
   Filter products by search and selected category"
```

**Command 10 - Create POS Checkout:**
```
claude "Create POS checkout functionality:

1. Add PaymentModal.jsx component:
   - Shows total amount large
   - Cash received input (number)
   - Change calculation (auto-updates)
   - 'Complete Sale' button (disabled if cash < total)
   - 'Cancel' button
   - Keyboard: Enter to complete if valid

2. POSService.php with processCheckout method:
   - Receives: items array, paid_amount, store tax_rate
   - Generates invoice_number: 'INV-' + YYYYMMDD + '-' + random 4 digits
   - Calculates subtotal, tax, total
   - Creates Sale record
   - Creates SaleItem records for each item
   - Decrements product stock_quantity for each item
   - Returns sale with items

3. POSController@checkout:
   - Validates request
   - Calls POSService
   - Returns success with sale data

4. After successful checkout in React:
   - Show success message with invoice number and change amount
   - Clear cart
   - Option to start new sale"
```

### Day 6: Sales & Inventory

**Command 11 - Create Sales Module:**
```
claude "Create Sales history pages:

1. SaleController:
   - index: paginated sales, newest first, with items count
   - show: single sale with all items

2. resources/js/Pages/Sales/Index.jsx:
   - Table: Invoice#, Date/Time, Items count, Total, Status
   - Click row goes to details
   - Simple date filter (today, 7 days, 30 days, all)
   - Pagination

3. resources/js/Pages/Sales/Show.jsx:
   - Sale header: Invoice#, Date, Cashier name
   - Items table: Product, Qty, Unit Price, Total
   - Summary: Subtotal, Tax, Total
   - Payment: Amount Paid, Change
   - Back to list button"
```

**Command 12 - Simple Inventory:**
```
claude "Add inventory features to Products:

1. Add to ProductController:
   - adjustStock method: receives product_id, adjustment (positive or negative), updates stock_quantity

2. Add to Products/Index.jsx:
   - 'Adjust Stock' button in actions column
   - Opens modal: shows current stock, input for adjustment (+/-), reason field (optional)
   - Submit calls adjustStock endpoint
   - Refreshes list

3. Add inventory stats to Dashboard:
   - Total inventory value: sum of (stock_quantity * cost_price)
   - Add to the stats cards"
```

### Day 7: Settings & Polish

**Command 13 - Create Settings:**
```
claude "Create Settings page:

1. SettingsController:
   - index: returns store data
   - update: validates and updates store

2. resources/js/Pages/Settings/Index.jsx:
   - Form fields: Store Name, Address, Phone, Currency (dropdown: PHP, USD), Tax Rate (%)
   - Save button
   - Show success message on save"
```

**Command 14 - Final Polish:**
```
claude "Add finishing touches:

1. Add loading states to all forms (disable button, show 'Loading...')
2. Add empty states when no products/sales (friendly message + action button)
3. Add toast notifications for success/error using simple alert or react-hot-toast
4. Make sure all pages have proper page titles
5. Add confirmation before delete actions
6. Test the full flow: register -> add category -> add product -> make sale -> view sale"
```

---

## Quick Reference

### Run Migrations
```bash
php artisan migrate
```

### Create Seeders (Optional)
```bash
php artisan make:seeder CategorySeeder
php artisan make:seeder ProductSeeder
php artisan db:seed
```

### Start Development
```bash
# Terminal 1
php artisan serve

# Terminal 2
npm run dev
```

### Common Fixes
```bash
# Clear everything
php artisan optimize:clear

# Refresh database
php artisan migrate:fresh

# Check routes
php artisan route:list
```

---

## Environment Variables (.env)

```env
APP_NAME="Simple POS"
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-password
```

---

## Success Checklist

By end of week, you should be able to:

- [ ] Register new account (creates store automatically)
- [ ] Login and see dashboard with stats
- [ ] Add categories
- [ ] Add products with stock
- [ ] Use POS to sell products
- [ ] See stock decrease after sale
- [ ] View sales history
- [ ] View sale details
- [ ] Adjust stock manually
- [ ] Update store settings

---

**Keep it simple. Ship it. Improve later!** 🚀