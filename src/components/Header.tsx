import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {
  return <header className="bg-card border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DY MART
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input placeholder="Search essentials, groceries and more..." className="pl-10 pr-4 py-3 rounded-lg border-2 focus:border-primary" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="w-5 h-5 mr-2" />
              Sign In
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-sale text-sale-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-3 space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Electronics
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Fashion
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home & Living
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Beauty
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Groceries
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </nav>
    </header>;
};
export default Header;