# InvenPOS - Claude Code Quick Reference

## ✅ Current Progress
- [x] Laravel project created
- [x] React + Inertia installed
- [x] Tailwind CSS configured
- [x] Laravel built-in authentication ready

---

## 🗄️ Step 1: Configure Supabase (Do This First!)

### 1.1 Create Supabase Project
1. Go to https://supabase.com → New Project
2. Note down:
   - Project URL: `https://xxxx.supabase.co`
   - Database Password (save this!)
   - Go to **Settings → Database** → Connection string

### 1.2 Update .env File
```env
DB_CONNECTION=pgsql
DB_HOST=db.xxxxxxxxxxxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-database-password

SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=invenpos
```

### 1.3 Test Connection
```bash
php artisan db:show
# or
php artisan tinker
>>> DB::connection()->getPdo();
```

---

## 🚀 Phase 1: Foundation (Days 1-3)

### Day 1: Database & Models

#### Step 1: Create All Migrations
```bash
claude "Read the PRD-INVENTORY-POS-SAAS.md file and create all 14 database migrations for PostgreSQL/Supabase as specified in section 5.3. Start with stores table, then modify users table, then categories, products, customers, suppliers, sales, sale_items, payments, purchases, purchase_items, stock_adjustments, invoices, and held_transactions. Use string columns instead of enums for PostgreSQL compatibility."
```

#### Step 2: Run Migrations
```bash
php artisan migrate
```

#### Step 3: Create All Models
```bash
claude "Create all Eloquent models based on PRD section 5.5:
- Store (hasMany: users, categories, products, customers, suppliers, sales, purchases, payments, invoices, stockAdjustments, heldTransactions)
- Category (belongsTo: store, hasMany: products)  
- Product (belongsTo: store, category, hasMany: saleItems, purchaseItems, stockAdjustments)
- Customer (belongsTo: store, hasMany: sales, invoices)
- Supplier (belongsTo: store, hasMany: purchases)
- Sale (belongsTo: store, user, customer, hasMany: saleItems, payments, hasOne: invoice)
- SaleItem (belongsTo: sale, product)
- Purchase (belongsTo: store, supplier, user, hasMany: purchaseItems, payments)
- PurchaseItem (belongsTo: purchase, product)
- Payment (belongsTo: store, sale, purchase)
- Invoice (belongsTo: store, sale, customer)
- StockAdjustment (belongsTo: store, product, user)
- HeldTransaction (belongsTo: store, user, customer)

Include proper fillable arrays, casts for decimals/dates/json, and use the BelongsToStore trait for multi-tenancy."
```

#### Step 4: Create Multi-Tenant Trait
```bash
claude "Create a BelongsToStore trait in app/Traits that:
1. Automatically sets store_id from authenticated user on model creation
2. Adds a global scope to filter all queries by store_id
3. Adds a store() belongsTo relationship
Apply this trait to all models except User and Store."
```

#### Step 5: Update User Model
```bash
claude "Update the User model to:
1. Add store() belongsTo relationship
2. Add role constants (SUPER_ADMIN, OWNER, MANAGER, CASHIER)
3. Add helper methods: isOwner(), isManager(), isCashier(), hasRole()
4. Add relationships: sales(), stockAdjustments(), heldTransactions()
5. Add fillable fields: store_id, role, phone, avatar, is_active"
```

### Day 2: Auth Customization & Layout

#### Step 1: Modify Registration
```bash
claude "Modify the registration controller and page to:
1. Add 'store_name' field to registration form
2. On registration: create Store first, then create User with store_id and role='owner'
3. Generate store slug from store_name
4. Redirect to /dashboard after registration
Update both the controller and the React Register.jsx page."
```

#### Step 2: Create Store Middleware
```bash
claude "Create EnsureStoreAccess middleware that:
1. Checks if user has a store_id
2. If no store_id, redirect to store setup page
3. Register it in bootstrap/app.php
4. Apply to all authenticated routes except setup"
```

