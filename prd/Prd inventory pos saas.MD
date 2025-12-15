# Product Requirements Document (PRD)
# SaaS Inventory Management System with POS

**Version:** 1.0  
**Last Updated:** December 2024  
**Project Codename:** InvenPOS  
**Target Completion:** 1-2 Weeks  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technical Stack](#2-technical-stack)
3. [Development Phases](#3-development-phases)
4. [User Roles & Permissions](#4-user-roles--permissions)
5. [Complete Database Schema](#5-complete-database-schema)
6. [Feature Specifications](#6-feature-specifications)
7. [Page Specifications](#7-page-specifications)
8. [API Endpoints](#8-api-endpoints)
9. [Application Flows](#9-application-flows)
10. [Project Structure](#10-project-structure)
11. [UI/UX Guidelines](#11-uiux-guidelines)
12. [Testing Requirements](#12-testing-requirements)
13. [Deployment Checklist](#13-deployment-checklist)
14. [Claude Code Commands](#14-claude-code-commands)

---

## 1. Project Overview

### 1.1 Purpose
A simple, efficient SaaS-based inventory management system with integrated Point of Sale (POS) designed specifically for small businesses. The system enables business owners to manage products, track inventory, process sales, handle invoices, and generate reports.

### 1.2 Target Users
- Small retail stores
- Mini groceries
- Boutiques and specialty shops
- Small restaurants/cafes (basic inventory)
- Home-based businesses

### 1.3 Core Value Proposition
- **Simple**: Easy to use, minimal learning curve
- **Fast**: Quick POS transactions
- **Affordable**: SaaS model with free tier
- **Complete**: All essential features in one place

### 1.4 Success Metrics
- Store registration and onboarding < 5 minutes
- POS transaction completion < 30 seconds
- Daily sales report generation < 3 seconds
- System uptime > 99%

---

## 2. Technical Stack

### 2.1 Backend
| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Laravel | 12.x |
| PHP | PHP | 8.2+ |
| Database | Supabase (PostgreSQL) | 15.x |
| Cache | Redis / File | 7.x |
| Queue | Laravel Queue (database) | - |
| Storage | Supabase Storage | - |

### 2.2 Frontend
| Component | Technology | Version |
|-----------|------------|---------|
| Framework | React | 18.x |
| Adapter | Inertia.js | 1.x |
| Styling | Tailwind CSS | 3.x |
| UI Components | shadcn/ui | Latest |
| Icons | Lucide React | Latest |
| Charts | Recharts | 2.x |
| Tables | TanStack Table | 8.x |

### 2.3 Authentication
| Component | Technology |
|-----------|------------|
| Auth Scaffold | Laravel Breeze |
| Session | Database Sessions |

### 2.4 Database (Supabase)
| Feature | Usage |
|---------|-------|
| PostgreSQL | Primary database |
| Supabase Storage | Product images, receipts, invoices |
| Row Level Security | Optional additional security layer |
| Realtime | Optional for live POS updates |

### 2.5 Additional Packages
```json
{
  "php": {
    "barryvdh/laravel-dompdf": "PDF generation",
    "maatwebsite/excel": "Excel exports",
    "intervention/image": "Image processing"
  },
  "npm": {
    "react-to-print": "Receipt printing",
    "date-fns": "Date formatting",
    "zustand": "State management (optional)",
    "react-hot-toast": "Notifications",
    "@supabase/supabase-js": "Supabase client (optional for storage)"
  }
}
```

### 2.6 Supabase Configuration

#### Environment Variables
```env
DB_CONNECTION=pgsql
DB_HOST=db.xxxxxxxxxxxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-database-password

# Supabase specific (for Storage/Realtime - optional)
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
```

#### Laravel Database Config (config/database.php)
```php
'pgsql' => [
    'driver' => 'pgsql',
    'url' => env('DATABASE_URL'),
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '5432'),
    'database' => env('DB_DATABASE', 'postgres'),
    'username' => env('DB_USERNAME', 'postgres'),
    'password' => env('DB_PASSWORD', ''),
    'charset' => 'utf8',
    'prefix' => '',
    'prefix_indexes' => true,
    'search_path' => 'public',
    'sslmode' => 'require',
],
```

---

## 3. Development Phases

### Phase 1: Foundation (Days 1-3)
**Goal:** Core infrastructure and authentication

#### Day 1: Project Setup
- [ ] Initialize Laravel 12 project
- [ ] Install and configure Laravel Breeze with React + Inertia
- [ ] Install Tailwind CSS and shadcn/ui
- [ ] Configure database connection
- [ ] Create all database migrations
- [ ] Create all Eloquent models with relationships
- [ ] Implement multi-tenant trait

#### Day 2: Authentication & Store Setup
- [ ] Customize registration to create store
- [ ] Build store onboarding wizard
- [ ] Implement multi-tenant middleware
- [ ] Create base authenticated layout
- [ ] Build sidebar navigation component
- [ ] Implement role-based access control

#### Day 3: Dashboard & Products
- [ ] Create dashboard with stats cards
- [ ] Build product listing page with DataTable
- [ ] Implement product CRUD operations
- [ ] Build category management
- [ ] Implement image upload for products
- [ ] Add barcode/SKU fields

**Phase 1 Deliverables:**
- Working authentication system
- Store registration with onboarding
- Product and category management
- Basic dashboard

---

### Phase 2: POS & Sales (Days 4-6)
**Goal:** Functional Point of Sale system

#### Day 4: POS Interface
- [ ] Create POS layout (full-screen)
- [ ] Build product grid with search
- [ ] Implement barcode scanner input
- [ ] Create shopping cart component
- [ ] Add quantity adjustment controls
- [ ] Implement item removal

#### Day 5: POS Transactions
- [ ] Build payment modal
- [ ] Implement cash payment with change calculation
- [ ] Add discount functionality (% and fixed)
- [ ] Create receipt component
- [ ] Implement print functionality
- [ ] Auto-deduct inventory on sale

#### Day 6: Sales Management
- [ ] Build sales listing page
- [ ] Create sale detail view
- [ ] Implement sale search and filters
- [ ] Add refund/return functionality
- [ ] Build held transactions feature

**Phase 2 Deliverables:**
- Fully functional POS terminal
- Payment processing
- Receipt generation
- Sales history

---

### Phase 3: Inventory & Procurement (Days 7-9)
**Goal:** Complete inventory management

#### Day 7: Inventory Management
- [ ] Create inventory overview page
- [ ] Build stock adjustment form
- [ ] Implement adjustment types (in/out/damage/return)
- [ ] Create stock history/audit log
- [ ] Add low stock alerts
- [ ] Build inventory report

#### Day 8: Suppliers & Purchases
- [ ] Build supplier CRUD
- [ ] Create purchase order form
- [ ] Implement purchase receiving
- [ ] Auto-update stock on receive
- [ ] Build purchase history

#### Day 9: Customers
- [ ] Build customer CRUD
- [ ] Implement customer search in POS
- [ ] Create customer purchase history
- [ ] Add customer balance tracking

**Phase 3 Deliverables:**
- Stock management system
- Purchase/procurement module
- Customer database

---

### Phase 4: Invoicing & Reports (Days 10-12)
**Goal:** Financial tracking and analytics

#### Day 10: Invoices & Payments
- [ ] Build invoice generation
- [ ] Create invoice PDF template
- [ ] Implement payment recording
- [ ] Add partial payment support
- [ ] Build payment history
- [ ] Create accounts receivable view

#### Day 11: Reports
- [ ] Build sales report (daily/weekly/monthly)
- [ ] Create inventory valuation report
- [ ] Implement profit & loss summary
- [ ] Add top products report
- [ ] Build low stock report
- [ ] Create export functionality (PDF/Excel)

#### Day 12: Settings
- [ ] Build store profile settings
- [ ] Create user management (invite, roles)
- [ ] Implement tax configuration
- [ ] Add receipt customization
- [ ] Build system preferences

**Phase 4 Deliverables:**
- Invoice system
- Payment tracking
- Comprehensive reports
- System settings

---

### Phase 5: Polish & Deploy (Days 13-14)
**Goal:** Production-ready application

#### Day 13: Testing & Fixes
- [ ] Write feature tests for critical paths
- [ ] Fix UI/UX issues
- [ ] Optimize database queries
- [ ] Add loading states
- [ ] Implement error handling
- [ ] Mobile responsiveness check

#### Day 14: Deployment
- [ ] Configure production environment
- [ ] Set up SSL certificate
- [ ] Configure backups
- [ ] Deploy to production
- [ ] Create user documentation
- [ ] Monitor for issues

**Phase 5 Deliverables:**
- Tested application
- Deployed to production
- Documentation

---

## 4. User Roles & Permissions

### 4.1 Role Definitions

#### Super Admin (SaaS Owner)
```
- Manage all stores
- View platform analytics
- Manage subscriptions
- System configuration
```

#### Owner
```
- Full store access
- Manage users
- View all reports
- Configure settings
- All manager permissions
```

#### Manager
```
- POS access
- Product management
- Inventory management
- View reports
- Customer management
- Process refunds
```

#### Cashier
```
- POS access only
- View own sales
- Basic product search
- No settings access
```

### 4.2 Permission Matrix

| Feature | Super Admin | Owner | Manager | Cashier |
|---------|:-----------:|:-----:|:-------:|:-------:|
| Dashboard | ✓ | ✓ | ✓ | ✗ |
| POS | ✓ | ✓ | ✓ | ✓ |
| Products - View | ✓ | ✓ | ✓ | ✓ |
| Products - Create/Edit | ✓ | ✓ | ✓ | ✗ |
| Products - Delete | ✓ | ✓ | ✗ | ✗ |
| Categories | ✓ | ✓ | ✓ | ✗ |
| Inventory | ✓ | ✓ | ✓ | ✗ |
| Sales - View All | ✓ | ✓ | ✓ | ✗ |
| Sales - View Own | ✓ | ✓ | ✓ | ✓ |
| Refunds | ✓ | ✓ | ✓ | ✗ |
| Purchases | ✓ | ✓ | ✓ | ✗ |
| Suppliers | ✓ | ✓ | ✓ | ✗ |
| Customers | ✓ | ✓ | ✓ | ✗ |
| Invoices | ✓ | ✓ | ✓ | ✗ |
| Reports | ✓ | ✓ | ✓ | ✗ |
| Users | ✓ | ✓ | ✗ | ✗ |
| Settings | ✓ | ✓ | ✗ | ✗ |
| Store Management | ✓ | ✗ | ✗ | ✗ |

---

## 5. Complete Database Schema

### 5.1 Supabase Setup Instructions

#### Step 1: Create Supabase Project
1. Go to https://supabase.com and create a new project
2. Note down your project URL and API keys
3. Go to Settings > Database to get your connection string

#### Step 2: Configure Laravel
```bash
# Install PostgreSQL driver if needed
sudo apt-get install php-pgsql

# Update .env with Supabase credentials
DB_CONNECTION=pgsql
DB_HOST=db.xxxxxxxxxxxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-database-password
```

#### Step 3: Create Storage Bucket (for images)
1. Go to Supabase Dashboard > Storage
2. Create a bucket named `invenpos`
3. Set policies for authenticated uploads

### 5.2 Entity Relationship Diagram (Textual)

```
stores
  ├── users (1:N)
  ├── categories (1:N)
  ├── products (1:N)
  │     └── sale_items (1:N)
  │     └── purchase_items (1:N)
  │     └── stock_adjustments (1:N)
  ├── customers (1:N)
  │     └── sales (1:N)
  │     └── invoices (1:N)
  ├── suppliers (1:N)
  │     └── purchases (1:N)
  ├── sales (1:N)
  │     └── sale_items (1:N)
  │     └── payments (1:N)
  │     └── invoices (1:1)
  ├── purchases (1:N)
  │     └── purchase_items (1:N)
  │     └── payments (1:N)
  └── held_transactions (1:N)
```

### 5.3 Complete Migration Files (PostgreSQL Compatible)

#### Migration 1: Create Stores Table
```php
// database/migrations/2024_01_01_000001_create_stores_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('email')->nullable();
            $table->string('phone', 50)->nullable();
            $table->text('address')->nullable();
            $table->string('logo')->nullable();
            $table->string('currency', 10)->default('PHP');
            $table->decimal('tax_rate', 5, 2)->default(0);
            $table->text('receipt_header')->nullable();
            $table->text('receipt_footer')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('subscription_plan', 50)->default('free');
            $table->timestamp('subscription_ends_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
```

#### Migration 2: Modify Users Table
```php
// database/migrations/2024_01_01_000002_add_store_fields_to_users_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('store_id')->nullable()->after('id')
                  ->constrained()->cascadeOnDelete();
            $table->string('role', 20)->default('cashier')->after('email');
            $table->string('phone', 50)->nullable()->after('role');
            $table->string('avatar')->nullable()->after('phone');
            $table->boolean('is_active')->default(true)->after('avatar');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['store_id']);
            $table->dropColumn(['store_id', 'role', 'phone', 'avatar', 'is_active']);
        });
    }
};
```

#### Migration 3: Create Categories Table
```php
// database/migrations/2024_01_01_000003_create_categories_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['store_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
```

#### Migration 4: Create Products Table
```php
// database/migrations/2024_01_01_000004_create_products_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('sku', 100)->nullable();
            $table->string('barcode', 100)->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->decimal('cost_price', 12, 2)->default(0);
            $table->decimal('selling_price', 12, 2);
            $table->integer('stock_quantity')->default(0);
            $table->integer('low_stock_threshold')->default(10);
            $table->string('unit', 50)->default('pcs');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['store_id', 'barcode']);
            $table->index(['store_id', 'sku']);
            $table->index(['store_id', 'name']);
            $table->index(['store_id', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

#### Migration 5: Create Customers Table
```php
// database/migrations/2024_01_01_000005_create_customers_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone', 50)->nullable();
            $table->text('address')->nullable();
            $table->text('notes')->nullable();
            $table->decimal('total_purchases', 12, 2)->default(0);
            $table->decimal('balance', 12, 2)->default(0);
            $table->timestamps();

            $table->index(['store_id', 'name']);
            $table->index(['store_id', 'phone']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
```

#### Migration 6: Create Suppliers Table
```php
// database/migrations/2024_01_01_000006_create_suppliers_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('contact_person')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 50)->nullable();
            $table->text('address')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['store_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
```

#### Migration 7: Create Sales Table
```php
// database/migrations/2024_01_01_000007_create_sales_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained()->nullOnDelete();
            $table->string('invoice_number', 50)->unique();
            $table->decimal('subtotal', 12, 2);
            $table->string('discount_type', 20)->nullable(); // 'percentage' or 'fixed'
            $table->decimal('discount_value', 12, 2)->default(0);
            $table->decimal('discount_amount', 12, 2)->default(0);
            $table->decimal('tax_rate', 5, 2)->default(0);
            $table->decimal('tax_amount', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2);
            $table->decimal('paid_amount', 12, 2)->default(0);
            $table->decimal('change_amount', 12, 2)->default(0);
            $table->string('payment_status', 20)->default('unpaid'); // paid, partial, unpaid
            $table->string('status', 20)->default('completed'); // completed, pending, cancelled, refunded
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['store_id', 'invoice_number']);
            $table->index(['store_id', 'created_at']);
            $table->index(['store_id', 'status']);
            $table->index(['store_id', 'payment_status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
```

#### Migration 8: Create Sale Items Table
```php
// database/migrations/2024_01_01_000008_create_sale_items_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sale_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sale_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('product_name'); // Denormalized for history
            $table->integer('quantity');
            $table->decimal('unit_price', 12, 2);
            $table->decimal('cost_price', 12, 2)->default(0);
            $table->decimal('discount_amount', 12, 2)->default(0);
            $table->decimal('total_price', 12, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sale_items');
    }
};
```

#### Migration 9: Create Payments Table
```php
// database/migrations/2024_01_01_000009_create_payments_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sale_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('purchase_id')->nullable()->constrained()->nullOnDelete();
            $table->string('payment_type', 20); // income, expense
            $table->string('payment_method', 30)->default('cash'); // cash, card, ewallet, bank_transfer, other
            $table->decimal('amount', 12, 2);
            $table->string('reference_number', 100)->nullable();
            $table->text('notes')->nullable();
            $table->date('payment_date');
            $table->timestamps();

            $table->index(['store_id', 'payment_date']);
            $table->index(['store_id', 'payment_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
```

#### Migration 10: Create Purchases Table
```php
// database/migrations/2024_01_01_000010_create_purchases_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->foreignId('supplier_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('reference_number', 50);
            $table->decimal('subtotal', 12, 2);
            $table->decimal('tax_amount', 12, 2)->default(0);
            $table->decimal('discount_amount', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2);
            $table->decimal('paid_amount', 12, 2)->default(0);
            $table->string('payment_status', 20)->default('unpaid'); // paid, partial, unpaid
            $table->string('status', 20)->default('pending'); // pending, received, cancelled
            $table->text('notes')->nullable();
            $table->date('purchase_date');
            $table->timestamps();

            $table->index(['store_id', 'reference_number']);
            $table->index(['store_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
```

#### Migration 11: Create Purchase Items Table
```php
// database/migrations/2024_01_01_000011_create_purchase_items_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->integer('quantity');
            $table->decimal('unit_cost', 12, 2);
            $table->decimal('total_cost', 12, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_items');
    }
};
```

#### Migration 12: Create Stock Adjustments Table
```php
// database/migrations/2024_01_01_000012_create_stock_adjustments_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stock_adjustments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type', 20); // in, out, adjustment, damage, return, sale, purchase
            $table->integer('quantity');
            $table->integer('quantity_before');
            $table->integer('quantity_after');
            $table->text('reason')->nullable();
            $table->string('reference_type', 50)->nullable();
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->timestamps();

            $table->index(['store_id', 'product_id']);
            $table->index(['store_id', 'created_at']);
            $table->index(['reference_type', 'reference_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock_adjustments');
    }
};
```

#### Migration 13: Create Invoices Table
```php
// database/migrations/2024_01_01_000013_create_invoices_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sale_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->string('invoice_number', 50)->unique();
            $table->date('due_date');
            $table->string('status', 20)->default('draft'); // draft, sent, paid, overdue, cancelled
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['store_id', 'status']);
            $table->index(['store_id', 'due_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
```

#### Migration 14: Create Held Transactions Table
```php
// database/migrations/2024_01_01_000014_create_held_transactions_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('held_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained()->nullOnDelete();
            $table->jsonb('cart_data'); // Use jsonb for PostgreSQL (better performance)
            $table->string('note')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('held_transactions');
    }
};
```

### 5.4 PostgreSQL-Specific Features

#### Using JSONB for Flexible Data
```php
// In migration - use jsonb instead of json for better query performance
$table->jsonb('cart_data');
$table->jsonb('meta_data')->nullable();

// Querying JSONB in Laravel
Product::whereJsonContains('meta_data->tags', 'featured')->get();
Product::where('meta_data->color', 'red')->get();
```

#### Full-Text Search (PostgreSQL)
```php
// Add full-text search index in migration
Schema::table('products', function (Blueprint $table) {
    $table->index(DB::raw('to_tsvector(\'english\', name || \' \' || COALESCE(description, \'\'))'), 'products_fulltext');
});

// Search products
Product::whereRaw("to_tsvector('english', name || ' ' || COALESCE(description, '')) @@ plainto_tsquery('english', ?)", [$search])->get();
```

### 5.5 Model Relationships Summary

```php
// Store has many:
// - users, categories, products, customers, suppliers
// - sales, purchases, payments, invoices, stock_adjustments, held_transactions

// User belongs to: store
// User has many: sales, purchases, stock_adjustments, held_transactions

// Product belongs to: store, category
// Product has many: sale_items, purchase_items, stock_adjustments

// Sale belongs to: store, user, customer
// Sale has many: sale_items, payments
// Sale has one: invoice

// Purchase belongs to: store, supplier, user
// Purchase has many: purchase_items, payments
```

### 5.6 Supabase Storage Integration (Optional)

#### Config for Image Uploads
```php
// config/filesystems.php
'disks' => [
    'supabase' => [
        'driver' => 's3',
        'key' => env('SUPABASE_STORAGE_KEY'),
        'secret' => env('SUPABASE_STORAGE_SECRET'),
        'region' => env('SUPABASE_STORAGE_REGION', 'us-east-1'),
        'bucket' => env('SUPABASE_STORAGE_BUCKET', 'invenpos'),
        'url' => env('SUPABASE_URL') . '/storage/v1/object/public/' . env('SUPABASE_STORAGE_BUCKET'),
        'endpoint' => env('SUPABASE_URL') . '/storage/v1/s3',
    ],
],

// .env additions
SUPABASE_STORAGE_KEY=your-service-role-key
SUPABASE_STORAGE_SECRET=your-service-role-key
SUPABASE_STORAGE_BUCKET=invenpos
```

#### Upload Helper
```php
// app/Services/StorageService.php
use Illuminate\Support\Facades\Storage;

class StorageService
{
    public function uploadProductImage($file, $productId): string
    {
        $path = "products/{$productId}/" . $file->hashName();
        Storage::disk('supabase')->put($path, file_get_contents($file));
        return $path;
    }

    public function getPublicUrl($path): string
    {
        return Storage::disk('supabase')->url($path);
    }

    public function delete($path): bool
    {
        return Storage::disk('supabase')->delete($path);
    }
}
```

---

## 6. Feature Specifications

### 6.1 Authentication Module

#### F-AUTH-01: User Registration
**Description:** New users can register and create a store simultaneously.

**Acceptance Criteria:**
- Form fields: name, email, password, password_confirmation, store_name
- Email must be unique
- Password minimum 8 characters
- Auto-create store with slugified name
- Auto-assign 'owner' role
- Redirect to store onboarding

**Validation Rules:**
```php
[
    'name' => 'required|string|max:255',
    'email' => 'required|email|unique:users',
    'password' => 'required|min:8|confirmed',
    'store_name' => 'required|string|max:255'
]
```

#### F-AUTH-02: Store Onboarding
**Description:** After registration, guide users through store setup.

**Steps:**
1. Store details (address, phone, logo)
2. Tax configuration
3. First product creation (optional)
4. Complete

**Skip Option:** Users can skip and complete later.

#### F-AUTH-03: User Login
**Description:** Existing users can log in.

**Features:**
- Email + password authentication
- Remember me option
- Redirect to dashboard or POS based on role

#### F-AUTH-04: Password Reset
**Description:** Users can reset forgotten passwords via email.

---

### 6.2 Product Management Module

#### F-PROD-01: Product Listing
**Description:** View all products with search, filter, and pagination.

**Features:**
- Search by name, SKU, barcode
- Filter by category, status, stock level
- Sort by name, price, stock, created date
- Pagination (25/50/100 per page)
- Bulk actions (delete, activate, deactivate)

**DataTable Columns:**
```
| Image | Name | SKU | Category | Price | Stock | Status | Actions |
```

#### F-PROD-02: Create Product
**Description:** Add new product to inventory.

**Form Fields:**
```typescript
interface ProductForm {
  name: string;           // required
  sku?: string;           // optional, auto-generate if empty
  barcode?: string;       // optional
  category_id?: number;   // optional
  description?: string;   // optional
  cost_price: number;     // required, default 0
  selling_price: number;  // required
  stock_quantity: number; // required, default 0
  low_stock_threshold: number; // required, default 10
  unit: string;           // required, default 'pcs'
  image?: File;           // optional
  is_active: boolean;     // default true
}
```

#### F-PROD-03: Edit Product
**Description:** Modify existing product details.

**Notes:**
- SKU change should warn if used in past sales
- Price change doesn't affect past sales
- Stock change creates adjustment record

#### F-PROD-04: Delete Product
**Description:** Remove product from system.

**Behavior:**
- Soft delete if has sales history
- Hard delete if no sales history
- Requires confirmation

#### F-PROD-05: Category Management
**Description:** Organize products into categories.

**Features:**
- CRUD operations
- View products in category
- Reorder categories

---

### 6.3 Point of Sale Module

#### F-POS-01: Product Search
**Description:** Quickly find products for sale.

**Search Methods:**
- Text search (name, SKU)
- Barcode scan (auto-add to cart)
- Category filter
- Grid view with images

**Performance:**
- Search results < 100ms
- Auto-complete after 2 characters

#### F-POS-02: Shopping Cart
**Description:** Manage items for current transaction.

**Features:**
- Add items (click or barcode)
- Adjust quantity (+/-)
- Remove items
- Item discount (per item)
- Cart subtotal
- Real-time updates

**Cart Item Structure:**
```typescript
interface CartItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  total: number;
}
```

#### F-POS-03: Discount Application
**Description:** Apply discounts to sale.

**Types:**
- Percentage discount (e.g., 10%)
- Fixed amount discount (e.g., $5)
- Per-item discount
- Transaction-level discount

**Rules:**
- Maximum discount configurable in settings
- Manager override for higher discounts

#### F-POS-04: Payment Processing
**Description:** Complete the sale transaction.

**Payment Methods:**
- Cash (with change calculation)
- Card (reference number)
- E-wallet (reference number)
- Split payment (multiple methods)

**Payment Modal Flow:**
1. Display total
2. Select payment method(s)
3. Enter amount
4. Calculate change (if cash)
5. Process transaction
6. Show/print receipt

#### F-POS-05: Receipt Generation
**Description:** Generate receipt for completed sale.

**Receipt Content:**
```
[Store Logo]
[Store Name]
[Store Address]
[Store Phone]
------------------------
Receipt #: INV-20241215-0001
Date: 2024-12-15 14:30:00
Cashier: John Doe
Customer: Walk-in
------------------------
Items:
Product A    2 x $10.00    $20.00
Product B    1 x $15.00    $15.00
------------------------
Subtotal:              $35.00
Discount (10%):        -$3.50
Tax (12%):             +$3.78
------------------------
TOTAL:                 $35.28
------------------------
Cash:                  $50.00
Change:                $14.72
------------------------
[Receipt Footer]
Thank you for your purchase!
```

**Options:**
- Print (thermal/regular)
- Email to customer
- Download PDF

#### F-POS-06: Hold Transaction
**Description:** Save transaction for later.

**Use Case:**
- Customer forgot wallet
- Need to check price
- Waiting for approval

**Features:**
- Add note to held transaction
- View held transactions list
- Recall and continue
- Auto-delete after 24 hours

#### F-POS-07: Quick Keys (Optional)
**Description:** Preset buttons for frequent items.

---

### 6.4 Sales Management Module

#### F-SALE-01: Sales List
**Description:** View all completed sales.

**Filters:**
- Date range
- Cashier
- Payment status
- Sale status
- Customer

**Export:** PDF, Excel

#### F-SALE-02: Sale Details
**Description:** View complete sale information.

**Information:**
- Sale items
- Payment details
- Receipt reprint
- Customer info

#### F-SALE-03: Refund/Return
**Description:** Process return transactions.

**Types:**
- Full refund
- Partial refund (selected items)

**Process:**
1. Select sale
2. Choose items to refund
3. Specify refund method
4. Restore inventory
5. Generate refund receipt

---

### 6.5 Inventory Module

#### F-INV-01: Stock Overview
**Description:** View current inventory status.

**Views:**
- All products with stock
- Low stock alerts
- Out of stock
- Category breakdown

#### F-INV-02: Stock Adjustment
**Description:** Manually adjust stock quantities.

**Adjustment Types:**
- Stock In (received goods)
- Stock Out (damaged, lost)
- Adjustment (correction)
- Return (from customer)

**Required Fields:**
```typescript
interface StockAdjustment {
  product_id: number;
  type: 'in' | 'out' | 'adjustment' | 'damage' | 'return';
  quantity: number;
  reason: string;
}
```

#### F-INV-03: Stock History
**Description:** Audit trail of all stock changes.

**Log Entry:**
```
Date | Product | Type | Qty | Before | After | User | Reference
```

---

### 6.6 Purchase Module

#### F-PUR-01: Supplier Management
**Description:** Manage vendor information.

**Fields:**
- Name
- Contact person
- Email, phone
- Address
- Notes

#### F-PUR-02: Create Purchase Order
**Description:** Record incoming inventory.

**Form:**
```typescript
interface PurchaseOrder {
  supplier_id?: number;
  purchase_date: Date;
  items: PurchaseItem[];
  notes?: string;
}

interface PurchaseItem {
  product_id: number;
  quantity: number;
  unit_cost: number;
}
```

#### F-PUR-03: Receive Purchase
**Description:** Mark purchase as received and update stock.

**Process:**
1. Open pending purchase
2. Verify quantities
3. Mark as received
4. Auto-update product stock
5. Record payment if paid

---

### 6.7 Invoice Module

#### F-INV-01: Generate Invoice
**Description:** Create invoice for credit sales.

**Auto-generated From:** Sales with unpaid/partial status

**Fields:**
- Invoice number (auto)
- Customer (required)
- Due date
- Items from sale
- Payment terms

#### F-INV-02: Invoice PDF
**Description:** Generate professional PDF invoice.

#### F-INV-03: Payment Recording
**Description:** Record payments against invoices.

**Features:**
- Partial payments
- Payment history
- Auto-update status

---

### 6.8 Reports Module

#### F-RPT-01: Sales Report
**Description:** Sales analytics and summaries.

**Metrics:**
- Total sales
- Transaction count
- Average transaction value
- Sales by payment method
- Sales by cashier
- Hourly/daily trends

**Filters:** Date range, cashier, payment method

#### F-RPT-02: Inventory Report
**Description:** Stock status and valuation.

**Metrics:**
- Total SKUs
- Total stock value (cost)
- Total stock value (retail)
- Low stock items
- Out of stock items

#### F-RPT-03: Product Performance
**Description:** Best and worst sellers.

**Metrics:**
- Top 10 by quantity sold
- Top 10 by revenue
- Bottom 10 performers
- Category breakdown

#### F-RPT-04: Profit Report
**Description:** Basic profit calculation.

**Formula:**
```
Gross Profit = Total Sales - Cost of Goods Sold
Profit Margin = (Gross Profit / Total Sales) * 100
```

---

### 6.9 Settings Module

#### F-SET-01: Store Profile
**Description:** Basic store information.

**Fields:**
- Store name
- Logo
- Address
- Phone, email
- Currency
- Timezone

#### F-SET-02: Tax Configuration
**Description:** Set up tax rates.

**Options:**
- Tax rate percentage
- Tax-inclusive pricing
- Tax name (VAT, GST, etc.)

#### F-SET-03: Receipt Settings
**Description:** Customize receipts.

**Options:**
- Header text
- Footer text
- Show logo
- Paper size

#### F-SET-04: User Management
**Description:** Manage store users.

**Features:**
- Invite user (email)
- Assign role
- Activate/deactivate
- Reset password

---

## 7. Page Specifications

### 7.1 Page List with Routes

| Page | Route | Component | Access |
|------|-------|-----------|--------|
| Login | `/login` | Auth/Login | Guest |
| Register | `/register` | Auth/Register | Guest |
| Forgot Password | `/forgot-password` | Auth/ForgotPassword | Guest |
| Store Setup | `/setup` | Onboarding/Setup | Auth |
| Dashboard | `/dashboard` | Dashboard/Index | Auth |
| POS | `/pos` | POS/Terminal | Auth |
| Products List | `/products` | Products/Index | Auth |
| Create Product | `/products/create` | Products/Create | Manager+ |
| Edit Product | `/products/{id}/edit` | Products/Edit | Manager+ |
| Categories | `/categories` | Categories/Index | Manager+ |
| Inventory | `/inventory` | Inventory/Index | Manager+ |
| Stock Adjustment | `/inventory/adjust` | Inventory/Adjust | Manager+ |
| Stock History | `/inventory/history` | Inventory/History | Manager+ |
| Sales List | `/sales` | Sales/Index | Auth |
| Sale Details | `/sales/{id}` | Sales/Show | Auth |
| Refund | `/sales/{id}/refund` | Sales/Refund | Manager+ |
| Purchases List | `/purchases` | Purchases/Index | Manager+ |
| Create Purchase | `/purchases/create` | Purchases/Create | Manager+ |
| Purchase Details | `/purchases/{id}` | Purchases/Show | Manager+ |
| Suppliers | `/suppliers` | Suppliers/Index | Manager+ |
| Customers | `/customers` | Customers/Index | Manager+ |
| Customer Details | `/customers/{id}` | Customers/Show | Manager+ |
| Invoices | `/invoices` | Invoices/Index | Manager+ |
| Invoice Details | `/invoices/{id}` | Invoices/Show | Manager+ |
| Reports | `/reports` | Reports/Index | Manager+ |
| Sales Report | `/reports/sales` | Reports/Sales | Manager+ |
| Inventory Report | `/reports/inventory` | Reports/Inventory | Manager+ |
| Settings | `/settings` | Settings/Index | Owner |
| Store Settings | `/settings/store` | Settings/Store | Owner |
| Users | `/settings/users` | Settings/Users | Owner |
| Tax Settings | `/settings/tax` | Settings/Tax | Owner |

### 7.2 Key Page Wireframes (Text-based)

#### Dashboard Layout
```
┌──────────────────────────────────────────────────────────┐
│  [Logo]  InvenPOS              🔔  👤 John Doe  ▼        │
├──────────┬───────────────────────────────────────────────┤
│          │                                               │
│ Dashboard│  Welcome back, John!           [Go to POS →]  │
│          │                                               │
│ POS      │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────┐  │
│          │  │Today's  │ │ Sales   │ │Products │ │ Low │  │
│ Products │  │ Sales   │ │ Count   │ │  Count  │ │Stock│  │
│   ├ List │  │ $1,234  │ │   45    │ │   123   │ │  5  │  │
│   ├ Cat. │  └─────────┘ └─────────┘ └─────────┘ └─────┘  │
│          │                                               │
│ Inventory│  ┌────────────────────────────────────────┐   │
│          │  │         Sales Chart (7 days)           │   │
│ Sales    │  │    📈                                  │   │
│          │  └────────────────────────────────────────┘   │
│ Purchases│                                               │
│          │  ┌──────────────────┐ ┌──────────────────┐    │
│ Customers│  │ Recent Sales     │ │ Low Stock Items  │    │
│          │  │ INV-001  $50.00  │ │ Product A (2)    │    │
│ Suppliers│  │ INV-002  $75.00  │ │ Product B (5)    │    │
│          │  │ INV-003  $25.00  │ │ Product C (3)    │    │
│ Reports  │  └──────────────────┘ └──────────────────┘    │
│          │                                               │
│ Settings │                                               │
│          │                                               │
└──────────┴───────────────────────────────────────────────┘
```

#### POS Terminal Layout
```
┌────────────────────────────────────────────────────────────────────┐
│  [← Back]   POINT OF SALE                    [Hold] [Recall] [👤]  │
├────────────────────────────────────┬───────────────────────────────┤
│                                    │                               │
│  🔍 Search products or scan...     │   CART (3 items)              │
│                                    │                               │
│  [All] [Food] [Drinks] [Other]     │   ┌─────────────────────────┐ │
│                                    │   │ Product A               │ │
│  ┌────────┐ ┌────────┐ ┌────────┐  │   │ 2 x $10.00    $20.00 ✕ │ │
│  │  📦    │ │  📦    │ │  📦    │  │   ├─────────────────────────┤ │
│  │Prod A  │ │Prod B  │ │Prod C  │  │   │ Product B               │ │
│  │$10.00  │ │$15.00  │ │$8.00   │  │   │ 1 x $15.00    $15.00 ✕ │ │
│  │Stock:25│ │Stock:18│ │Stock:50│  │   ├─────────────────────────┤ │
│  └────────┘ └────────┘ └────────┘  │   │ Product C               │ │
│                                    │   │ 3 x $8.00     $24.00 ✕ │ │
│  ┌────────┐ ┌────────┐ ┌────────┐  │   └─────────────────────────┘ │
│  │  📦    │ │  📦    │ │  📦    │  │                               │
│  │Prod D  │ │Prod E  │ │Prod F  │  │   ───────────────────────     │
│  │$12.00  │ │$20.00  │ │$5.00   │  │   Subtotal:        $59.00     │
│  │Stock:30│ │Stock:12│ │Stock:45│  │   Discount:         $0.00     │
│  └────────┘ └────────┘ └────────┘  │   Tax (12%):        $7.08     │
│                                    │   ───────────────────────     │
│  ┌────────┐ ┌────────┐ ┌────────┐  │   TOTAL:           $66.08     │
│  │  📦    │ │  📦    │ │  📦    │  │                               │
│  │Prod G  │ │Prod H  │ │Prod I  │  │   [  Add Discount  ]          │
│  │$7.00   │ │$9.00   │ │$11.00  │  │                               │
│  │Stock:60│ │Stock:25│ │Stock:35│  │   [     PAY $66.08     ]      │
│  └────────┘ └────────┘ └────────┘  │                               │
│                                    │   [    Clear Cart    ]        │
└────────────────────────────────────┴───────────────────────────────┘
```

---

## 8. API Endpoints

### 8.1 RESTful Routes (Inertia)

```php
// routes/web.php

// Authentication
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('login', [AuthController::class, 'login']);
    Route::get('register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('register', [AuthController::class, 'register']);
    Route::get('forgot-password', [AuthController::class, 'showForgotPassword']);
    Route::post('forgot-password', [AuthController::class, 'sendResetLink']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Onboarding
    Route::get('setup', [OnboardingController::class, 'index'])->name('setup');
    Route::post('setup', [OnboardingController::class, 'complete']);

    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // POS
    Route::prefix('pos')->name('pos.')->group(function () {
        Route::get('/', [POSController::class, 'index'])->name('index');
        Route::post('checkout', [POSController::class, 'checkout'])->name('checkout');
        Route::post('hold', [POSController::class, 'hold'])->name('hold');
        Route::get('held', [POSController::class, 'heldTransactions'])->name('held');
        Route::delete('held/{id}', [POSController::class, 'deleteHeld'])->name('held.delete');
        Route::post('held/{id}/recall', [POSController::class, 'recall'])->name('held.recall');
    });

    // Products
    Route::resource('products', ProductController::class);
    Route::post('products/{product}/toggle-status', [ProductController::class, 'toggleStatus']);
    Route::post('products/bulk-delete', [ProductController::class, 'bulkDelete']);

    // Categories
    Route::resource('categories', CategoryController::class)->except(['show']);

    // Inventory
    Route::prefix('inventory')->name('inventory.')->group(function () {
        Route::get('/', [InventoryController::class, 'index'])->name('index');
        Route::get('adjust', [InventoryController::class, 'showAdjust'])->name('adjust');
        Route::post('adjust', [InventoryController::class, 'adjust'])->name('adjust.store');
        Route::get('history', [InventoryController::class, 'history'])->name('history');
    });

    // Sales
    Route::resource('sales', SaleController::class)->only(['index', 'show']);
    Route::post('sales/{sale}/refund', [SaleController::class, 'refund'])->name('sales.refund');
    Route::get('sales/{sale}/receipt', [SaleController::class, 'receipt'])->name('sales.receipt');

    // Purchases
    Route::resource('purchases', PurchaseController::class);
    Route::post('purchases/{purchase}/receive', [PurchaseController::class, 'receive']);

    // Suppliers
    Route::resource('suppliers', SupplierController::class);

    // Customers
    Route::resource('customers', CustomerController::class);

    // Invoices
    Route::resource('invoices', InvoiceController::class)->only(['index', 'show', 'update']);
    Route::get('invoices/{invoice}/pdf', [InvoiceController::class, 'pdf'])->name('invoices.pdf');
    Route::post('invoices/{invoice}/payment', [InvoiceController::class, 'recordPayment']);

    // Payments
    Route::get('payments', [PaymentController::class, 'index'])->name('payments.index');

    // Reports
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('/', [ReportController::class, 'index'])->name('index');
        Route::get('sales', [ReportController::class, 'sales'])->name('sales');
        Route::get('inventory', [ReportController::class, 'inventory'])->name('inventory');
        Route::get('products', [ReportController::class, 'products'])->name('products');
        Route::get('profit', [ReportController::class, 'profit'])->name('profit');
        Route::get('export/{type}', [ReportController::class, 'export'])->name('export');
    });

    // Settings
    Route::prefix('settings')->name('settings.')->middleware('role:owner')->group(function () {
        Route::get('/', [SettingsController::class, 'index'])->name('index');
        Route::get('store', [SettingsController::class, 'store'])->name('store');
        Route::put('store', [SettingsController::class, 'updateStore']);
        Route::get('tax', [SettingsController::class, 'tax'])->name('tax');
        Route::put('tax', [SettingsController::class, 'updateTax']);
        Route::get('receipt', [SettingsController::class, 'receipt'])->name('receipt');
        Route::put('receipt', [SettingsController::class, 'updateReceipt']);
        Route::resource('users', UserController::class);
    });

    // Logout
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});

// API Routes (for AJAX calls within Inertia)
Route::middleware(['auth'])->prefix('api')->group(function () {
    Route::get('products/search', [ProductController::class, 'search']);
    Route::get('customers/search', [CustomerController::class, 'search']);
    Route::get('dashboard/stats', [DashboardController::class, 'stats']);
});
```

---

## 9. Application Flows

### 9.1 User Registration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER REGISTRATION FLOW                     │
└─────────────────────────────────────────────────────────────────┘

    [Start]
       │
       ▼
┌─────────────────┐
│  Registration   │
│     Form        │
│                 │
│  • Name         │
│  • Email        │
│  • Password     │
│  • Store Name   │
└────────┬────────┘
         │
         ▼
   ┌───────────┐     No
   │  Valid?   │─────────────► [Show Errors]
   └─────┬─────┘                     │
         │ Yes                       │
         ▼                           │
┌─────────────────┐                  │
│ Create User     │                  │
│ (role: owner)   │◄─────────────────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Create Store   │
│  (with slug)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Link User to   │
│     Store       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Onboarding   │──────► [Store Setup Wizard]
│     Redirect    │
└────────┬────────┘
         │
         ▼
      [End]
```

### 9.2 POS Checkout Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       POS CHECKOUT FLOW                         │
└─────────────────────────────────────────────────────────────────┘

    [Start POS Session]
            │
            ▼
    ┌───────────────┐
    │ Search/Scan   │◄────────────────┐
    │   Product     │                 │
    └───────┬───────┘                 │
            │                         │
            ▼                         │
    ┌───────────────┐                 │
    │  Add to Cart  │                 │
    └───────┬───────┘                 │
            │                         │
            ▼                         │
    ┌───────────────┐    Yes          │
    │ More Items?   │─────────────────┘
    └───────┬───────┘
            │ No
            ▼
    ┌───────────────┐
    │Apply Discount │ (Optional)
    │   if any      │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │  Click PAY    │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │ Payment Modal │
    │               │
    │ • Select      │
    │   Method      │
    │ • Enter       │
    │   Amount      │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │  Sufficient   │     No
    │   Amount?     │──────────► [Show Error]
    └───────┬───────┘                 │
            │ Yes                     │
            ▼                         │
    ┌───────────────┐                 │
    │ Process Sale  │◄────────────────┘
    │               │
    │ 1. Create     │
    │    Sale       │
    │ 2. Create     │
    │    Items      │
    │ 3. Record     │
    │    Payment    │
    │ 4. Deduct     │
    │    Stock      │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │   Generate    │
    │   Receipt     │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │ Print/Email?  │───► [Print Receipt]
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │  Clear Cart   │
    │  New Sale     │
    └───────────────┘
```

### 9.3 Stock Adjustment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    STOCK ADJUSTMENT FLOW                        │
└─────────────────────────────────────────────────────────────────┘

    [Start]
       │
       ▼
┌─────────────────┐
│ Select Product  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Current Stock  │
│    Displayed    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Select Type:    │
│ • Stock In      │
│ • Stock Out     │
│ • Damage        │
│ • Adjustment    │
│ • Return        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Enter Quantity  │
│ & Reason        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Preview:     │
│ Before: 100     │
│ Change: +20     │
│ After:  120     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Confirm?     │───No──► [Cancel]
└────────┬────────┘
         │ Yes
         ▼
┌─────────────────┐
│ Update Product  │
│    Stock        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Audit    │
│    Record       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Success Message │
└─────────────────┘
```

### 9.4 Purchase Order Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    PURCHASE ORDER FLOW                          │
└─────────────────────────────────────────────────────────────────┘

    [Start]
       │
       ▼
┌─────────────────┐
│ Create Purchase │
│                 │
│ • Supplier      │
│ • Date          │
│ • Add Items     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Save as Pending │
└────────┬────────┘
         │
         ▼
    [Wait for Delivery]
         │
         ▼
┌─────────────────┐
│ Receive Items   │
│                 │
│ • Verify Qty    │
│ • Check Quality │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Mark Received   │
└────────┬────────┘
         │
         ├─────────────────────┐
         ▼                     ▼
┌─────────────────┐   ┌─────────────────┐
│ Update Product  │   │ Record Payment  │
│    Stocks       │   │  (if paid)      │
└────────┬────────┘   └────────┬────────┘
         │                     │
         └──────────┬──────────┘
                    ▼
           ┌───────────────┐
           │   Complete    │
           └───────────────┘
```

### 9.5 Invoice & Payment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   INVOICE & PAYMENT FLOW                        │
└─────────────────────────────────────────────────────────────────┘

    [Credit Sale Created]
            │
            ▼
    ┌───────────────┐
    │ Auto-Generate │
    │   Invoice     │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │  Set Due Date │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │  Send to      │───► [Email PDF]
    │  Customer     │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │ Customer Pays │───► Partial? ──Yes──┐
    │               │                     │
    └───────┬───────┘                     │
            │ Full                        │
            ▼                             ▼
    ┌───────────────┐         ┌───────────────┐
    │ Record Full   │         │ Record Partial│
    │   Payment     │         │   Payment     │
    └───────┬───────┘         └───────┬───────┘
            │                         │
            ▼                         ▼
    ┌───────────────┐         ┌───────────────┐
    │ Status: PAID  │         │Status: PARTIAL│
    └───────────────┘         └───────┬───────┘
                                      │
                              [Repeat until Paid]
```

---

## 10. Project Structure

### 10.1 Laravel Backend Structure

```
app/
├── Console/
│   └── Commands/
│       └── GenerateInvoiceNumber.php
│
├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   │   ├── AuthenticatedSessionController.php
│   │   │   ├── RegisteredUserController.php
│   │   │   └── PasswordResetController.php
│   │   ├── CategoryController.php
│   │   ├── CustomerController.php
│   │   ├── DashboardController.php
│   │   ├── InventoryController.php
│   │   ├── InvoiceController.php
│   │   ├── OnboardingController.php
│   │   ├── PaymentController.php
│   │   ├── POSController.php
│   │   ├── ProductController.php
│   │   ├── PurchaseController.php
│   │   ├── ReportController.php
│   │   ├── SaleController.php
│   │   ├── SettingsController.php
│   │   ├── SupplierController.php
│   │   └── UserController.php
│   │
│   ├── Middleware/
│   │   ├── EnsureStoreAccess.php
│   │   ├── CheckRole.php
│   │   └── HandleInertiaRequests.php
│   │
│   └── Requests/
│       ├── ProductRequest.php
│       ├── CategoryRequest.php
│       ├── CustomerRequest.php
│       ├── PurchaseRequest.php
│       ├── StockAdjustmentRequest.php
│       └── StoreSettingsRequest.php
│
├── Models/
│   ├── User.php
│   ├── Store.php
│   ├── Category.php
│   ├── Product.php
│   ├── Customer.php
│   ├── Supplier.php
│   ├── Sale.php
│   ├── SaleItem.php
│   ├── Purchase.php
│   ├── PurchaseItem.php
│   ├── Payment.php
│   ├── Invoice.php
│   ├── StockAdjustment.php
│   └── HeldTransaction.php
│
├── Services/
│   ├── POSService.php
│   ├── InventoryService.php
│   ├── InvoiceService.php
│   ├── ReportService.php
│   └── StockService.php
│
├── Traits/
│   └── BelongsToStore.php
│
└── Observers/
    ├── SaleObserver.php
    └── PurchaseObserver.php

database/
├── migrations/
│   ├── 2024_01_01_000001_create_stores_table.php
│   ├── 2024_01_01_000002_add_store_fields_to_users_table.php
│   ├── 2024_01_01_000003_create_categories_table.php
│   ├── 2024_01_01_000004_create_products_table.php
│   ├── 2024_01_01_000005_create_customers_table.php
│   ├── 2024_01_01_000006_create_suppliers_table.php
│   ├── 2024_01_01_000007_create_sales_table.php
│   ├── 2024_01_01_000008_create_sale_items_table.php
│   ├── 2024_01_01_000009_create_payments_table.php
│   ├── 2024_01_01_000010_create_purchases_table.php
│   ├── 2024_01_01_000011_create_purchase_items_table.php
│   ├── 2024_01_01_000012_create_stock_adjustments_table.php
│   ├── 2024_01_01_000013_create_invoices_table.php
│   └── 2024_01_01_000014_create_held_transactions_table.php
│
├── seeders/
│   ├── DatabaseSeeder.php
│   ├── StoreSeeder.php
│   ├── UserSeeder.php
│   ├── CategorySeeder.php
│   └── ProductSeeder.php
│
└── factories/
    ├── StoreFactory.php
    ├── ProductFactory.php
    ├── CustomerFactory.php
    └── SaleFactory.php

routes/
├── web.php
├── auth.php
└── api.php

config/
└── inventory.php  # Custom config for app settings
```

### 10.2 React Frontend Structure

```
resources/js/
├── app.jsx
├── bootstrap.js
│
├── Components/
│   ├── UI/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Modal.jsx
│   │   ├── DataTable.jsx
│   │   ├── Dropdown.jsx
│   │   ├── Badge.jsx
│   │   ├── Alert.jsx
│   │   ├── Pagination.jsx
│   │   ├── Loading.jsx
│   │   └── EmptyState.jsx
│   │
│   ├── Layout/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   │
│   ├── Forms/
│   │   ├── ProductForm.jsx
│   │   ├── CategoryForm.jsx
│   │   ├── CustomerForm.jsx
│   │   ├── SupplierForm.jsx
│   │   ├── PurchaseForm.jsx
│   │   └── StockAdjustmentForm.jsx
│   │
│   ├── POS/
│   │   ├── ProductGrid.jsx
│   │   ├── ProductCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategoryTabs.jsx
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   ├── PaymentModal.jsx
│   │   ├── DiscountModal.jsx
│   │   ├── Receipt.jsx
│   │   ├── HeldTransactions.jsx
│   │   └── CustomerSelect.jsx
│   │
│   ├── Reports/
│   │   ├── SalesChart.jsx
│   │   ├── InventoryChart.jsx
│   │   ├── TopProducts.jsx
│   │   └── StatCard.jsx
│   │
│   └── Common/
│       ├── DeleteConfirmation.jsx
│       ├── StatusBadge.jsx
│       ├── DateRangePicker.jsx
│       ├── ImageUpload.jsx
│       └── PrintButton.jsx
│
├── Layouts/
│   ├── AuthenticatedLayout.jsx
│   ├── GuestLayout.jsx
│   └── POSLayout.jsx
│
├── Pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   │
│   ├── Onboarding/
│   │   └── Setup.jsx
│   │
│   ├── Dashboard/
│   │   └── Index.jsx
│   │
│   ├── POS/
│   │   └── Terminal.jsx
│   │
│   ├── Products/
│   │   ├── Index.jsx
│   │   ├── Create.jsx
│   │   ├── Edit.jsx
│   │   └── Show.jsx
│   │
│   ├── Categories/
│   │   └── Index.jsx
│   │
│   ├── Inventory/
│   │   ├── Index.jsx
│   │   ├── Adjust.jsx
│   │   └── History.jsx
│   │
│   ├── Sales/
│   │   ├── Index.jsx
│   │   ├── Show.jsx
│   │   └── Refund.jsx
│   │
│   ├── Purchases/
│   │   ├── Index.jsx
│   │   ├── Create.jsx
│   │   ├── Edit.jsx
│   │   └── Show.jsx
│   │
│   ├── Suppliers/
│   │   ├── Index.jsx
│   │   └── Form.jsx
│   │
│   ├── Customers/
│   │   ├── Index.jsx
│   │   ├── Show.jsx
│   │   └── Form.jsx
│   │
│   ├── Invoices/
│   │   ├── Index.jsx
│   │   └── Show.jsx
│   │
│   ├── Reports/
│   │   ├── Index.jsx
│   │   ├── Sales.jsx
│   │   ├── Inventory.jsx
│   │   ├── Products.jsx
│   │   └── Profit.jsx
│   │
│   └── Settings/
│       ├── Index.jsx
│       ├── Store.jsx
│       ├── Tax.jsx
│       ├── Receipt.jsx
│       └── Users/
│           ├── Index.jsx
│           └── Form.jsx
│
├── Hooks/
│   ├── useCart.js
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   └── useKeyboardShortcut.js
│
├── Utils/
│   ├── formatters.js
│   ├── validators.js
│   └── constants.js
│
└── Styles/
    └── pos.css
```

---

## 11. UI/UX Guidelines

### 11.1 Design System

#### Colors
```css
/* Primary */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* Success */
--success-500: #22c55e;

/* Warning */
--warning-500: #f59e0b;

/* Danger */
--danger-500: #ef4444;

/* Neutral */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-500: #6b7280;
--gray-700: #374151;
--gray-900: #111827;
```

#### Typography
```css
/* Font Family */
font-family: 'Inter', sans-serif;

/* Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
```

#### Spacing
```css
/* Use Tailwind spacing scale */
/* 1 = 0.25rem, 2 = 0.5rem, 4 = 1rem, 6 = 1.5rem, 8 = 2rem */
```

### 11.2 Component Guidelines

#### Buttons
- Primary: Blue background, white text
- Secondary: Gray background, dark text
- Danger: Red background, white text
- Size: sm, md (default), lg

#### Cards
- White background
- Subtle shadow
- Rounded corners (lg)
- Padding: p-4 or p-6

#### Tables
- Zebra striping for readability
- Sticky header
- Hover states on rows
- Action buttons on right

#### Forms
- Labels above inputs
- Clear validation messages
- Disabled states
- Loading states on submit

### 11.3 POS-Specific Guidelines

- Large touch targets (min 44px)
- High contrast for visibility
- Keyboard shortcuts for power users
- Clear visual feedback
- Minimal clicks to complete transaction

---

## 12. Testing Requirements

### 12.1 Feature Tests (Priority)

```php
// tests/Feature/

// Authentication
- test_user_can_register_with_store()
- test_user_can_login()
- test_user_cannot_access_other_store_data()

// Products
- test_can_create_product()
- test_can_update_product()
- test_can_delete_product()
- test_product_requires_name_and_price()

// POS
- test_can_process_cash_sale()
- test_stock_decreases_on_sale()
- test_can_apply_discount()
- test_can_hold_transaction()
- test_can_recall_held_transaction()

// Inventory
- test_can_adjust_stock()
- test_stock_adjustment_creates_history()

// Sales
- test_can_process_refund()
- test_refund_restores_stock()

// Reports
- test_sales_report_shows_correct_totals()
```

### 12.2 Unit Tests

```php
// tests/Unit/

// Services
- test_invoice_number_generation()
- test_discount_calculation()
- test_tax_calculation()
- test_profit_calculation()
```

---

## 13. Deployment Checklist

### 13.1 Pre-Deployment

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Supabase Storage bucket created
- [ ] Queue worker configured
- [ ] SSL certificate installed

### 13.2 Server Requirements

- PHP 8.2+ with pgsql extension
- Supabase Project (PostgreSQL 15+)
- Node.js 18+ (for building)
- Supervisor (for queues)
- Redis (optional for caching)

### 13.3 Supabase Setup Checklist

- [ ] Create Supabase project
- [ ] Copy database connection string
- [ ] Create storage bucket `invenpos`
- [ ] Set storage bucket policies (public read for product images)
- [ ] Enable Row Level Security (optional)
- [ ] Note down API keys

### 13.4 Environment Variables

```env
APP_NAME="InvenPOS"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourapp.com

# Supabase PostgreSQL Connection
DB_CONNECTION=pgsql
DB_HOST=db.xxxxxxxxxxxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-database-password

# Supabase API (for Storage/Realtime - optional)
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=invenpos

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=null
MAIL_PASSWORD=null

# Queue & Session
QUEUE_CONNECTION=database
SESSION_DRIVER=database

# Optional: Redis for caching
CACHE_DRIVER=file
# CACHE_DRIVER=redis
# REDIS_HOST=127.0.0.1
```

### 13.5 Supabase Storage Policies

```sql
-- Allow authenticated users to upload to their store folder
CREATE POLICY "Store members can upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'invenpos' AND
  (storage.foldername(name))[1] = 'stores' AND
  (storage.foldername(name))[2] = auth.uid()::text
);

-- Allow public read access to product images
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'invenpos');
```

### 13.6 Post-Deployment

- [ ] Run migrations: `php artisan migrate --force`
- [ ] Clear and cache config: `php artisan config:cache`
- [ ] Clear and cache routes: `php artisan route:cache`
- [ ] Build frontend assets: `npm run build`
- [ ] Start queue workers (if using queues)
- [ ] Test database connection
- [ ] Test storage upload
- [ ] Configure backups (Supabase has built-in backups)
- [ ] Monitor logs

### 13.7 Supabase Connection Pooling (Production)

For production, use Supabase's connection pooler (PgBouncer):

```env
# Use pooler for better performance in production
DB_HOST=db.xxxxxxxxxxxx.supabase.co
DB_PORT=6543  # Pooler port instead of 5432
```

Or use the connection string directly:

```env
DATABASE_URL=postgres://postgres:[password]@db.[project-ref].supabase.co:6543/postgres?pgbouncer=true
```

---

## 14. Claude Code Commands

### 14.1 Project Setup Commands

```bash
# Initial setup
claude "Create a new Laravel 12 project called invenpos, install Breeze with React and Inertia, configure Tailwind CSS, set up for PostgreSQL/Supabase database"

# Database setup
claude "Create all database migrations for the inventory POS system as specified in the PRD section 5.3, use PostgreSQL-compatible syntax (no enums, use string columns instead)"

# Models
claude "Create all Eloquent models with relationships, casts, and the BelongsToStore trait as specified in the PRD"

# Configure Supabase connection
claude "Configure Laravel database connection for Supabase PostgreSQL, update config/database.php with proper SSL settings"
```

### 14.2 Feature Development Commands

```bash
# Authentication
claude "Implement the user registration flow that creates both user and store, following the PRD registration flow"

# Products
claude "Create the ProductController with full CRUD operations using Inertia, including the React components for listing and form"

# POS
claude "Build the complete POS terminal page with product grid, cart, and payment modal following the PRD wireframe"

# Reports
claude "Create the ReportController and ReportService with sales, inventory, and profit reports as specified"
```

### 14.3 Component Commands

```bash
# UI Components
claude "Create reusable React components: Button, Card, Input, Select, Modal, DataTable using Tailwind CSS"

# POS Components
claude "Create the POS Cart component with add/remove items, quantity adjustment, and real-time total calculation"

# Receipt
claude "Create a printable Receipt component that matches the PRD format and can be printed or saved as PDF"
```

### 14.4 Service Commands

```bash
# POS Service
claude "Create POSService with methods: processCheckout, applyDiscount, calculateTotals, generateInvoiceNumber, and updateStock"

# Report Service
claude "Create ReportService with methods for daily/weekly/monthly sales, inventory valuation, and profit calculation"

# Storage Service (Supabase)
claude "Create StorageService for handling file uploads to Supabase Storage bucket, include methods for product images and invoice PDFs"
```

### 14.5 Testing Commands

```bash
# Feature tests
claude "Write feature tests for the POS checkout flow including cash payment, discount application, and stock deduction"

# All tests
claude "Create comprehensive feature tests for all critical paths: auth, products, POS, inventory, and reports"
```

### 14.6 Supabase-Specific Commands

```bash
# Configure Supabase Storage
claude "Set up Supabase Storage integration in Laravel for product image uploads, create StorageService with upload/delete methods"

# PostgreSQL Full-Text Search
claude "Add PostgreSQL full-text search to products table for fast POS product search"

# JSONB fields
claude "Update held_transactions migration to use jsonb for cart_data and add methods to query cart contents"
```

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| POS | Point of Sale - system for processing sales |
| SKU | Stock Keeping Unit - unique product identifier |
| Multi-tenant | Single app serving multiple businesses |
| Invoice | Document requesting payment for goods |
| Stock Adjustment | Manual change to inventory quantity |

---

## Appendix B: Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 2024 | - | Initial PRD |

---

**END OF DOCUMENT**