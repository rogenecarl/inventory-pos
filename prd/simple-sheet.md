# Quick Start Guide - Simple POS

## ✅ Already Done
- [x] Laravel project
- [x] React + Inertia
- [x] Tailwind CSS
- [x] Authentication

---

## 📋 Copy-Paste Commands for Claude Code

### Step 1: Configure Supabase
Update `.env`:
```env
DB_CONNECTION=pgsql
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-password
```

Test: `php artisan tinker` then `DB::connection()->getPdo();`

---

### Step 2: Create Migrations (Day 1)
```
claude "Create these Laravel migrations for PostgreSQL:

1. create_stores_table: id, name, slug (unique), address (nullable), phone (nullable), currency (string default 'PHP'), tax_rate (decimal 5,2 default 0), timestamps

2. add_store_id_to_users_table: add store_id (foreignId nullable constrained cascadeOnDelete), role (string default 'owner'), is_active (boolean default true)

3. create_categories_table: id, store_id (foreignId constrained cascadeOnDelete), name (string), timestamps

4. create_products_table: id, store_id (foreignId constrained cascadeOnDelete), category_id (foreignId nullable constrained nullOnDelete), name, sku (nullable), barcode (nullable), cost_price (decimal 10,2 default 0), selling_price (decimal 10,2), stock_quantity (integer default 0), low_stock_threshold (integer default 10), is_active (boolean default true), timestamps

5. create_sales_table: id, store_id (foreignId constrained cascadeOnDelete), user_id (foreignId constrained cascadeOnDelete), invoice_number (string unique), subtotal (decimal 10,2), tax_amount (decimal 10,2 default 0), total_amount (decimal 10,2), paid_amount (decimal 10,2), change_amount (decimal 10,2 default 0), status (string default 'completed'), timestamps

6. create_sale_items_table: id, sale_id (foreignId constrained cascadeOnDelete), product_id (foreignId constrained cascadeOnDelete), product_name (string), quantity (integer), unit_price (decimal 10,2), total_price (decimal 10,2), timestamps"
```

Then run: `php artisan migrate`

---

### Step 3: Create Models (Day 1)
```
claude "Create these Laravel models:

1. Store model: fillable [name, slug, address, phone, currency, tax_rate], hasMany users/categories/products/sales

2. Update User model: add store_id/role/is_active to fillable, belongsTo store, add isOwner() method

3. Category model: fillable [store_id, name], belongsTo store, hasMany products

4. Product model: fillable [store_id, category_id, name, sku, barcode, cost_price, selling_price, stock_quantity, low_stock_threshold, is_active], belongsTo store/category, casts for decimals, scope scopeLowStock

5. Sale model: fillable [store_id, user_id, invoice_number, subtotal, tax_amount, total_amount, paid_amount, change_amount, status], belongsTo store/user, hasMany saleItems, casts for decimals

6. SaleItem model: fillable [sale_id, product_id, product_name, quantity, unit_price, total_price], belongsTo sale/product, casts for decimals

Also create app/Traits/BelongsToStore.php trait that auto-sets store_id on create and adds global scope to filter by current user's store_id. Apply to Category, Product, Sale models."
```

---

### Step 4: Modify Registration (Day 1)
```
claude "Modify Laravel Breeze registration to:
1. Add 'store_name' field to validation (required string max 255)
2. Create Store first with name=store_name and slug=Str::slug(store_name)
3. Create User with store_id from new store and role='owner'
4. Update Register.jsx to add 'Business Name' input field above email"
```

---

### Step 5: Create Layout (Day 2)
```
claude "Update AuthenticatedLayout.jsx:
- Left sidebar (w-64, bg-gray-800, text-white) with navigation links: Dashboard (/dashboard), POS (/pos), Products (/products), Categories (/categories), Sales (/sales), Settings (/settings)
- Use Lucide React icons for each link
- Main content area (bg-gray-100, min-h-screen)
- Simple header with store name and logout button
- Mobile: hamburger menu to toggle sidebar"
```

---

### Step 6: Create Dashboard (Day 2)
```
claude "Create Dashboard:
1. DashboardController@index: get todaySales (sum), todayCount, productCount, lowStockCount, recentSales (5), lowStockProducts (5)
2. Dashboard.jsx: 4 stat cards in grid, 'Open POS' button, Recent Sales list, Low Stock list"
```

---

### Step 7: Create Categories (Day 3)
```
claude "Create Categories CRUD:
1. CategoryController: index (with products count), store, update, destroy - all Inertia
2. Categories/Index.jsx: table with name/count/actions, Add button opens modal, edit/delete in modal, use useForm"
```

---

### Step 8: Create Products (Day 3)
```
claude "Create Products CRUD:
1. ProductController: index (paginated, searchable), create, store, edit, update, destroy
2. Products/Index.jsx: search input, category filter, table (name/sku/category/price/stock/status/actions), pagination
3. Products/Create.jsx: form with name/category/sku/barcode/cost_price/selling_price/stock_quantity/low_stock_threshold/is_active
4. Products/Edit.jsx: same form pre-filled"
```

---

### Step 9: Create POS (Day 4)
```
claude "Create POS Terminal:
1. POSController@index: return all active products and categories
2. POS/Terminal.jsx layout:
   - Left 2/3: search bar, category filter pills, product grid (click to add to cart)
   - Right 1/3: cart list (item/qty/price/remove), subtotal, tax, total, PAY button, Clear button
   - Use useState for cart array [{id, name, price, qty}]"
```

---

### Step 10: Create Checkout (Day 5)
```
claude "Create POS checkout:
1. PaymentModal.jsx: show total, cash input, change display, Complete/Cancel buttons
2. POSService.php: processCheckout() - generate invoice number, calculate totals, create Sale + SaleItems, decrement stock
3. POSController@checkout: validate, call service, return sale data
4. On success: show receipt summary, clear cart"
```

---

### Step 11: Create Sales (Day 6)
```
claude "Create Sales pages:
1. SaleController: index (paginated sales), show (sale with items)
2. Sales/Index.jsx: table with invoice/date/items/total, click row to view
3. Sales/Show.jsx: sale details, items table, totals, back button"
```

---

### Step 12: Create Settings (Day 7)
```
claude "Create Settings:
1. SettingsController: index (get store), update (save store)
2. Settings/Index.jsx: form with store name/address/phone/tax_rate, save button"
```

---

### Step 13: Stock Adjustment (Day 6)
```
claude "Add stock adjustment to Products/Index.jsx:
- Add 'Adjust' button to each row
- Modal: show current stock, input +/- number, submit updates product stock_quantity
- Add adjustStock method to ProductController"
```

---

## 🔧 Troubleshooting

```bash
# Database issues
php artisan migrate:fresh

# Clear cache
php artisan optimize:clear

# Check routes
php artisan route:list

# Inertia errors
npm run dev  # make sure Vite is running
```

---

## ✅ Test Checklist

1. [ ] Register → creates store + user
2. [ ] Add category
3. [ ] Add product with stock
4. [ ] POS: add items to cart
5. [ ] POS: checkout with cash
6. [ ] Stock reduced after sale
7. [ ] Sale appears in history
8. [ ] View sale details
9. [ ] Adjust stock manually
10. [ ] Update settings

---

**Done! You have a working POS system.** 🎉