#### Step 3: Create App Layout with Sidebar
```bash
claude "Update the AuthenticatedLayout.jsx to have:
1. Fixed sidebar on left (250px wide) with navigation menu
2. Header bar with store name, notifications bell, user dropdown
3. Main content area on right
4. Mobile responsive (hamburger menu)

Navigation menu items:
- Dashboard (icon: LayoutDashboard)
- POS (icon: ShoppingCart) 
- Products (icon: Package) with sub-items: All Products, Categories
- Inventory (icon: Warehouse)
- Sales (icon: Receipt)
- Purchases (icon: Truck)
- Customers (icon: Users)
- Suppliers (icon: Building)
- Invoices (icon: FileText)
- Reports (icon: BarChart3)
- Settings (icon: Settings) - only for owner role

Use Lucide React icons and Tailwind CSS."
```

#### Step 4: Create Dashboard Page
```bash
claude "Create Dashboard/Index.jsx page with:
1. Welcome message with user name
2. Quick action button 'Go to POS'
3. 4 stat cards in a row: Today's Sales (₱), Transactions Count, Products Count, Low Stock Count
4. Sales chart for last 7 days (use Recharts)
5. Two columns below: Recent Sales list, Low Stock Alerts list
Create DashboardController to provide the data via Inertia."
```

### Day 3: Products & Categories

#### Step 1: Create Category Management
```bash
claude "Create CategoryController with CRUD and Category React components:
1. Index page with simple table (Name, Description, Products Count, Actions)
2. Create/Edit using Modal dialog (not separate page)
3. Delete with confirmation
4. Use Inertia forms for submission
Routes: GET/POST /categories, PUT/DELETE /categories/{id}"
```

#### Step 2: Create Product CRUD
```bash
claude "Create ProductController with full CRUD and React pages:

1. Products/Index.jsx:
   - DataTable with columns: Image, Name, SKU, Category, Price, Stock, Status, Actions
   - Search bar (searches name, sku, barcode)
   - Filter by category dropdown
   - Filter by status (All, Active, Inactive, Low Stock)
   - Bulk delete checkbox
   - Pagination

2. Products/Create.jsx & Products/Edit.jsx:
   - Form fields: name*, sku, barcode, category_id, description, cost_price*, selling_price*, stock_quantity*, low_stock_threshold, unit, image upload, is_active toggle
   - Image preview on upload
   - Form validation with error messages

3. ProductController methods: index, create, store, edit, update, destroy, toggleStatus
4. ProductRequest for validation

Routes: resource route for products"
```

#### Step 3: Create Seeders (Optional but helpful)
```bash
claude "Create database seeders:
1. StoreSeeder - creates a demo store
2. UserSeeder - creates owner user for demo store
3. CategorySeeder - creates 5 sample categories
4. ProductSeeder - creates 20 sample products with random data
Update DatabaseSeeder to call them in order."
```

---

## 🚀 Phase 2: POS & Sales (Days 4-6)

### Day 4: POS Interface

```bash
claude "Create the POS Terminal page (POS/Terminal.jsx) with:

LEFT SIDE (60% width):
- Search bar with barcode scanner support (auto-submit on 8+ digit input)
- Category filter tabs (All + categories from DB)
- Product grid (4 columns) showing: image, name, price, stock
- Click product to add to cart
- Pagination or infinite scroll

RIGHT SIDE (40% width):
- Cart header with item count
- Cart items list: product name, quantity controls (+/-), unit price, line total, remove button
- Subtotal, Discount line, Tax line, Total
- Add Discount button (opens modal)
- PAY button (large, prominent)
- Clear Cart button

Create POSController with methods:
- index() - returns products, categories
- search() - AJAX product search

Use React state for cart management (useState or useReducer)."
```

### Day 5: Payment & Checkout

