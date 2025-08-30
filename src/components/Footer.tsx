import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-white">DY MART</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 text-sm">
              Your one-stop destination for electronics, fashion, home essentials, and groceries. 
              Quality products at unbeatable prices.
            </p>
            <div className="flex space-x-3">
              <Facebook className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Deals</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span className="text-primary-foreground/80">1800-123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-primary-foreground/80">support@dymart.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span className="text-primary-foreground/80">
                  123 Commerce Street<br />
                  Tech City, TC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2024 DY MART. All rights reserved.
          </p>
          <p className="text-primary-foreground/80 text-sm mt-2 md:mt-0">
            Made by <span className="font-semibold text-white">B1 batch</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;