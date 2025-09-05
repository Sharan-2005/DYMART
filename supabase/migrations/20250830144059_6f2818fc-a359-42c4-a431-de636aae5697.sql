-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  discount_price DECIMAL(10,2),
  image TEXT,
  category_id UUID REFERENCES public.categories(id),
  stock INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart_items table for persistent cart
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Categories and products are publicly readable
CREATE POLICY "Categories are publicly readable" 
ON public.categories 
FOR SELECT 
TO public
USING (true);

CREATE POLICY "Products are publicly readable" 
ON public.products 
FOR SELECT 
TO public
USING (true);

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

-- Cart policies
CREATE POLICY "Users can view their own cart items" 
ON public.cart_items 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own cart items" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own cart items" 
ON public.cart_items 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own cart items" 
ON public.cart_items 
FOR DELETE 
USING (auth.uid()::text = user_id::text);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.categories (name, slug, icon, description) VALUES
  ('Electronics', 'electronics', 'https://img.icons8.com/ios-filled/50/laptop.png', 'Latest gadgets and electronics'),
  ('Fashion', 'fashion', 'https://img.icons8.com/ios-filled/50/clothes.png', 'Trendy fashion and apparel'),
  ('Home & Living', 'home-living', 'https://img.icons8.com/ios-filled/50/home.png', 'Home essentials and decor'),
  ('Beauty', 'beauty', 'https://img.icons8.com/ios-filled/50/cosmetics.png', 'Beauty and personal care'),
  ('Groceries', 'groceries', 'https://img.icons8.com/ios-filled/50/shopping-cart.png', 'Fresh groceries and food items');

-- Insert sample products (Prices converted to INR: 1 USD ≈ 83 INR)
INSERT INTO public.products (name, description, price, discount_price, image, category_id, stock, is_featured) VALUES

-- ELECTRONICS CATEGORY
('iPhone 14 Pro Max', 'Latest iPhone with advanced camera system', 82999.00, 74699.00, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 50, true),

('MacBook Air M2', 'Powerful laptop for professionals', 99599.00, 91217.00, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 30, true),

('Samsung Galaxy S24', 'Premium Android smartphone', 70549.00, 62217.00, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 40, true),

('iPad Pro 12.9"', 'Professional tablet with M2 chip', 91134.00, 82321.00, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 35, false),

('Sony WH-1000XM4', 'Wireless noise canceling headphones', 24900.00, 20749.00, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 80, true),

('Dell XPS 13', 'Ultra-portable laptop', 74599.00, 66349.00, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 25, false),

('Apple Watch Series 9', 'Advanced fitness and health tracking', 33199.00, 29049.00, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 60, true),

('OnePlus 11', 'Flagship Android smartphone', 49799.00, 41499.00, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 70, false),

('Nintendo Switch OLED', 'Portable gaming console', 29049.00, 24899.00, 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 45, false),

('AirPods Pro (2nd Gen)', 'Premium wireless earbuds', 20749.00, 16599.00, 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 100, true),

-- FASHION CATEGORY
('Nike Air Max', 'Comfortable running shoes', 10789.00, 8299.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 100, false),

('Leather Jacket', 'Premium leather jacket', 16599.00, 12449.00, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 25, false),

('Levi''s 501 Jeans', 'Classic straight-fit denim', 4149.00, 3319.00, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 150, true),

('Adidas Ultraboost 22', 'Performance running shoes', 12449.00, 9959.00, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 80, false),

('Cotton Casual T-Shirt', 'Comfortable everyday wear', 1659.00, 1249.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 200, false),

('Formal Blazer', 'Professional business attire', 8299.00, 6639.00, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 40, false),

('Designer Handbag', 'Luxury leather handbag', 20749.00, 16599.00, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 30, true),

('Silk Saree', 'Traditional Indian ethnic wear', 12449.00, 9959.00, 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 50, true),

('Kurta Set', 'Comfortable ethnic wear for men', 4149.00, 3319.00, 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 75, false),

('Designer Watch', 'Luxury timepiece', 41499.00, 33199.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 20, true),

-- HOME & LIVING CATEGORY
('Coffee Maker', 'Automatic coffee brewing machine', 7469.00, 5809.00, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 60, false),

('Smart LED TV 55"', 'Ultra HD 4K television', 49799.00, 41499.00, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 25, true),

('Ergonomic Office Chair', 'Comfortable work-from-home chair', 16599.00, 12449.00, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 40, false),

('Air Purifier', 'HEPA filter air cleaning system', 20749.00, 16599.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 35, true),

('Dining Table Set', '6-seater wooden dining set', 33199.00, 24899.00, 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 15, false),

('Robot Vacuum', 'Smart automated cleaning', 24899.00, 20749.00, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 30, true),

('Memory Foam Mattress', 'Queen size comfortable mattress', 29049.00, 24899.00, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 20, false),

('Smart Doorbell', 'Video doorbell with app control', 12449.00, 9959.00, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 50, false),

('Kitchen Mixer Grinder', 'Multi-purpose food processor', 8299.00, 6639.00, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 80, false),

('Decorative Plant Set', 'Indoor plants for home decor', 4149.00, 3319.00, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 100, false),

-- BEAUTY CATEGORY
('Skincare Set', 'Complete facial care routine', 8299.00, 6639.00, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'beauty'), 70, true),

('Makeup Palette', 'Professional eyeshadow collection', 4149.00, 3319.00, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'beauty'), 90, false),

('Hair Dryer Professional', 'Salon-grade styling tool', 12449.00, 9959.00, 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'beauty'), 45, false),

('Perfume Collection', 'Luxury fragrance set', 16599.00, 12449.00, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'beauty'), 60, true),

('Electric Toothbrush', 'Advanced oral care system', 6639.00, 4979.00, 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'beauty'), 80, false),

('Face Serum Anti-Aging', 'Premium skincare treatment', 4979.00, 3734.00, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'beauty'), 120, true),

('Hair Styling Kit', 'Complete hair care solution', 9959.00, 7469.00, 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'beauty'), 55, false),

('Nail Care Set', 'Professional manicure kit', 3319.00, 2489.00, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'beauty'), 100, false),

('Moisturizer Cream', 'Daily hydrating skincare', 2489.00, 1989.00, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'beauty'), 150, false),

('Makeup Brush Set', 'Professional cosmetic brushes', 4149.00, 3319.00, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'beauty'), 85, false),

-- GROCERIES CATEGORY
('Organic Rice (5kg)', 'Premium basmati rice', 1659.00, 1329.00, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'groceries'), 200, true),

('Fresh Fruits Basket', 'Seasonal mixed fruit collection', 2489.00, 1989.00, 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'groceries'), 150, true),

('Cooking Oil (2L)', 'Refined sunflower oil', 829.00, 664.00, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'groceries'), 300, false),

('Protein Powder', 'Whey protein supplement', 4149.00, 3319.00, 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'groceries'), 80, false),

('Organic Honey (1kg)', 'Pure natural honey', 1659.00, 1329.00, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'groceries'), 100, true),

('Mixed Nuts (500g)', 'Premium dry fruits collection', 2489.00, 1989.00, 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'groceries'), 120, false),

('Green Tea Pack', 'Organic loose leaf tea', 1249.00, 999.00, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'groceries'), 180, false),

('Whole Wheat Flour (10kg)', 'Chakki ground atta', 1989.00, 1659.00, 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'groceries'), 250, false),

('Spice Collection', 'Essential Indian masala set', 3319.00, 2489.00, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'groceries'), 90, true),

('Frozen Vegetables (1kg)', 'Mixed vegetable pack', 829.00, 664.00, 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'groceries'), 200, false);