```bash
claude "Create payment functionality:

1. PaymentModal.jsx component:
   - Display total amount prominently
   - Payment method tabs: Cash, Card, E-Wallet
   - For Cash: amount input, auto-calculate change
   - For Card/E-Wallet: reference number input
   - Split payment toggle (allows multiple methods)
   - Complete Sale button
   - Cancel button

2. POSService.php with methods:
   - processCheckout(cartItems, paymentData, customerId, discount)
   - generateInvoiceNumber() - format: INV-YYYYMMDD-XXXX
   - calculateTotals(items, discountType, discountValue, taxRate)
   - Creates: Sale, SaleItems, Payment records
   - Deducts stock from products
   - Creates StockAdjustment records for audit

3. Receipt.jsx component:
   - Printable receipt matching PRD format
   - Store name, address, phone from store settings
   - Invoice number, date, cashier
   - Items with qty, price, total
   - Subtotal, discount, tax, grand total
   - Payment method and amount
   - Print button using react-to-print
   - Option to email receipt

4. POSController@checkout method for processing"
```

### Day 6: Sales Management

```bash
claude "Create Sales module:

1. Sales/Index.jsx:
   - DataTable: Invoice#, Date, Customer, Items, Total, Payment Status, Status, Actions
   - Date range filter
   - Status filter
   - Search by invoice number
   - Click row to view details

2. Sales/Show.jsx:
   - Sale header info (invoice#, date, cashier, customer)
   - Items table with quantities and prices
   - Payment summary
   - Reprint Receipt button
   - Refund button (if not already refunded)

3. Refund functionality:
   - RefundModal.jsx - select items to refund or full refund
   - POSService@processRefund - creates refund record, restores stock
   - Updates sale status to 'refunded'

4. SaleController with: index, show, refund, receipt methods"
```

---

## 🚀 Phase 3: Inventory & Procurement (Days 7-9)

### Day 7: Inventory Management

```bash
claude "Create Inventory module:

1. Inventory/Index.jsx:
   - Summary cards: Total Products, Total Stock Value (Cost), Total Stock Value (Retail), Low Stock Items
   - Products table: Name, SKU, Current Stock, Low Threshold, Status (OK/Low/Out), Actions
   - Filter: All, Low Stock, Out of Stock
   - Adjust Stock button per row

2. Inventory/Adjust.jsx (or Modal):
   - Select product (searchable dropdown)
   - Show current stock
   - Adjustment type: Stock In, Stock Out, Damage, Return, Adjustment
   - Quantity input
   - Reason textarea
   - Preview: Before → After
   - Submit creates StockAdjustment record and updates product

3. Inventory/History.jsx:
   - Table: Date, Product, Type, Quantity, Before, After, User, Reason
   - Filter by product, type, date range

4. InventoryController with: index, adjust, history
5. InventoryService for stock operations"
```

### Day 8: Suppliers & Purchases

```bash
claude "Create Suppliers and Purchases modules:

SUPPLIERS:
1. Suppliers/Index.jsx - DataTable with CRUD
2. SupplierController - standard resource controller

PURCHASES:
1. Purchases/Index.jsx:
   - Table: Reference#, Date, Supplier, Total, Status, Payment Status, Actions
   - Filter by status: Pending, Received, Cancelled

2. Purchases/Create.jsx:
   - Supplier dropdown
   - Purchase date
   - Add items section: product search, quantity, unit cost
   - Items table with totals
   - Notes field
   - Save as Pending

3. Purchases/Show.jsx:
   - Purchase details
   - Items list
   - Receive button (if pending) - updates stock
   - Record Payment button

4. PurchaseController: index, create, store, show, receive, recordPayment
5. PurchaseService for receiving logic"
```

### Day 9: Customers

