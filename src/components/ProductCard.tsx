import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  rating: number;
  reviews: number;
}

const ProductCard = ({ 
  id, 
  name, 
  image, 
  originalPrice, 
  salePrice, 
  discount, 
  rating, 
  reviews 
}: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-2 left-2 bg-sale text-sale-foreground">
          {discount}% OFF
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-sm font-medium ml-1">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">₹{salePrice.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground line-through">₹{originalPrice.toLocaleString()}</span>
        </div>
        
        <Button className="w-full bg-gradient-primary hover:bg-primary-hover" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;