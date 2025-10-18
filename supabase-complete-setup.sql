-- =====================================================
-- COMPLETE SUPABASE SETUP FOR PRODUCT STORE
-- =====================================================
-- Run this in Supabase SQL Editor to set up your database
-- This includes tables, RLS policies, and sample data

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  avatar TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compare_price DECIMAL(10, 2),
  cost DECIMAL(10, 2),
  sku TEXT UNIQUE,
  track_inventory BOOLEAN DEFAULT true,
  inventory INTEGER DEFAULT 0,
  images JSONB,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'DRAFT', 'ARCHIVED')),
  featured BOOLEAN DEFAULT false,
  category_id TEXT REFERENCES categories(id),
  tags JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product variants table
CREATE TABLE IF NOT EXISTS public.product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  price DECIMAL(10, 2),
  sku TEXT UNIQUE,
  inventory INTEGER DEFAULT 0
);

-- Addresses table
CREATE TABLE IF NOT EXISTS public.addresses (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'SHIPPING' CHECK (type IN ('SHIPPING', 'BILLING')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT,
  address1 TEXT NOT NULL,
  address2 TEXT,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  country TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  phone TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Carts table
CREATE TABLE IF NOT EXISTS public.carts (
  id TEXT PRIMARY KEY,
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id TEXT PRIMARY KEY,
  cart_id TEXT REFERENCES carts(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  variant_id TEXT REFERENCES product_variants(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED')),
  payment_status TEXT DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED')),
  fulfillment_status TEXT DEFAULT 'UNFULFILLED' CHECK (fulfillment_status IN ('UNFULFILLED', 'PARTIALLY_FULFILLED', 'FULFILLED')),
  currency TEXT DEFAULT 'USD',
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  shipping_first_name TEXT,
  shipping_last_name TEXT,
  shipping_company TEXT,
  shipping_address1 TEXT,
  shipping_address2 TEXT,
  shipping_city TEXT,
  shipping_province TEXT,
  shipping_country TEXT,
  shipping_postal_code TEXT,
  shipping_phone TEXT,
  billing_first_name TEXT,
  billing_last_name TEXT,
  billing_company TEXT,
  billing_address1 TEXT,
  billing_address2 TEXT,
  billing_city TEXT,
  billing_province TEXT,
  billing_country TEXT,
  billing_postal_code TEXT,
  billing_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id),
  variant_id TEXT REFERENCES product_variants(id),
  name TEXT NOT NULL,
  sku TEXT,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  image TEXT
);

-- Transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  gateway TEXT NOT NULL,
  gateway_transaction_id TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  verified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wishlist items table
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('PERCENTAGE', 'FIXED_AMOUNT')),
  value DECIMAL(10, 2) NOT NULL,
  minimum_amount DECIMAL(10, 2),
  maximum_discount DECIMAL(10, 2),
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

DROP INDEX IF EXISTS idx_products_category;
DROP INDEX IF EXISTS idx_products_status;
DROP INDEX IF EXISTS idx_products_featured;
DROP INDEX IF EXISTS idx_cart_items_cart;
DROP INDEX IF EXISTS idx_cart_items_product;
DROP INDEX IF EXISTS idx_orders_user;
DROP INDEX IF EXISTS idx_orders_status;
DROP INDEX IF EXISTS idx_reviews_product;
DROP INDEX IF EXISTS idx_reviews_user;

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON cart_items(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Drop existing policies if they exist (to avoid conflicts when re-running)
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Anyone can view product variants" ON product_variants;
DROP POLICY IF EXISTS "Users can view their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can insert their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can update their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can delete their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can view their own cart" ON carts;
DROP POLICY IF EXISTS "Users can insert their own cart" ON carts;
DROP POLICY IF EXISTS "Users can update their own cart" ON carts;
DROP POLICY IF EXISTS "Users can view their cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can insert their cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can update their cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can delete their cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Users can view their order items" ON order_items;
DROP POLICY IF EXISTS "Users can view their transactions" ON transactions;
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON reviews;
DROP POLICY IF EXISTS "Users can insert their own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can update their own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can delete their own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can view their wishlist" ON wishlist_items;
DROP POLICY IF EXISTS "Users can add to their wishlist" ON wishlist_items;
DROP POLICY IF EXISTS "Users can remove from their wishlist" ON wishlist_items;
DROP POLICY IF EXISTS "Anyone can view active coupons" ON coupons;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);

-- Products policies (public read)
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (status = 'ACTIVE');

-- Product variants policies (public read)
CREATE POLICY "Anyone can view product variants" ON product_variants FOR SELECT USING (true);

-- Addresses policies
CREATE POLICY "Users can view their own addresses" ON addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own addresses" ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own addresses" ON addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own addresses" ON addresses FOR DELETE USING (auth.uid() = user_id);

-- Carts policies
CREATE POLICY "Users can view their own cart" ON carts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own cart" ON carts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cart" ON carts FOR UPDATE USING (auth.uid() = user_id);

-- Cart items policies
CREATE POLICY "Users can view their cart items" ON cart_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));
CREATE POLICY "Users can insert their cart items" ON cart_items FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));
CREATE POLICY "Users can update their cart items" ON cart_items FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));
CREATE POLICY "Users can delete their cart items" ON cart_items FOR DELETE 
  USING (EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view their order items" ON order_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Transactions policies
CREATE POLICY "Users can view their transactions" ON transactions FOR SELECT 
  USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = transactions.order_id AND orders.user_id = auth.uid()));