```bash
claude "Create Customers module:

1. Customers/Index.jsx:
   - DataTable: Name, Phone, Email, Total Purchases, Balance, Actions
   - Search by name/phone
   - Create/Edit via modal

2. Customers/Show.jsx:
   - Customer info card
   - Purchase history table
   - Total spent stats

3. POS Integration:
   - Add customer selector to POS (optional field)
   - Search existing or create new
   - Show customer name on receipt

4. CustomerController: index, store, show, update, destroy, search (for AJAX)"
```

---

## 🚀 Phase 4: Invoicing & Reports (Days 10-12)

### Day 10: Invoices & Payments

```bash
claude "Create Invoices module:

1. Invoices/Index.jsx:
   - Table: Invoice#, Customer, Amount, Due Date, Status, Actions
   - Filter by status: Draft, Sent, Paid, Overdue
   - Overdue highlighted in red

2. Invoices/Show.jsx:
   - Professional invoice view
   - Download PDF button
   - Send Email button
   - Record Payment button
   - Payment history

3. InvoiceService:
   - generatePDF() using DomPDF
   - sendEmail()
   - markOverdue() - scheduled command

4. PaymentController:
   - Record payments against invoices
   - Partial payment support

5. InvoiceController: index, show, downloadPdf, sendEmail, recordPayment"
```

### Day 11: Reports

```bash
claude "Create Reports module:

1. Reports/Index.jsx - Report selection dashboard with cards:
   - Sales Report
   - Inventory Report  
   - Product Performance
   - Profit Report

2. Reports/Sales.jsx:
   - Date range picker
   - Summary cards: Total Sales, Transactions, Avg Transaction
   - Sales by day chart (bar chart)
   - Sales by payment method (pie chart)
   - Sales by cashier table
   - Export PDF/Excel buttons

3. Reports/Inventory.jsx:
   - Current stock valuation
   - Low stock list
   - Stock movement summary
   - Export options

4. Reports/Products.jsx:
   - Top 10 by quantity sold
   - Top 10 by revenue
   - Category performance

5. Reports/Profit.jsx:
   - Revenue vs Cost chart
   - Gross profit calculation
   - Profit margin

6. ReportController with methods for each report
7. ReportService for calculations
8. Export functionality using DomPDF and Maatwebsite/Excel"
```

### Day 12: Settings

```bash
claude "Create Settings module:

1. Settings/Index.jsx - Settings menu/tabs

2. Settings/Store.jsx:
   - Store name, email, phone, address
   - Logo upload (to Supabase Storage)
   - Currency selection
   - Timezone

3. Settings/Tax.jsx:
   - Tax rate percentage
   - Tax name (VAT, GST, etc)
   - Tax inclusive toggle

4. Settings/Receipt.jsx:
   - Receipt header text
   - Receipt footer text
   - Show logo toggle

5. Settings/Users/Index.jsx:
   - Users table: Name, Email, Role, Status, Actions
   - Invite new user button
   - Edit role, activate/deactivate

6. Settings/Users/Invite.jsx:
   - Email input
   - Role selection
   - Sends invitation email

7. SettingsController: store, tax, receipt, users
8. UserController for user management
9. Apply role-based access (owner only)"
```

---

## 🚀 Phase 5: Polish & Deploy (Days 13-14)

### Day 13: Testing & Polish

```bash
claude "Add finishing touches:

1. Loading states - add skeleton loaders to all data tables
2. Empty states - friendly messages when no data
3. Error handling - toast notifications for errors
4. Form validation - client-side validation with error messages
5. Keyboard shortcuts for POS:
   - / or F3: Focus search
   - F2: Open payment modal
   - Escape: Clear/Cancel
6. Mobile responsive check for all pages
7. Write feature tests for critical paths:
   - User registration creates store
   - POS checkout flow
   - Stock deduction on sale
   - Refund restores stock"
```

### Day 14: Deployment

```bash
# Build for production
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations on production
php artisan migrate --force
```

---

## 📁 Key Files Reference

