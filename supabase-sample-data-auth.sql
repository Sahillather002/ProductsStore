-- =====================================================
-- ShopHub E-Commerce Sample Data for Supabase (Auth-based)
-- =====================================================
-- This SQL script provides sample data that works with Supabase Auth
-- 
-- IMPORTANT: Run this AFTER creating users via Supabase Auth
-- Users must be created through the Supabase dashboard or signup flow
-- This script only populates products, categories, and other data

-- =====================================================
-- 1. CATEGORIES
-- =====================================================
INSERT INTO categories (id, name, slug, description, image, created_at, updated_at) VALUES
('cat_001', 'Electronics', 'electronics', 'Latest gadgets and electronic devices', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', NOW(), NOW()),
('cat_002', 'Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', NOW(), NOW()),
('cat_003', 'Home & Garden', 'home-garden', 'Everything for your home and garden', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', NOW(), NOW()),
('cat_004', 'Sports', 'sports', 'Sports equipment and apparel', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', NOW(), NOW()),
('cat_005', 'Books', 'books', 'Books for every reader', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', NOW(), NOW()),
('cat_006', 'Toys & Games', 'toys-games', 'Fun toys and games for all ages', 'https://images.unsplash.com/photo-1596462502278-27d4419e4653?w=400', NOW(), NOW()),
('cat_007', 'Beauty', 'beauty', 'Skincare, makeup, and beauty products', 'https://images.unsplash.com/photo-1596462502278-27d4419e4653?w=400', NOW(), NOW()),
('cat_008', 'Automotive', 'automotive', 'Car accessories and automotive tools', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400', NOW(), NOW());

-- =====================================================
-- 2. PRODUCTS
-- =====================================================
INSERT INTO products (id, name, slug, description, price, compare_price, cost, sku, track_inventory, inventory, images, status, featured, category_id, tags, created_at, updated_at) VALUES
-- Electronics
('prod_001', 'Premium Wireless Headphones', 'premium-wireless-headphones', 'High-quality wireless headphones with active noise cancellation and premium sound quality. Features 30-hour battery life, comfortable over-ear design, and superior audio performance.', 24999.99, 34999.99, 12500.00, 'WH-001', true, 50, '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"]', 'ACTIVE', true, 'cat_001', '["wireless", "bluetooth", "noise-cancelling", "premium", "audio"]', NOW(), NOW()),

('prod_002', 'Smart Watch Pro', 'smart-watch-pro', 'Advanced smartwatch with health tracking, GPS, and smartphone integration. Monitor your fitness, receive notifications, and stay connected on the go.', 37999.99, 49999.99, 18500.00, 'SW-002', true, 30, '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400"]', 'ACTIVE', true, 'cat_001', '["smartwatch", "fitness", "gps", "health", "wearable"]', NOW(), NOW()),

('prod_003', '4K Webcam Ultra', '4k-webcam-ultra', 'Professional 4K webcam perfect for streaming, video calls, and content creation. Crystal clear video quality with auto-focus and low-light correction.', 14999.99, 20999.99, 7500.00, 'WC-003', true, 75, '["https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400"]', 'ACTIVE', false, 'cat_001', '["webcam", "4k", "streaming", "video", "professional"]', NOW(), NOW()),

('prod_004', 'Mechanical Keyboard RGB', 'mechanical-keyboard-rgb', 'Premium mechanical keyboard with customizable RGB backlighting and tactile switches. Built for gamers and professionals who demand the best.', 10999.99, 15999.99, 5500.00, 'KB-004', true, 100, '["https://images.unsplash.com/photo-1598928424272-9e667f73ed3e?w=400"]', 'ACTIVE', true, 'cat_001', '["keyboard", "mechanical", "rgb", "gaming", "professional"]', NOW(), NOW()),

('prod_005', 'Laptop Pro 15"', 'laptop-pro-15', 'High-performance laptop with 15-inch display, powerful processor, and all-day battery life. Perfect for work and creative projects.', 109999.99, 139999.99, 65000.00, 'LP-005', true, 25, '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"]', 'ACTIVE', true, 'cat_001', '["laptop", "computer", "professional", "high-performance"]', NOW(), NOW()),

-- Fashion
('prod_006', 'Designer Leather Jacket', 'designer-leather-jacket', 'Genuine leather jacket with modern design and premium craftsmanship. Timeless style meets contemporary fashion.', 49999.99, 69999.99, 25000.00, 'LJ-006', true, 20, '["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400"]', 'ACTIVE', false, 'cat_002', '["jacket", "leather", "fashion", "designer", "premium"]', NOW(), NOW()),

('prod_007', 'Classic Denim Jeans', 'classic-denim-jeans', 'Premium denim jeans with perfect fit and timeless style. Comfortable, durable, and versatile for any occasion.', 7999.99, 11999.99, 3500.00, 'DJ-007', true, 150, '["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"]', 'ACTIVE', false, 'cat_002', '["jeans", "denim", "casual", "fashion", "versatile"]', NOW(), NOW()),

('prod_008', 'Silk Evening Dress', 'silk-evening-dress', 'Elegant silk dress perfect for special occasions. Luxurious fabric with sophisticated design and comfortable fit.', 24999.99, 39999.99, 10000.00, 'ED-008', true, 15, '["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"]', 'ACTIVE', true, 'cat_002', '["dress", "silk", "evening", "elegant", "formal"]', NOW(), NOW()),

-- Sports
('prod_009', 'Yoga Mat Premium', 'yoga-mat-premium', 'Extra thick, non-slip yoga mat with carrying strap and alignment markers. Perfect for yoga, pilates, and floor exercises.', 3999.99, 5999.99, 1800.00, 'YM-009', true, 150, '["https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400"]', 'ACTIVE', false, 'cat_004', '["yoga", "fitness", "exercise", "mat", "wellness"]', NOW(), NOW()),

('prod_010', 'Running Shoes Pro', 'running-shoes-pro', 'Professional running shoes with advanced cushioning and breathable design. Engineered for performance and comfort.', 15999.99, 20999.99, 7500.00, 'RS-010', true, 80, '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"]', 'ACTIVE', false, 'cat_004', '["shoes", "running", "athletic", "comfort", "performance"]', NOW(), NOW()),

-- Home & Garden
('prod_011', 'Smart Home Hub', 'smart-home-hub', 'Central control hub for all your smart home devices with voice assistant. Control lights, thermostat, security, and more.', 12999.99, 17999.99, 6000.00, 'SH-011', true, 60, '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"]', 'ACTIVE', true, 'cat_003', '["smart-home", "iot", "automation", "voice", "control"]', NOW(), NOW()),

('prod_012', 'Ceramic Plant Pot Set', 'ceramic-plant-pot-set', 'Set of 3 beautiful ceramic plant pots with drainage trays. Perfect for indoor plants and herbs.', 3499.99, 5499.99, 1500.00, 'PP-012', true, 200, '["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400"]', 'ACTIVE', false, 'cat_003', '["planters", "ceramic", "garden", "indoor", "decor"]', NOW(), NOW()),

-- Books
('prod_013', 'JavaScript: The Complete Guide', 'javascript-complete-guide', 'Comprehensive guide to JavaScript programming from basics to advanced concepts. Perfect for developers of all levels.', 4299.99, 5999.99, 1800.00, 'JS-013', true, 100, '["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"]', 'ACTIVE', false, 'cat_005', '["programming", "javascript", "education", "technology", "guide"]', NOW(), NOW()),

('prod_014', 'Mindfulness Meditation', 'mindfulness-meditation', 'Transform your life with mindfulness meditation. Practical techniques for stress reduction and inner peace.', 2199.99, 3199.99, 900.00, 'MM-014', true, 120, '["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"]', 'ACTIVE', false, 'cat_005', '["meditation", "mindfulness", "self-help", "wellness", "spiritual"]', NOW(), NOW()),

-- Toys & Games
('prod_015', 'STEM Building Blocks', 'stem-building-blocks', 'Educational building blocks that teach STEM concepts through play. 500+ pieces with instruction manual.', 6999.99, 8999.99, 3200.00, 'BB-015', true, 90, '["https://images.unsplash.com/photo-1596462502278-27d4419e4653?w=400"]', 'ACTIVE', false, 'cat_006', '["building", "blocks", "educational", "stem", "toys"]', NOW(), NOW()),

-- Beauty
('prod_016', 'Luxury Skincare Set', 'luxury-skincare-set', 'Premium skincare set with cleanser, toner, serum, and moisturizer. Natural ingredients for radiant skin.', 12999.99, 17999.99, 5500.00, 'SS-016', true, 45, '["https://images.unsplash.com/photo-1556228720-195a624e0838?w=400"]', 'ACTIVE', true, 'cat_007', '["skincare", "beauty", "luxury", "natural", "cosmetics"]', NOW(), NOW()),

-- Automotive
('prod_017', 'Car Phone Mount', 'car-phone-mount', 'Adjustable car phone mount with secure grip and 360-degree rotation. Compatible with all smartphone sizes.', 2599.99, 3599.99, 1100.00, 'CM-017', true, 180, '["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400"]', 'ACTIVE', false, 'cat_008', '["automotive", "phone", "mount", "accessory", "car"]', NOW(), NOW());

-- =====================================================
-- 3. PRODUCT VARIANTS
-- =====================================================
INSERT INTO product_variants (id, product_id, name, value, price, sku, inventory) VALUES
-- Headphones variants
('var_001', 'prod_001', 'Color', 'Black', 24999.99, 'WH-001-BLK', 25),
('var_002', 'prod_001', 'Color', 'Silver', 24999.99, 'WH-001-SLV', 15),
('var_003', 'prod_001', 'Color', 'Blue', 26999.99, 'WH-001-BLU', 10),

-- Smart Watch variants
('var_004', 'prod_002', 'Size', '42mm', 37999.99, 'SW-002-42', 15),
('var_005', 'prod_002', 'Size', '46mm', 40999.99, 'SW-002-46', 15),

-- Jeans variants
('var_006', 'prod_007', 'Size', '30x32', 7999.99, 'DJ-007-3032', 30),
('var_007', 'prod_007', 'Size', '32x32', 7999.99, 'DJ-007-3232', 40),
('var_008', 'prod_007', 'Size', '34x32', 7999.99, 'DJ-007-3432', 30),
('var_009', 'prod_007', 'Size', '36x32', 7999.99, 'DJ-007-3632', 25),
('var_010', 'prod_007', 'Size', '38x32', 7999.99, 'DJ-007-3832', 25),

-- Running Shoes variants
('var_011', 'prod_010', 'Size', '8', 15999.99, 'RS-010-8', 15),
('var_012', 'prod_010', 'Size', '9', 15999.99, 'RS-010-9', 20),
('var_013', 'prod_010', 'Size', '10', 15999.99, 'RS-010-10', 20),
('var_014', 'prod_010', 'Size', '11', 15999.99, 'RS-010-11', 15),
('var_015', 'prod_010', 'Size', '12', 15999.99, 'RS-010-12', 10);

-- =====================================================
-- 4. COUPONS
-- =====================================================
INSERT INTO coupons (id, code, name, description, type, value, minimum_amount, maximum_discount, usage_limit, usage_count, start_date, end_date, is_active, created_at, updated_at) VALUES
('cpn_001', 'WELCOME10', 'Welcome Discount', 'Get 10% off your first order', 'PERCENTAGE', 10.00, 50.00, 50.00, 1000, 127, NOW() - INTERVAL '30 days', NOW() + INTERVAL '30 days', true, NOW() - INTERVAL '30 days', NOW()),
('cpn_002', 'FREESHIP', 'Free Shipping', 'Free shipping on orders over $50', 'FIXED_AMOUNT', 9.99, 50.00, 9.99, 5000, 342, NOW() - INTERVAL '15 days', NOW() + INTERVAL '45 days', true, NOW() - INTERVAL '15 days', NOW()),
('cpn_003', 'SAVE25', '25% Off Electronics', 'Save 25% on all electronics', 'PERCENTAGE', 25.00, 100.00, 100.00, 500, 89, NOW() - INTERVAL '7 days', NOW() + INTERVAL '7 days', true, NOW() - INTERVAL '7 days', NOW()),
('cpn_004', 'FLASH50', 'Flash Sale 50% Off', 'Limited time flash sale', 'PERCENTAGE', 50.00, 200.00, 200.00, 100, 23, NOW() - INTERVAL '2 days', NOW() + INTERVAL '2 days', true, NOW() - INTERVAL '2 days', NOW());

-- =====================================================
-- SUMMARY
-- =====================================================
-- Categories: 8
-- Products: 17 (across all categories)
-- Product Variants: 15
-- Coupons: 4
--
-- NOTE: Users, orders, reviews, and other user-specific data
-- will be created when users sign up through Supabase Auth
-- and interact with the application.
--
-- To add sample users, addresses, orders, etc., you need to:
-- 1. Create users via Supabase Auth (dashboard or signup)
-- 2. Get their UUIDs from auth.users table
-- 3. Insert data using those UUIDs
