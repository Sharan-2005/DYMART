import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Menu, Heart, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.svg";
import { useEffect, useState } from "react";

const Header = () => {
  const { toggleCart, getItemCount } = useCart();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/95 backdrop-blur-lg border border-border/50 rounded-2xl shadow-lg' 
        : 'bg-card/80 backdrop-blur-md border border-border/30 rounded-2xl'
    }`}>
      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="DY MART" className="w-10 h-10" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DY MART
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search essentials, groceries and more..." 
                className="pl-10 pr-4 py-3 rounded-full border-2 focus:border-primary bg-background/50 backdrop-blur-sm" 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden md:block">
                  Welcome, {user.email?.split('@')[0]}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut} className="hidden md:flex">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <User className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
            
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-sale text-sale-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>
            
            <Button variant="ghost" size="sm" className="relative" onClick={toggleCart}>
              <ShoppingCart className="w-5 h-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center space-x-8">
            <Link to="/category/electronics" className="text-sm font-medium hover:text-primary transition-colors">
              Electronics
            </Link>
            <Link to="/category/fashion" className="text-sm font-medium hover:text-primary transition-colors">
              Fashion
            </Link>
            <Link to="/category/home-living" className="text-sm font-medium hover:text-primary transition-colors">
              Home & Living
            </Link>
            <Link to="/category/beauty" className="text-sm font-medium hover:text-primary transition-colors">
              Beauty
            </Link>
            <Link to="/category/groceries" className="text-sm font-medium hover:text-primary transition-colors">
              Groceries
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;