### Models
```
app/Models/Store.php
app/Models/User.php
app/Models/Product.php
app/Models/Category.php
app/Models/Sale.php
app/Models/SaleItem.php
app/Models/Customer.php
app/Models/Supplier.php
app/Models/Purchase.php
app/Models/Payment.php
app/Models/Invoice.php
app/Models/StockAdjustment.php
app/Models/HeldTransaction.php
```

### Controllers
```
app/Http/Controllers/DashboardController.php
app/Http/Controllers/POSController.php
app/Http/Controllers/ProductController.php
app/Http/Controllers/CategoryController.php
app/Http/Controllers/SaleController.php
app/Http/Controllers/InventoryController.php
app/Http/Controllers/PurchaseController.php
app/Http/Controllers/SupplierController.php
app/Http/Controllers/CustomerController.php
app/Http/Controllers/InvoiceController.php
app/Http/Controllers/ReportController.php
app/Http/Controllers/SettingsController.php
```

### Services
```
app/Services/POSService.php
app/Services/InventoryService.php
app/Services/ReportService.php
app/Services/InvoiceService.php
app/Services/StorageService.php
```

### React Pages
```
resources/js/Pages/Dashboard/Index.jsx
resources/js/Pages/POS/Terminal.jsx
resources/js/Pages/Products/Index.jsx
resources/js/Pages/Products/Create.jsx
resources/js/Pages/Products/Edit.jsx
resources/js/Pages/Categories/Index.jsx
resources/js/Pages/Sales/Index.jsx
resources/js/Pages/Sales/Show.jsx
resources/js/Pages/Inventory/Index.jsx
resources/js/Pages/Inventory/History.jsx
resources/js/Pages/Purchases/Index.jsx
resources/js/Pages/Purchases/Create.jsx
resources/js/Pages/Customers/Index.jsx
resources/js/Pages/Suppliers/Index.jsx
resources/js/Pages/Invoices/Index.jsx
resources/js/Pages/Reports/Index.jsx
resources/js/Pages/Reports/Sales.jsx
resources/js/Pages/Settings/Store.jsx
resources/js/Pages/Settings/Users/Index.jsx
```

---

## 🔧 Common Fixes

### Supabase Connection Issues
```bash
# Check pgsql extension
php -m | grep pgsql

# Test connection
php artisan tinker
>>> DB::connection()->getPdo();
```

### Migration Errors
```bash
# Reset and re-run
php artisan migrate:fresh

# Check for enum issues - use string instead
```

### Multi-tenant Not Working
```bash
claude "Debug: Check that BelongsToStore trait is applied to model and store_id is being set"
```

### Inertia Page Not Found
```bash
# Check file exists at exact path
# Check component name matches route

claude "Fix Inertia 'Page not found' error for [PageName]"
```

### Stock Not Updating
```bash
claude "Debug POSService checkout method - ensure stock deduction and StockAdjustment creation"
```

---

## 🎯 MVP Checklist (1 Week)

If time is limited, focus on these core features:

### Must Have
- [x] Auth + Registration with Store ✓ (already done)
- [ ] Supabase connection
- [ ] Database migrations
- [ ] Models with relationships
- [ ] Products CRUD
- [ ] Categories CRUD
- [ ] Basic POS (cash payment only)
- [ ] Sales history
- [ ] Simple stock tracking
- [ ] Basic dashboard

### Nice to Have (Week 2)
- [ ] Multiple payment methods
- [ ] Customers module
- [ ] Suppliers & Purchases
- [ ] Invoices
- [ ] Detailed reports
- [ ] User management
- [ ] Receipt customization

---

## 📞 Quick Commands by Feature

```bash
# If you get stuck on any feature:
claude "I'm building [feature]. Read PRD-INVENTORY-POS-SAAS.md and help me implement it following the specifications."

# To debug issues:
claude "I have an error: [paste error]. Fix it."

# To add missing piece:
claude "Add [specific functionality] to [file/component]"
```

---

**Remember:** Always reference the PRD file in your Claude commands for consistent implementation!