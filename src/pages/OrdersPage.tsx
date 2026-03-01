import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import {
  Package, ChevronDown, ChevronUp, ShoppingBag,
  Clock, CheckCircle, Truck, XCircle, ArrowLeft, RotateCcw
} from "lucide-react";

type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: { name: string; image: string } | null;
}

interface Order {
  id: string;
  created_at: string;
  status: OrderStatus;
  total_amount: number;
  order_items: OrderItem[];
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending:   { label: "Pending",   color: "#d97706", bg: "#fef3c7", icon: <Clock       size={13} /> },
  confirmed: { label: "Confirmed", color: "#0284c7", bg: "#e0f2fe", icon: <CheckCircle size={13} /> },
  shipped:   { label: "Shipped",   color: "#7c3aed", bg: "#ede9fe", icon: <Truck       size={13} /> },
  delivered: { label: "Delivered", color: "#059669", bg: "#d1fae5", icon: <CheckCircle size={13} /> },
  cancelled: { label: "Cancelled", color: "#dc2626", bg: "#fee2e2", icon: <XCircle     size={13} /> },
};

const STEPS: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered"];

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders,     setOrders]     = useState<Order[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [expanded,   setExpanded]   = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => { if (user) fetchOrders(); }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    // Cast to `any` because Supabase's auto-generated types don't include
    // the new `orders` / `order_items` tables until you regenerate types.
    // Run: npx supabase gen types typescript --project-id <your-id> > src/integrations/supabase/types.ts
    const { data, error: err } = await (supabase as any)
      .from("orders")
      .select(`
        id,
        created_at,
        status,
        total_amount,
        order_items (
          id,
          quantity,
          price,
          product:products ( name, image )
        )
      `)
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });

    if (err) setError(err.message);
    else setOrders((data ?? []) as unknown as Order[]);
    setLoading(false);
  };

  const cancelOrder = async (orderId: string) => {
    setCancelling(orderId);
    const { error: err } = await (supabase as any)
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", orderId)
      .eq("user_id", user!.id);

    if (!err)
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "cancelled" } : o));
    setCancelling(null);
  };

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  if (loading) return (
    <div style={pageStyle}>
      <style>{css}</style>
      <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8" }}>
        <div style={spinnerStyle} /><p style={{ marginTop: 16, fontSize: 14 }}>Loading your orders…</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={pageStyle}>
      <style>{css}</style>
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: "#fff5f5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <XCircle size={28} color="#f43f5e" />
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>Something went wrong</h2>
        <p style={{ color: "#64748b", fontSize: 13, margin: "0 auto 20px", maxWidth: 380 }}>{error}</p>
        <button onClick={fetchOrders} style={primaryBtn}>
          <RotateCcw size={14} /> Try Again
        </button>
      </div>
    </div>
  );

  if (orders.length === 0) return (
    <div style={pageStyle}>
      <style>{css}</style>
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: "#f0f9ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <ShoppingBag size={36} color="#7dd3fc" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>No orders yet</h2>
        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>You haven't placed any orders. Start shopping!</p>
        <Link to="/" style={primaryBtn}><ShoppingBag size={15} /> Browse Products</Link>
      </div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <style>{css}</style>

      <div style={{ marginBottom: 28 }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#64748b", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#38bdf8,#0284c7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(14,165,233,.3)" }}>
            <Package size={18} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.03em" }}>My Orders</h1>
            <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {orders.map(order => {
          const cfg       = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
          const isOpen    = expanded === order.id;
          const canCancel = order.status === "pending" || order.status === "confirmed";
          const stepIdx   = STEPS.indexOf(order.status);

          return (
            <div key={order.id} style={cardStyle}>
              {/* Header */}
              <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, margin: "0 0 3px" }}>
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>{fmt(order.created_at)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 99, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>
                    {cfg.icon} {cfg.label}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                    ₹{Number(order.total_amount).toLocaleString("en-IN")}
                  </span>
                  <button onClick={() => setExpanded(isOpen ? null : order.id)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e2e8f0", background: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b" }}>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Progress tracker */}
              {order.status !== "cancelled" && (
                <div style={{ padding: "4px 20px 16px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {STEPS.map((step, i) => {
                      const done = i <= stepIdx;
                      return (
                        <div key={step} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <div style={{ width: 26, height: 26, borderRadius: "50%", background: done ? "linear-gradient(135deg,#38bdf8,#0284c7)" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: done ? "0 2px 8px rgba(14,165,233,.3)" : "none" }}>
                              {done ? <CheckCircle size={13} color="white" /> : <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#cbd5e1" }} />}
                            </div>
                            <span style={{ fontSize: 10, whiteSpace: "nowrap", color: done ? "#0284c7" : "#94a3b8", fontWeight: done ? 600 : 400 }}>
                              {STATUS_CONFIG[step].label}
                            </span>
                          </div>
                          {i < STEPS.length - 1 && (
                            <div style={{ flex: 1, height: 2, margin: "0 4px", marginBottom: 16, background: i < stepIdx ? "linear-gradient(90deg,#38bdf8,#0284c7)" : "#f1f5f9", borderRadius: 99 }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Expanded items */}
              {isOpen && (
                <div style={{ padding: "16px 20px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
                    Items in this order
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                    {(order.order_items ?? []).map(item => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "#f8fafc", borderRadius: 12, border: "1px solid #f1f5f9" }}>
                        {item.product?.image && (
                          <img src={item.product.image} alt={item.product?.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", background: "#e2e8f0", flexShrink: 0 }} />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.product?.name ?? "Product"}
                          </p>
                          <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>Qty: {item.quantity}</p>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#0284c7", flexShrink: 0 }}>
                          ₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
                    <div>
                      {canCancel && (
                        <button onClick={() => cancelOrder(order.id)} disabled={cancelling === order.id} style={{ ...dangerBtn, opacity: cancelling === order.id ? 0.6 : 1 }}>
                          {cancelling === order.id ? <RotateCcw size={13} style={{ animation: "spin 1s linear infinite" }} /> : <XCircle size={13} />}
                          {cancelling === order.id ? "Cancelling…" : "Cancel Order"}
                        </button>
                      )}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 2px" }}>Order Total</p>
                      <p style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: 0 }}>
                        ₹{Number(order.total_amount).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
  @keyframes spin { to { transform: rotate(360deg); } }
`;
const pageStyle:   React.CSSProperties = { maxWidth: 720, margin: "0 auto", padding: "100px 20px 60px", fontFamily: "'DM Sans',sans-serif" };
const cardStyle:   React.CSSProperties = { background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,.05)" };
const primaryBtn:  React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, background: "linear-gradient(135deg,#38bdf8,#0284c7)", color: "white", textDecoration: "none", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(14,165,233,.35)", fontFamily: "'DM Sans',sans-serif" };
const dangerBtn:   React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "1px solid #fecaca", background: "#fff5f5", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#dc2626", fontFamily: "'DM Sans',sans-serif" };
const spinnerStyle:React.CSSProperties = { width: 36, height: 36, border: "3px solid #e2e8f0", borderTopColor: "#38bdf8", borderRadius: "50%", margin: "0 auto", animation: "spin 0.8s linear infinite" };