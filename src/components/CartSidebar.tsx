import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeFromCart, getTotal, getItemCount } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Shopping Cart ({getItemCount()})
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center mt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={toggleCart}>Continue Shopping</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-120px)] mt-6">
            {/* Scrollable items area */}
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-primary">
                          ₹{item.product.discount_price || item.product.price}
                        </span>
                        {item.product.discount_price && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{item.product.price}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.product.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Fixed checkout section at bottom */}
            <div className="border-t pt-4 mt-4 bg-background">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{getTotal().toFixed(2)}
                </span>
              </div>
              <Link to="/checkout">
                <Button className="w-full" size="lg" onClick={toggleCart}>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;