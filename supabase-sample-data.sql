-- =====================================================
-- ShopHub E-Commerce Sample Data for Supabase
-- =====================================================
-- This SQL script provides comprehensive sample data
-- for a fully functional e-commerce platform

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
-- 2. USERS
-- =====================================================
INSERT INTO users (id, email, name, role, avatar, phone, created_at, updated_at) VALUES
('user_001', 'admin@shophub.com', 'Admin User', 'ADMIN', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', '+1-555-0101', NOW(), NOW()),
('user_002', 'john.doe@example.com', 'John Doe', 'USER', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', '+1-555-0102', NOW(), NOW()),
('user_003', 'jane.smith@example.com', 'Jane Smith', 'USER', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150', '+1-555-0103', NOW(), NOW()),
('user_004', 'mike.wilson@example.com', 'Mike Wilson', 'USER', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', '+1-555-0104', NOW(), NOW()),
('user_005', 'sarah.johnson@example.com', 'Sarah Johnson', 'USER', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', '+1-555-0105', NOW(), NOW());

-- =====================================================
-- 3. PRODUCTS
-- =====================================================
INSERT INTO products (id, name, slug, description, price, compare_price, cost, sku, track_inventory, inventory, images, status, featured, category_id, tags, created_at, updated_at) VALUES
-- Electronics
('prod_001', 'Premium Wireless Headphones', 'premium-wireless-headphones', 'High-quality wireless headphones with active noise cancellation and premium sound quality. Features 30-hour battery life, comfortable over-ear design, and superior audio performance.', 299.99, 399.99, 150.00, 'WH-001', true, 50, '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"]', 'ACTIVE', true, 'cat_001', '["wireless", "bluetooth", "noise-cancelling", "premium", "audio"]', NOW(), NOW()),

('prod_002', 'Smart Watch Pro', 'smart-watch-pro', 'Advanced smartwatch with health tracking, GPS, and smartphone integration. Monitor your fitness, receive notifications, and stay connected on the go.', 449.99, 599.99, 220.00, 'SW-002', true, 30, '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400"]', 'ACTIVE', true, 'cat_001', '["smartwatch", "fitness", "gps", "health", "wearable"]', NOW(), NOW()),

('prod_003', '4K Webcam Ultra', '4k-webcam-ultra', 'Professional 4K webcam perfect for streaming, video calls, and content creation. Crystal clear video quality with auto-focus and low-light correction.', 179.99, 249.99, 85.00, 'WC-003', true, 75, '["https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400"]', 'ACTIVE', false, 'cat_001', '["webcam", "4k", "streaming", "video", "professional"]', NOW(), NOW()),

('prod_004', 'Mechanical Keyboard RGB', 'mechanical-keyboard-rgb', 'Premium mechanical keyboard with customizable RGB backlighting and tactile switches. Built for gamers and professionals who demand the best.', 129.99, 179.99, 60.00, 'KB-004', true, 100, '["https://images.unsplash.com/photo-1598928424272-9e667f73ed3e?w=400"]', 'ACTIVE', true, 'cat_001', '["keyboard", "mechanical", "rgb", "gaming", "professional"]', NOW(), NOW()),

('prod_005', 'Laptop Pro 15"', 'laptop-pro-15', 'High-performance laptop with 15-inch display, powerful processor, and all-day battery life. Perfect for work and creative projects.', 1299.99, 1599.99, 750.00, 'LP-005', true, 25, '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"]', 'ACTIVE', true, 'cat_001', '["laptop", "computer", "professional", "high-performance"]', NOW(), NOW()),

-- Fashion
('prod_006', 'Designer Leather Jacket', 'designer-leather-jacket', 'Genuine leather jacket with modern design and premium craftsmanship. Timeless style meets contemporary fashion.', 599.99, 799.99, 280.00, 'LJ-006', true, 20, '["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400"]', 'ACTIVE', false, 'cat_002', '["jacket", "leather", "fashion", "designer", "premium"]', NOW(), NOW()),

('prod_007', 'Classic Denim Jeans', 'classic-denim-jeans', 'Premium denim jeans with perfect fit and timeless style. Comfortable, durable, and versatile for any occasion.', 89.99, 129.99, 35.00, 'DJ-007', true, 150, '["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"]', 'ACTIVE', false, 'cat_002', '["jeans", "denim", "casual", "fashion", "versatile"]', NOW(), NOW()),

('prod_008', 'Silk Evening Dress', 'silk-evening-dress', 'Elegant silk dress perfect for special occasions. Luxurious fabric with sophisticated design and comfortable fit.', 299.99, 449.99, 120.00, 'ED-008', true, 15, '["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"]', 'ACTIVE', true, 'cat_002', '["dress", "silk", "evening", "elegant", "formal"]', NOW(), NOW()),

-- Sports
('prod_009', 'Yoga Mat Premium', 'yoga-mat-premium', 'Extra thick, non-slip yoga mat with carrying strap and alignment markers. Perfect for yoga, pilates, and floor exercises.', 49.99, 69.99, 20.00, 'YM-009', true, 150, '["https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400"]', 'ACTIVE', false, 'cat_004', '["yoga", "fitness", "exercise", "mat", "wellness"]', NOW(), NOW()),

('prod_010', 'Running Shoes Pro', 'running-shoes-pro', 'Professional running shoes with advanced cushioning and breathable design. Engineered for performance and comfort.', 189.99, 249.99, 85.00, 'RS-010', true, 80, '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"]', 'ACTIVE', false, 'cat_004', '["shoes", "running", "athletic", "comfort", "performance"]', NOW(), NOW()),

-- Home & Garden
('prod_011', 'Smart Home Hub', 'smart-home-hub', 'Central control hub for all your smart home devices with voice assistant. Control lights, thermostat, security, and more.', 149.99, 199.99, 65.00, 'SH-011', true, 60, '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"]', 'ACTIVE', true, 'cat_003', '["smart-home", "iot", "automation", "voice", "control"]', NOW(), NOW()),

('prod_012', 'Ceramic Plant Pot Set', 'ceramic-plant-pot-set', 'Set of 3 beautiful ceramic plant pots with drainage trays. Perfect for indoor plants and herbs.', 39.99, 59.99, 15.00, 'PP-012', true, 200, '["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400"]', 'ACTIVE', false, 'cat_003', '["planters", "ceramic", "garden", "indoor", "decor"]', NOW(), NOW()),

-- Books
('prod_013', 'JavaScript: The Complete Guide', 'javascript-complete-guide', 'Comprehensive guide to JavaScript programming from basics to advanced concepts. Perfect for developers of all levels.', 49.99, 69.99, 20.00, 'JS-013', true, 100, '["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"]', 'ACTIVE', false, 'cat_005', '["programming", "javascript", "education", "technology", "guide"]', NOW(), NOW()),

('prod_014', 'Mindfulness Meditation', 'mindfulness-meditation', 'Transform your life with mindfulness meditation. Practical techniques for stress reduction and inner peace.', 24.99, 34.99, 10.00, 'MM-014', true, 120, '["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"]', 'ACTIVE', false, 'cat_005', '["meditation", "mindfulness", "self-help", "wellness", "spiritual"]', NOW(), NOW()),

-- Toys & Games
('prod_015', 'STEM Building Blocks', 'stem-building-blocks', 'Educational building blocks that teach STEM concepts through play. 500+ pieces with instruction manual.', 79.99, 99.99, 35.00, 'BB-015', true, 90, '["https://images.unsplash.com/photo-1596462502278-27d4419e4653?w=400"]', 'ACTIVE', false, 'cat_006', '["building", "blocks", "educational", "stem", "toys"]', NOW(), NOW()),

-- Beauty
('prod_016', 'Luxury Skincare Set', 'luxury-skincare-set', 'Premium skincare set with cleanser, toner, serum, and moisturizer. Natural ingredients for radiant skin.', 149.99, 199.99, 60.00, 'SS-016', true, 45, '["https://images.unsplash.com/photo-1556228720-195a624e0838?w=400"]', 'ACTIVE', true, 'cat_007', '["skincare", "beauty", "luxury", "natural", "cosmetics"]', NOW(), NOW()),

-- Automotive
('prod_017', 'Car Phone Mount', 'car-phone-mount', 'Adjustable car phone mount with secure grip and 360-degree rotation. Compatible with all smartphone sizes.', 29.99, 39.99, 12.00, 'CM-017', true, 180, '["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400"]', 'ACTIVE', false, 'cat_008', '["automotive", "phone", "mount", "accessory", "car"]', NOW(), NOW());

-- =====================================================
-- 4. PRODUCT VARIANTS
-- =====================================================
INSERT INTO product_variants (id, product_id, name, value, price, sku, inventory) VALUES
-- Headphones variants
('var_001', 'prod_001', 'Color', 'Black', 299.99, 'WH-001-BLK', 25),
('var_002', 'prod_001', 'Color', 'Silver', 299.99, 'WH-001-SLV', 15),
('var_003', 'prod_001', 'Color', 'Blue', 319.99, 'WH-001-BLU', 10),

-- Smart Watch variants
('var_004', 'prod_002', 'Size', '42mm', 449.99, 'SW-002-42', 15),
('var_005', 'prod_002', 'Size', '46mm', 479.99, 'SW-002-46', 15),

-- Jeans variants
('var_006', 'prod_007', 'Size', '30x32', 89.99, 'DJ-007-3032', 30),
('var_007', 'prod_007', 'Size', '32x32', 89.99, 'DJ-007-3232', 40),
('var_008', 'prod_007', 'Size', '34x32', 89.99, 'DJ-007-3432', 30),
('var_009', 'prod_007', 'Size', '36x32', 89.99, 'DJ-007-3632', 25),
('var_010', 'prod_007', 'Size', '38x32', 89.99, 'DJ-007-3832', 25),

-- Running Shoes variants
('var_011', 'prod_010', 'Size', '8', 189.99, 'RS-010-8', 15),
('var_012', 'prod_010', 'Size', '9', 189.99, 'RS-010-9', 20),
('var_013', 'prod_010', 'Size', '10', 189.99, 'RS-010-10', 20),
('var_014', 'prod_010', 'Size', '11', 189.99, 'RS-010-11', 15),
('var_015', 'prod_010', 'Size', '12', 189.99, 'RS-010-12', 10);

-- =====================================================
-- 5. USER ADDRESSES
-- =====================================================
INSERT INTO addresses (id, user_id, type, first_name, last_name, company, address1, address2, city, province, country, postal_code, phone, is_default, created_at, updated_at) VALUES
('addr_001', 'user_002', 'SHIPPING', 'John', 'Doe', NULL, '123 Main St', 'Apt 4B', 'New York', 'NY', 'USA', '10001', '+1-555-0102', true, NOW(), NOW()),
('addr_002', 'user_002', 'BILLING', 'John', 'Doe', NULL, '123 Main St', 'Apt 4B', 'New York', 'NY', 'USA', '10001', '+1-555-0102', true, NOW(), NOW()),
('addr_003', 'user_003', 'SHIPPING', 'Jane', 'Smith', 'Tech Corp', '456 Oak Ave', NULL, 'San Francisco', 'CA', 'USA', '94102', '+1-555-0103', true, NOW(), NOW()),
('addr_004', 'user_003', 'BILLING', 'Jane', 'Smith', 'Tech Corp', '456 Oak Ave', NULL, 'San Francisco', 'CA', 'USA', '94102', '+1-555-0103', true, NOW(), NOW()),
('addr_005', 'user_004', 'SHIPPING', 'Mike', 'Wilson', NULL, '789 Pine Rd', NULL, 'Austin', 'TX', 'USA', '73301', '+1-555-0104', true, NOW(), NOW()),
('addr_006', 'user_005', 'SHIPPING', 'Sarah', 'Johnson', NULL, '321 Elm St', 'Suite 200', 'Chicago', 'IL', 'USA', '60601', '+1-555-0105', true, NOW(), NOW());

-- =====================================================
-- 6. ORDERS
-- =====================================================
INSERT INTO orders (id, order_number, user_id, status, payment_status, fulfillment_status, currency, subtotal, tax, shipping, discount, total, notes, shipping_first_name, shipping_last_name, shipping_company, shipping_address1, shipping_address2, shipping_city, shipping_province, shipping_country, shipping_postal_code, shipping_phone, billing_first_name, billing_last_name, billing_company, billing_address1, billing_address2, billing_city, billing_province, billing_country, billing_postal_code, billing_phone, created_at, updated_at) VALUES
-- John Doe's orders
('order_001', 'ORD-2024-001', 'user_002', 'DELIVERED', 'PAID', 'FULFILLED', 'USD', 299.99, 24.00, 0.00, 0.00, 323.99, NULL, 'John', 'Doe', NULL, '123 Main St', 'Apt 4B', 'New York', 'NY', 'USA', '10001', '+1-555-0102', 'John', 'Doe', NULL, '123 Main St', 'Apt 4B', 'New York', 'NY', 'USA', '10001', '+1-555-0102', NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days'),

('order_002', 'ORD-2024-002', 'user_002', 'SHIPPED', 'PAID', 'FULFILLED', 'USD', 639.98, 51.20, 9.99, 0.00, 701.17, NULL, 'John', 'Doe', NULL, '123 Main St', 'Apt 4B', 'New York', 'NY', 'USA', '10001', '+1-555-0102', 'John', 'Doe', NULL, '123 Main St', 'Apt 4B', 'New York', 'NY', 'USA', '10001', '+1-555-0102', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days'),

-- Jane Smith's orders
('order_003', 'ORD-2024-003', 'user_003', 'PROCESSING', 'PAID', 'UNFULFILLED', 'USD', 299.99, 24.00, 0.00, 0.00, 323.99, 'Gift wrapping requested', 'Jane', 'Smith', 'Tech Corp', '456 Oak Ave', NULL, 'San Francisco', 'CA', 'USA', '94102', '+1-555-0103', 'Jane', 'Smith', 'Tech Corp', '456 Oak Ave', NULL, 'San Francisco', 'CA', 'USA', '94102', '+1-555-0103', NOW() - INTERVAL '1 day', NOW()),

-- Mike Wilson's orders
('order_004', 'ORD-2024-004', 'user_004', 'PENDING', 'PENDING', 'UNFULFILLED', 'USD', 189.99, 15.20, 9.99, 0.00, 215.18, NULL, 'Mike', 'Wilson', NULL, '789 Pine Rd', NULL, 'Austin', 'TX', 'USA', '73301', '+1-555-0104', 'Mike', 'Wilson', NULL, '789 Pine Rd', NULL, 'Austin', 'TX', 'USA', '73301', '+1-555-0104', NOW() - INTERVAL '12 hours', NOW()),

-- Sarah Johnson's orders
('order_005', 'ORD-2024-005', 'user_005', 'CONFIRMED', 'PAID', 'UNFULFILLED', 'USD', 149.99, 12.00, 0.00, 0.00, 161.99, NULL, 'Sarah', 'Johnson', NULL, '321 Elm St', 'Suite 200', 'Chicago', 'IL', 'USA', '60601', '+1-555-0105', 'Sarah', 'Johnson', NULL, '321 Elm St', 'Suite 200', 'Chicago', 'IL', 'USA', '60601', '+1-555-0105', NOW() - INTERVAL '6 hours', NOW());

-- =====================================================
-- 7. ORDER ITEMS
-- =====================================================
INSERT INTO order_items (id, order_id, product_id, variant_id, name, sku, price, quantity, total, image) VALUES
-- Order 001 items (John Doe - Headphones)
('oi_001', 'order_001', 'prod_001', 'var_001', 'Premium Wireless Headphones', 'WH-001-BLK', 299.99, 1, 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'),

-- Order 002 items (John Doe - Laptop + Keyboard)
('oi_002', 'order_002', 'prod_005', NULL, 'Laptop Pro 15"', 'LP-005', 1299.99, 1, 1299.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'),
('oi_003', 'order_002', 'prod_004', NULL, 'Mechanical Keyboard RGB', 'KB-004', 129.99, 1, 129.99, 'https://images.unsplash.com/photo-1598928424272-9e667f73ed3e?w=400'),

-- Order 003 items (Jane Smith - Smart Watch)
('oi_004', 'order_003', 'prod_002', 'var_004', 'Smart Watch Pro', 'SW-002-42', 449.99, 1, 449.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'),

-- Order 004 items (Mike Wilson - Running Shoes)
('oi_005', 'order_004', 'prod_010', 'var_012', 'Running Shoes Pro', 'RS-010-9', 189.99, 1, 189.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'),

-- Order 005 items (Sarah Johnson - Smart Home Hub)
('oi_006', 'order_005', 'prod_011', NULL, 'Smart Home Hub', 'SH-011', 149.99, 1, 149.99, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400');

-- =====================================================
-- 8. TRANSACTIONS
-- =====================================================
INSERT INTO transactions (id, order_id, gateway, gateway_transaction_id, amount, currency, status, metadata, created_at, updated_at) VALUES
('txn_001', 'order_001', 'stripe', 'ch_1', 323.99, 'USD', 'COMPLETED', '{"payment_method": "card"}', NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days'),
('txn_002', 'order_002', 'stripe', 'ch_2', 701.17, 'USD', 'COMPLETED', '{"payment_method": "card"}', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days'),
('txn_003', 'order_003', 'stripe', 'ch_3', 323.99, 'USD', 'COMPLETED', '{"payment_method": "card"}', NOW() - INTERVAL '1 day', NOW()),
('txn_004', 'order_004', 'stripe', 'ch_4', 215.18, 'USD', 'PENDING', '{"payment_method": "card"}', NOW() - INTERVAL '12 hours', NOW()),
('txn_005', 'order_005', 'stripe', 'ch_5', 161.99, 'USD', 'COMPLETED', '{"payment_method": "card"}', NOW() - INTERVAL '6 hours', NOW());

-- =====================================================
-- 9. REVIEWS
-- =====================================================
INSERT INTO reviews (id, product_id, user_id, rating, title, content, verified, status, created_at, updated_at) VALUES
-- Reviews for Headphones
('rev_001', 'prod_001', 'user_002', 5, 'Amazing sound quality!', 'The sound quality is incredible and the noise cancellation works perfectly. Worth every penny!', true, 'APPROVED', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('rev_002', 'prod_001', 'user_003', 4, 'Great headphones', 'Very comfortable and the battery life is excellent. Only minor issue is they can get a bit warm after long use.', true, 'APPROVED', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),

-- Reviews for Smart Watch
('rev_003', 'prod_002', 'user_003', 5, 'Perfect smartwatch!', 'Love all the features and the battery life is impressive. The health tracking is very accurate.', true, 'APPROVED', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('rev_004', 'prod_002', 'user_004', 4, 'Good but expensive', 'Great features and build quality, but the price is quite high. Still happy with the purchase.', false, 'PENDING', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '12 hours'),

-- Reviews for Running Shoes
('rev_005', 'prod_010', 'user_004', 5, 'Best running shoes!', 'Extremely comfortable and lightweight. Perfect for my daily runs. Highly recommend!', false, 'PENDING', NOW() - INTERVAL '10 hours', NOW() - INTERVAL '10 hours'),

-- Reviews for Smart Home Hub
('rev_006', 'prod_011', 'user_005', 4, 'Great smart home device', 'Easy to set up and works with all my smart devices. The voice assistant is very responsive.', true, 'APPROVED', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '4 hours'),

-- Reviews for Laptop
('rev_007', 'prod_005', 'user_002', 5, 'Powerful and reliable', 'This laptop handles everything I throw at it. The display is gorgeous and the keyboard is comfortable for long typing sessions.', true, 'APPROVED', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),

-- Reviews for Mechanical Keyboard
('rev_008', 'prod_004', 'user_002', 5, 'Perfect for gaming and work', 'The mechanical switches feel amazing and the RGB lighting looks great. Built like a tank!', true, 'APPROVED', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days');

-- =====================================================
-- 10. WISHLIST ITEMS
-- =====================================================
INSERT INTO wishlist_items (id, user_id, product_id, created_at) VALUES
('wi_001', 'user_002', 'prod_003', NOW() - INTERVAL '3 days'),
('wi_002', 'user_002', 'prod_006', NOW() - INTERVAL '5 days'),
('wi_003', 'user_003', 'prod_004', NOW() - INTERVAL '2 days'),
('wi_004', 'user_003', 'prod_009', NOW() - INTERVAL '1 day'),
('wi_005', 'user_004', 'prod_002', NOW() - INTERVAL '4 days'),
('wi_006', 'user_004', 'prod_011', NOW() - INTERVAL '6 hours'),
('wi_007', 'user_005', 'prod_005', NOW() - INTERVAL '2 days'),
('wi_008', 'user_005', 'prod_013', NOW() - INTERVAL '1 day');

-- =====================================================
-- 11. COUPONS
-- =====================================================
INSERT INTO coupons (id, code, name, description, type, value, minimum_amount, maximum_discount, usage_limit, usage_count, start_date, end_date, is_active, created_at, updated_at) VALUES
('cpn_001', 'WELCOME10', 'Welcome Discount', 'Get 10% off your first order', 'PERCENTAGE', 10.00, 50.00, 50.00, 1000, 127, NOW() - INTERVAL '30 days', NOW() + INTERVAL '30 days', true, NOW() - INTERVAL '30 days', NOW()),
('cpn_002', 'FREESHIP', 'Free Shipping', 'Free shipping on orders over $50', 'FIXED_AMOUNT', 9.99, 50.00, 9.99, 5000, 342, NOW() - INTERVAL '15 days', NOW() + INTERVAL '45 days', true, NOW() - INTERVAL '15 days', NOW()),
('cpn_003', 'SAVE25', '25% Off Electronics', 'Save 25% on all electronics', 'PERCENTAGE', 25.00, 100.00, 100.00, 500, 89, NOW() - INTERVAL '7 days', NOW() + INTERVAL '7 days', true, NOW() - INTERVAL '7 days', NOW()),
('cpn_004', 'FLASH50', 'Flash Sale 50% Off', 'Limited time flash sale', 'PERCENTAGE', 50.00, 200.00, 200.00, 100, 23, NOW() - INTERVAL '2 days', NOW() + INTERVAL '2 days', true, NOW() - INTERVAL '2 days', NOW());

-- =====================================================
-- 12. CARTS AND CART ITEMS (for active carts)
-- =====================================================
INSERT INTO carts (id, user_id, created_at, updated_at) VALUES
('cart_001', 'user_002', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes'),
('cart_003', 'user_004', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour'),
('cart_004', 'user_005', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '15 minutes');

INSERT INTO cart_items (id, cart_id, product_id, variant_id, quantity, created_at, updated_at) VALUES
-- John's cart items
('ci_001', 'cart_001', 'prod_009', NULL, 1, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes'),
('ci_002', 'cart_001', 'prod_012', NULL, 2, NOW() - INTERVAL '45 minutes', NOW() - INTERVAL '30 minutes'),

-- Mike's cart items
('ci_003', 'cart_003', 'prod_003', NULL, 1, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour'),
('ci_004', 'cart_003', 'prod_015', NULL, 1, NOW() - INTERVAL '1.5 hours', NOW() - INTERVAL '1 hour'),

-- Sarah's cart items
('ci_005', 'cart_004', 'prod_014', NULL, 1, NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '15 minutes'),
('ci_006', 'cart_004', 'prod_016', NULL, 1, NOW() - INTERVAL '20 minutes', NOW() - INTERVAL '15 minutes');

-- =====================================================
-- SUMMARY OF SAMPLE DATA
-- =====================================================
-- Users: 5 (1 admin, 4 regular users)
-- Categories: 8
-- Products: 17 (across all categories)
-- Product Variants: 15
-- Orders: 5 (various statuses)
-- Order Items: 6
-- Transactions: 5
-- Reviews: 8
-- Wishlist Items: 8
-- Coupons: 4
-- Addresses: 6
-- Active Carts: 3 with 6 cart items

-- This sample data provides a realistic e-commerce environment
-- with various order statuses, product types, and user interactions
-- perfect for testing and demonstration purposes.