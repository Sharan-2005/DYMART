import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Menu, LogOut, X, Search, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.svg";
import { useEffect, useState, useRef } from "react";

const NAV_LINKS = [
  { label: "Electronics",   href: "/category/electronics" },
  { label: "Fashion",       href: "/category/fashion"     },
  { label: "Home & Living", href: "/category/home-living" },
  { label: "Beauty",        href: "/category/beauty"      },
  { label: "Groceries",     href: "/category/groceries"   },
  { label: "About",         href: "/about"                },
];

const Header = () => {
  const { toggleCart, getItemCount } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen,       setSearchOpen]       = useState(false);
  const [searchQuery,      setSearchQuery]      = useState("");
  const [userMenuOpen,     setUserMenuOpen]     = useState(false);
  const [cartBump,         setCartBump]         = useState(false);
  const prevCountRef   = useRef(getItemCount());
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const current = getItemCount();
    if (current > prevCountRef.current) {
      setCartBump(true);
      setTimeout(() => setCartBump(false), 400);
    }
    prevCountRef.current = current;
  }, [getItemCount()]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        .dymart-hdr, .dymart-hdr * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        @keyframes cart-bump {
          0%   { transform: scale(1)    rotate(0deg);   }
          30%  { transform: scale(1.35) rotate(-10deg); }
          65%  { transform: scale(1.12) rotate(5deg);   }
          100% { transform: scale(1)    rotate(0deg);   }
        }
        .cart-bump { animation: cart-bump 0.38s cubic-bezier(0.36,0.07,0.19,0.97) both; }

        @keyframes fade-slide-down {
          from { opacity:0; transform:translateY(-6px) scale(.97); }
          to   { opacity:1; transform:translateY(0)    scale(1);   }
        }
        .fade-slide-down { animation: fade-slide-down .18s ease forwards; }

        /* Nav links — always dark, readable over any background */
        .nav-lnk {
          position: relative;
          font-size: 13.5px; font-weight: 500; color: #1e293b;
          text-decoration: none; padding: 5px 11px; border-radius: 9px;
          transition: color 160ms, background 160ms; white-space: nowrap;
        }
        .nav-lnk:hover  { color: #0284c7; background: rgba(14,165,233,.09); }
        .nav-lnk.active { color: #0284c7; font-weight: 600; background: rgba(14,165,233,.12); }
        .nav-lnk.active::after {
          content: ''; position: absolute; bottom: 1px; left: 50%;
          transform: translateX(-50%);
          width: 14px; height: 2.5px; background: #0ea5e9; border-radius: 99px;
        }

        .drop-btn {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 8px 10px; border-radius: 9px;
          border: none; background: none; cursor: pointer;
          font-size: 13.5px; font-weight: 500; color: #334155;
          text-decoration: none; text-align: left;
          transition: background 130ms;
        }
        .drop-btn:hover { background: #f1f5f9; }

        .hdr-icon {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid #e2e8f0; background: white;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 160ms ease;
          flex-shrink: 0; position: relative;
        }
        .hdr-icon:hover {
          border-color: #7dd3fc;
          box-shadow: 0 3px 12px rgba(14,165,233,.15);
          transform: translateY(-1px);
        }

        .search-wrap:focus-within {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 0 3px rgba(56,189,248,.2) !important;
        }
        .search-inp { border: none; background: transparent; outline: none; }
        .search-inp::placeholder { color: #94a3b8; }
      `}</style>

      <header
        className={`dymart-hdr fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 ${
          isScrolled
            ? "bg-white border border-slate-200 rounded-2xl shadow-xl"
            : "bg-white border border-slate-200/70 rounded-2xl shadow-lg"
        }`}
      >
        {/* ── Main row ── */}
        <div className="px-4 py-2.5 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 no-underline">
            <div className="relative">
              <div
                className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                style={{
                  background: "linear-gradient(145deg,#38bdf8 0%,#0284c7 100%)",
                  boxShadow: "0 4px 12px rgba(14,165,233,.4), inset 0 1px 0 rgba(255,255,255,.25)",
                }}
              >
                <img src={logo} alt="DY MART" className="w-4 h-4 brightness-0 invert" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-400 border-2 border-white" />
            </div>
            <div className="leading-none">
              <div className="text-[16px] font-extrabold tracking-[-0.04em] text-slate-900">
                DY<span className="text-sky-500">MART</span>
              </div>
              <div className="text-[8px] font-medium tracking-[0.14em] text-slate-400 uppercase mt-0.5">
                Shop Everything
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-lnk ${isActive(link.href) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">

            {/* Search */}
            <button
              className="hdr-icon"
              onClick={() => setSearchOpen(v => !v)}
              aria-label="Toggle search"
            >
              {searchOpen
                ? <X size={15} className="text-slate-500" />
                : <Search size={15} className="text-slate-500" />
              }
            </button>

            {/* User */}
            {user ? (
              <div className="relative">
                {/* Desktop chip */}
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="hidden md:inline-flex items-center gap-1.5 h-9 pl-2 pr-2.5 rounded-[10px] border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md hover:shadow-sky-50 hover:-translate-y-px transition-all duration-150 cursor-pointer"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold"
                    style={{ background: "linear-gradient(135deg,#38bdf8,#0284c7)" }}
                  >
                    {(user.email?.[0] ?? "U").toUpperCase()}
                  </div>
                  <span className="text-[12.5px] font-medium text-slate-700 max-w-[68px] truncate">
                    {user.email?.split("@")[0]}
                  </span>
                  <ChevronDown
                    size={12}
                    className="text-slate-400 transition-transform duration-200"
                    style={{ transform: userMenuOpen ? "rotate(180deg)" : "rotate(0)" }}
                  />
                </button>

                {/* Mobile icon */}
                <button className="hdr-icon md:hidden" onClick={() => setUserMenuOpen(v => !v)}>
                  <User size={15} className="text-slate-600" />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div
                    className="fade-slide-down absolute top-[calc(100%+10px)] right-0 min-w-[210px] bg-white rounded-2xl border border-slate-100 z-50"
                    style={{ boxShadow: "0 16px 48px rgba(0,0,0,.12), 0 4px 12px rgba(0,0,0,.05)" }}
                  >
                    <div className="px-3.5 pt-3 pb-2.5 border-b border-slate-100">
                      <p className="text-[11px] text-slate-400 mb-0.5">Signed in as</p>
                      <p className="text-[13px] font-semibold text-slate-800 truncate">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link to="/orders"  className="drop-btn" onClick={() => setUserMenuOpen(false)}>📦 My Orders</Link>
                      <Link to="/profile" className="drop-btn" onClick={() => setUserMenuOpen(false)}>👤 Profile</Link>
                      <button
                        className="drop-btn"
                        style={{ color: "#f43f5e" }}
                        onClick={() => { signOut(); setUserMenuOpen(false); }}
                      >
                        🚪 Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="hidden md:block no-underline">
                <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-[10px] border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md hover:shadow-sky-50 hover:-translate-y-px text-[13px] font-medium text-slate-700 transition-all duration-150 cursor-pointer">
                  <User size={14} className="text-slate-500" />
                  Sign In
                </button>
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative w-9 h-9 rounded-[10px] flex items-center justify-center hover:-translate-y-px hover:shadow-lg hover:shadow-sky-200 transition-all duration-150 cursor-pointer"
              style={{
                background: "linear-gradient(135deg,#38bdf8 0%,#0284c7 100%)",
                boxShadow: "0 4px 14px rgba(14,165,233,.4)",
              }}
              aria-label="Open cart"
            >
              <span className={cartBump ? "cart-bump" : ""} style={{ display: "inline-flex" }}>
                <ShoppingBag size={16} color="white" strokeWidth={2.2} />
              </span>
              {getItemCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-rose-400 text-white text-[10px] font-bold flex items-center justify-center px-0.5 border-2 border-white">
                  {getItemCount() > 9 ? "9+" : getItemCount()}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden w-9 h-9 rounded-[10px] border border-slate-200 bg-white p-0 hover:bg-slate-50"
              onClick={() => setIsMobileMenuOpen(v => !v)}
            >
              {isMobileMenuOpen
                ? <X    size={16} className="text-slate-600" />
                : <Menu size={16} className="text-slate-600" />
              }
            </Button>
          </div>
        </div>

        {/* ── Search bar (slide down) ── */}
        <div
          className="overflow-hidden transition-all duration-[240ms]"
          style={{ maxHeight: searchOpen ? 80 : 0 }}
        >
          <div className="px-4 pb-3 pt-1 border-t border-slate-100 bg-slate-50/50">
            <form onSubmit={handleSearch}>
              <div
                className="search-wrap flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 mx-auto transition-all duration-[160ms]"
                style={{ maxWidth: 560, boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
              >
                <Search size={14} className="text-slate-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === "Escape" && (setSearchOpen(false), setSearchQuery(""))}
                  placeholder="Search products, brands and more…"
                  className="search-inp flex-1 text-sm text-slate-800"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors shrink-0"
                  >
                    <X size={9} className="text-slate-500" />
                  </button>
                )}
                <button
                  type="submit"
                  className="h-7 px-3 rounded-lg text-[12px] font-semibold text-white transition-all duration-150 shrink-0"
                  style={{
                    background: searchQuery.trim()
                      ? "linear-gradient(135deg,#38bdf8,#0284c7)"
                      : "#e2e8f0",
                    color: searchQuery.trim() ? "white" : "#94a3b8",
                    cursor: searchQuery.trim() ? "pointer" : "default",
                  }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white rounded-b-2xl">
            <nav className="px-3 py-2.5 flex flex-col gap-0.5">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[14px] font-medium py-2.5 px-3 rounded-xl transition-colors no-underline ${
                    isActive(link.href)
                      ? "text-sky-600 bg-sky-50 font-semibold"
                      : "text-slate-700 hover:text-sky-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 mt-1 border-t border-slate-100">
                {user ? (
                  <>
                    <p className="text-[11px] text-slate-400 px-3 pt-1 pb-1">
                      Signed in as <span className="font-semibold text-slate-600">{user.email?.split("@")[0]}</span>
                    </p>
                    <button
                      onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-2 w-full text-left text-[13.5px] font-medium text-rose-500 py-2.5 px-3 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="flex items-center gap-2 w-full text-left text-[13.5px] font-medium text-slate-600 py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border-none bg-transparent">
                      <User size={14} /> Sign In
                    </button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;