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
  ('Groceries', 'groceries', 'https://img.icons8.com/ios-filled/50/grocery-bag.png', 'Fresh groceries and food items');

-- Insert sample products
INSERT INTO public.products (name, description, price, discount_price, image, category_id, stock, is_featured) VALUES
  ('iPhone 14 Pro Max', 'Latest iPhone with advanced camera system', 999.99, 899.99, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 50, true),
  ('MacBook Air M2', 'Powerful laptop for professionals', 1199.99, 1099.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 30, true),
  ('Samsung Galaxy S24', 'Premium Android smartphone', 849.99, 749.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'electronics'), 40, true),
  ('Nike Air Max', 'Comfortable running shoes', 129.99, 99.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 100, false),
  ('Leather Jacket', 'Premium leather jacket', 199.99, 149.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'fashion'), 25, false),
  ('Coffee Maker', 'Automatic coffee brewing machine', 89.99, 69.99, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', (SELECT id FROM categories WHERE slug = 'home-living'), 60, false);