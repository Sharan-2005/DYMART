import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { ArrowRight, Zap, Shield, Truck, RotateCcw } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
const Home = () => {
  const featuredProducts = [{
    id: "1",
    name: "Samsung Galaxy S23 Ultra (256 GB) - Phantom Black",
    image: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    originalPrice: 124999,
    salePrice: 89999,
    discount: 28,
    rating: 4.5,
    reviews: 1847
  }, {
    id: "2",
    name: "Apple iPhone 15 Pro (128 GB) - Natural Titanium",
    image: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    originalPrice: 134900,
    salePrice: 119900,
    discount: 11,
    rating: 4.8,
    reviews: 956
  }, {
    id: "3",
    name: "OnePlus 11 5G (128 GB) - Eternal Green",
    image: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    originalPrice: 56999,
    salePrice: 49999,
    discount: 12,
    rating: 4.3,
    reviews: 2341
  }, {
    id: "4",
    name: "Google Pixel 8 Pro (256 GB) - Obsidian",
    image: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    originalPrice: 106999,
    salePrice: 84999,
    discount: 21,
    rating: 4.6,
    reviews: 743
  }, {
    id: "5",
    name: "Xiaomi 13 Pro (256 GB) - Ceramic Black",
    image: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    originalPrice: 79999,
    salePrice: 64999,
    discount: 19,
    rating: 4.4,
    reviews: 1256
  }];
  const categories = [{
    name: "Electronics",
    icon: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    itemCount: 1520
  }, {
    name: "Fashion",
    icon: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    itemCount: 850
  }, {
    name: "Home & Living",
    icon: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    itemCount: 640
  }, {
    name: "Beauty",
    icon: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    itemCount: 480
  }, {
    name: "Groceries",
    icon: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    itemCount: 920
  }, {
    name: "Books",
    icon: "/lovable-uploads/e6013bbc-3b46-4842-84f2-2c7e2ab0ecf7.png",
    itemCount: 380
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
                ⚡ Flash Sale - Limited Time
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Best Deals on
                <br />
                <span className="text-accent">Smart Devices</span>
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Up to 80% OFF on electronics, fashion, and home essentials. 
                Free shipping on orders above ₹999.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-primary">
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  View All Deals
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src={heroBanner} alt="Smart Devices" className="w-full h-auto rounded-lg shadow-2xl" />
              <div className="absolute -bottom-4 -right-4 bg-sale text-sale-foreground p-4 rounded-lg shadow-lg">
                <p className="text-sm font-semibold">Save up to</p>
                <p className="text-2xl font-bold">₹50,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Free Delivery</p>
                <p className="text-xs text-muted-foreground">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-success" />
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-8 h-8 text-warning" />
              <div>
                <p className="font-semibold text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">7-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-sale" />
              <div>
                <p className="font-semibold text-sm">24/7 Support</p>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Button variant="outline" className="hidden sm:flex">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map(category => <CategoryCard key={category.name} name={category.name} icon={category.icon} itemCount={category.itemCount} />)}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Grab the best deal on Smartphones</h2>
              <p className="text-muted-foreground">Latest models with amazing discounts</p>
            </div>
            <Button variant="outline" className="hidden sm:flex">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredProducts.map(product => <ProductCard key={product.id} {...product} />)}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      
    </div>;
};
export default Home;