import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeFromCart, getTotal, getItemCount } = useCart();

  const savings = items.reduce((acc, item) => {
    if (item.product.discount_price) {
      acc += (item.product.price - item.product.discount_price) * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[420px] sm:w-[480px] flex flex-col p-0 gap-0 border-l border-slate-100 shadow-2xl">

        {/* ── Header ── */}
        <SheetHeader className="px-6 py-5 border-b border-slate-100 bg-white">
          <SheetTitle className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center shadow-md shadow-sky-200">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[15px] font-700 text-slate-800 tracking-tight leading-tight"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                Your Cart
              </span>
              <span className="text-xs text-slate-400 font-normal leading-tight">
                {getItemCount()} {getItemCount() === 1 ? "item" : "items"}
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* ── Empty State ── */}
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-8">
              <div className="w-20 h-20 rounded-3xl bg-sky-50 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-9 h-9 text-sky-300" />
              </div>
              <p className="text-slate-700 font-semibold text-lg mb-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Nothing here yet
              </p>
              <p className="text-slate-400 text-sm mb-6">
                Add items to your cart and they'll show up here.
              </p>
              <Button
                onClick={toggleCart}
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-6 shadow-md shadow-sky-100 transition-all duration-200"
              >
                Browse Products
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* ── Items list ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50/50"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e8f0 transparent" }}>
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-sky-100 transition-all duration-200 group"
                  >
                    {/* Product image */}
                    <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-[13px] font-semibold text-slate-800 leading-snug line-clamp-2"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-400 hover:bg-rose-50 transition-all duration-150 mt-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-sm font-bold text-sky-600">
                          ₹{(item.product.discount_price || item.product.price).toLocaleString("en-IN")}
                        </span>
                        {item.product.discount_price && (
                          <>
                            <span className="text-xs text-slate-400 line-through">
                              ₹{item.product.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                              {Math.round(((item.product.price - item.product.discount_price) / item.product.price) * 100)}% off
                            </span>
                          </>
                        )}
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-sm text-slate-600 hover:text-sky-600 hover:shadow-md transition-all duration-150 disabled:opacity-40"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-sm text-slate-600 hover:text-sky-600 hover:shadow-md transition-all duration-150"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-slate-700">
                          ₹{((item.product.discount_price || item.product.price) * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Checkout footer ── */}
            <div className="bg-white border-t border-slate-100 px-5 py-5 flex flex-col gap-3">
              {/* Savings pill */}
              {savings > 0 && (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <Tag className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-emerald-700 font-medium">
                    You're saving{" "}
                    <span className="font-bold">₹{savings.toLocaleString("en-IN")}</span> on this order!
                  </span>
                </div>
              )}

              {/* Totals */}
              <div className="flex flex-col gap-2 px-1">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal ({getItemCount()} items)</span>
                  <span className="font-medium text-slate-700">₹{getTotal().toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Delivery</span>
                  <span className="text-emerald-600 font-medium">FREE</span>
                </div>
                <div className="h-px bg-slate-100 my-1" />
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-slate-800"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Total
                  </span>
                  <span className="text-2xl font-bold text-sky-600"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    ₹{getTotal().toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Link to="/checkout" onClick={toggleCart} className="block">
                <button
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-white text-[15px] transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
                    boxShadow: "0 4px 20px rgba(14,165,233,0.4)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 28px rgba(14,165,233,0.55)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(14,165,233,0.4)")}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <button
                onClick={toggleCart}
                className="w-full py-2.5 rounded-2xl text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-150"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;