-- Reviews policies
CREATE POLICY "Anyone can view approved reviews" ON reviews FOR SELECT USING (status = 'APPROVED');
CREATE POLICY "Users can insert their own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Wishlist policies
CREATE POLICY "Users can view their wishlist" ON wishlist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to their wishlist" ON wishlist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove from their wishlist" ON wishlist_items FOR DELETE USING (auth.uid() = user_id);

-- Coupons policies (public read for active coupons)
CREATE POLICY "Anyone can view active coupons" ON coupons FOR SELECT USING (is_active = true);

-- =====================================================
-- 4. FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers before creating new ones
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_addresses_updated_at ON addresses;
DROP TRIGGER IF EXISTS update_carts_updated_at ON carts;
DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
DROP TRIGGER IF EXISTS update_transactions_updated_at ON transactions;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
DROP TRIGGER IF EXISTS update_coupons_updated_at ON coupons;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger before creating new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 5. SAMPLE DATA
-- =====================================================

-- Insert Categories
INSERT INTO categories (id, name, slug, description, image) VALUES
('cat_001', 'Electronics', 'electronics', 'Latest gadgets and electronic devices', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
('cat_002', 'Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'),
('cat_003', 'Home & Garden', 'home-garden', 'Everything for your home and garden', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'),
('cat_004', 'Sports', 'sports', 'Sports equipment and apparel', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400')
ON CONFLICT (id) DO NOTHING;

-- Insert Products
INSERT INTO products (id, name, slug, description, price, compare_price, cost, sku, track_inventory, inventory, images, status, featured, category_id, tags) VALUES
('prod_001', 'Premium Wireless Headphones', 'premium-wireless-headphones', 'High-quality wireless headphones with active noise cancellation and premium sound quality. Features 30-hour battery life, comfortable over-ear design, and superior audio performance.', 24999.99, 34999.99, 15000.00, 'WH-001', true, 50, '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"]', 'ACTIVE', true, 'cat_001', '["wireless", "bluetooth", "noise-cancelling", "premium", "audio"]'),
('prod_002', 'Smart Watch Pro', 'smart-watch-pro', 'Advanced smartwatch with health tracking, GPS, and smartphone integration. Monitor your fitness, receive notifications, and stay connected on the go.', 37999.99, 49999.99, 22000.00, 'SW-002', true, 30, '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400"]', 'ACTIVE', true, 'cat_001', '["smartwatch", "fitness", "gps", "health", "wearable"]'),
('prod_003', '4K Webcam Ultra', '4k-webcam-ultra', 'Professional 4K webcam perfect for streaming, video calls, and content creation. Crystal clear video quality with auto-focus and low-light correction.', 14999.99, 20999.99, 8500.00, 'WC-003', true, 75, '["https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400"]', 'ACTIVE', false, 'cat_001', '["webcam", "4k", "streaming", "video", "professional"]'),
('prod_004', 'Mechanical Keyboard RGB', 'mechanical-keyboard-rgb', 'Premium mechanical keyboard with customizable RGB backlighting and tactile switches. Built for gamers and professionals who demand the best.', 10999.99, 15999.99, 6000.00, 'KB-004', true, 100, '["https://images.unsplash.com/photo-1598928424272-9e667f73ed3e?w=400"]', 'ACTIVE', true, 'cat_001', '["keyboard", "mechanical", "rgb", "gaming", "professional"]'),
('prod_005', 'Laptop Pro 15"', 'laptop-pro-15', 'High-performance laptop with 15-inch display, powerful processor, and all-day battery life. Perfect for work and creative projects.', 109999.99, 139999.99, 75000.00, 'LP-005', true, 25, '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"]', 'ACTIVE', true, 'cat_001', '["laptop", "computer", "professional", "high-performance"]'),
('prod_006', 'Designer Leather Jacket', 'designer-leather-jacket', 'Genuine leather jacket with modern design and premium craftsmanship. Timeless style meets contemporary fashion.', 49999.99, 69999.99, 28000.00, 'LJ-006', true, 20, '["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400"]', 'ACTIVE', false, 'cat_002', '["jacket", "leather", "fashion", "designer", "premium"]'),
('prod_007', 'Classic Denim Jeans', 'classic-denim-jeans', 'Premium denim jeans with perfect fit and timeless style. Comfortable, durable, and versatile for any occasion.', 7999.99, 11999.99, 3500.00, 'DJ-007', true, 150, '["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"]', 'ACTIVE', false, 'cat_002', '["jeans", "denim", "casual", "fashion", "versatile"]'),
('prod_008', 'Silk Evening Dress', 'silk-evening-dress', 'Elegant silk dress perfect for special occasions. Luxurious fabric with sophisticated design and comfortable fit.', 24999.99, 39999.99, 12000.00, 'ED-008', true, 15, '["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"]', 'ACTIVE', true, 'cat_002', '["dress", "silk", "evening", "elegant", "formal"]'),
('prod_009', 'Yoga Mat Premium', 'yoga-mat-premium', 'Extra thick, non-slip yoga mat with carrying strap and alignment markers. Perfect for yoga, pilates, and floor exercises.', 3999.99, 5999.99, 2000.00, 'YM-009', true, 150, '["https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400"]', 'ACTIVE', false, 'cat_004', '["yoga", "fitness", "exercise", "mat", "wellness"]'),
('prod_010', 'Running Shoes Pro', 'running-shoes-pro', 'Professional running shoes with advanced cushioning and breathable design. Engineered for performance and comfort.', 15999.99, 20999.99, 8500.00, 'RS-010', true, 80, '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"]', 'ACTIVE', false, 'cat_004', '["shoes", "running", "athletic", "comfort", "performance"]'),
('prod_011', 'Smart Home Hub', 'smart-home-hub', 'Central control hub for all your smart home devices with voice assistant. Control lights, thermostat, security, and more.', 12999.99, 17999.99, 6500.00, 'SH-011', true, 60, '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"]', 'ACTIVE', true, 'cat_003', '["smart-home", "iot", "automation", "voice", "control"]'),
('prod_012', 'Ceramic Plant Pot Set', 'ceramic-plant-pot-set', 'Set of 3 beautiful ceramic plant pots with drainage trays. Perfect for indoor plants and herbs.', 3499.99, 5499.99, 1500.00, 'PP-012', true, 200, '["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400"]', 'ACTIVE', false, 'cat_003', '["planters", "ceramic", "garden", "indoor", "decor"]')
ON CONFLICT (id) DO NOTHING;

-- Insert Product Variants
INSERT INTO product_variants (id, product_id, name, value, price, sku, inventory) VALUES
('var_001', 'prod_001', 'Color', 'Black', 24999.99, 'WH-001-BLK', 25),
('var_002', 'prod_001', 'Color', 'Silver', 24999.99, 'WH-001-SLV', 15),
('var_003', 'prod_001', 'Color', 'Blue', 26999.99, 'WH-001-BLU', 10),
('var_004', 'prod_002', 'Size', '42mm', 37999.99, 'SW-002-42', 15),
('var_005', 'prod_002', 'Size', '46mm', 40999.99, 'SW-002-46', 15),
('var_006', 'prod_007', 'Size', '30x32', 7999.99, 'DJ-007-3032', 30),
('var_007', 'prod_007', 'Size', '32x32', 7999.99, 'DJ-007-3232', 40),
('var_008', 'prod_007', 'Size', '34x32', 7999.99, 'DJ-007-3432', 30),
('var_009', 'prod_010', 'Size', '8', 15999.99, 'RS-010-8', 15),
('var_010', 'prod_010', 'Size', '9', 15999.99, 'RS-010-9', 20),
('var_011', 'prod_010', 'Size', '10', 15999.99, 'RS-010-10', 20),
('var_012', 'prod_010', 'Size', '11', 15999.99, 'RS-010-11', 15)
ON CONFLICT (id) DO NOTHING;

-- Insert Coupons
INSERT INTO coupons (id, code, name, description, type, value, minimum_amount, maximum_discount, usage_limit, usage_count, start_date, end_date, is_active) VALUES
('cpn_001', 'WELCOME10', 'Welcome Discount', 'Get 10% off your first order', 'PERCENTAGE', 10.00, 50.00, 50.00, 1000, 0, NOW(), NOW() + INTERVAL '30 days', true),
('cpn_002', 'FREESHIP', 'Free Shipping', 'Free shipping on orders over ₹4000', 'FIXED_AMOUNT', 9.99, 4000.00, 9.99, 5000, 0, NOW(), NOW() + INTERVAL '45 days', true),
('cpn_003', 'SAVE25', '25% Off Electronics', 'Save 25% on all electronics', 'PERCENTAGE', 25.00, 10000.00, 10000.00, 500, 0, NOW(), NOW() + INTERVAL '7 days', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Your Supabase database is now ready to use.
-- 
-- Next steps:
-- 1. Set up authentication in Supabase dashboard
-- 2. Configure your environment variables:
--    NEXT_PUBLIC_SUPABASE_URL=your-project-url
--    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
-- 3. Test user registration and login
-- 4. Start adding products to cart!
