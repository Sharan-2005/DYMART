import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, LogOut, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.svg";
import { useEffect, useState } from "react";

const Header = () => {
  const { toggleCart, getItemCount } = useCart();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/95 backdrop-blur-lg border border-border/50 rounded-2xl shadow-lg' 
        : 'bg-card/80 backdrop-blur-md border border-border/30 rounded-2xl'
    }`}>
      {/* Main Header */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="DY MART" className="w-8 h-8" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DY MART
            </span>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-6">
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
              About
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground hidden lg:block max-w-20 truncate">
                  {user.email?.split('@')[0]}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut} className="hidden md:flex h-8">
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="hidden md:flex h-8">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
            )}
            
            <Button variant="ghost" size="sm" className="relative h-8 w-8" onClick={toggleCart}>
              <ShoppingCart className="w-4 h-4" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="sm" className="lg:hidden h-8 w-8" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-card/95 backdrop-blur-lg">
          <nav className="px-4 py-3">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/category/electronics" 
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Electronics
              </Link>
              <Link 
                to="/category/fashion" 
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Fashion
              </Link>
              <Link 
                to="/category/home-living" 
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Home & Living
              </Link>
              <Link 
                to="/category/beauty" 
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Beauty
              </Link>
              <Link 
                to="/category/groceries" 
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={closeMobileMenu}
              >
                Groceries
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              
              {/* Mobile Auth Section */}
              {user ? (
                <div className="pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">
                    Welcome, {user.email?.split('@')[0]}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {signOut(); closeMobileMenu();}} 
                    className="w-full justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="pt-3 border-t border-border/50">
                  <Link to="/auth" onClick={closeMobileMenu}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;