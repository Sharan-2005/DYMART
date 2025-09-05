import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
}

const ProductCard = ({ id, name, price, discountPrice, image, rating }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      discount_price: discountPrice,
      image
    });
  };

  const discount = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

  // Format price in Indian Rupees
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="group hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-sale text-sale-foreground">
            {discount}% OFF
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">
            {formatINR(discountPrice || price)}
          </span>
          {discountPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatINR(price)}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full" 
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;