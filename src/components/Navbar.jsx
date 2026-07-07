import { useState, useRef } from "react";
import Logo from "../assets/image-BxWquH4V.png";
import { useCategories } from "../context/ProductContext";
import { Link } from "react-router-dom";

const navItems = [
    {
        label: "Home",
        href: "/",
        dropdown: [
            { label: "About Us", href: "#" },
            { label: "Our Story", href: "#" },
            { label: "Contact Us", href: "#" },
        ],
    },
    { label: "NEW ARRIVALS", href: "#", highlight: "new" },
    { label: "Best Sellers", href: "#" },
    { label: "Styles under ₹5999", href: "#" },
    {
        label: "Shop By Category",
        href: "#",
        mega: true,
    },
];

const announcements = [
    "🎁 Free Gift Worth ₹2,999 on Orders Above ₹7,999",
    "✨ 50,000+ Happy Customers",
    "🚚 Free Shipping in India | Worldwide Delivery",
    "💳 COD Available",
    "🎁 Free Gift Worth ₹4,999 on Orders Above ₹11,999",
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMobile, setOpenMobile] = useState(null);
    const [activeNav, setActiveNav] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const timeoutRef = useRef(null);
    const { categories, loading: categoriesLoading } = useCategories();

    const handleMouseEnter = (label) => {
        clearTimeout(timeoutRef.current);
        setActiveNav(label);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setActiveNav(null), 180);
    };

    return (
        <>
            <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 32s linear infinite; }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        .fade-down { animation: fadeDown 0.18s ease forwards; }
        .nav-link::after {
          content:''; display:block; height:2px; width:0;
          background:#be123c; transition: width 0.25s ease;
          position:absolute; bottom:-1px; left:50%; transform:translateX(-50%);
        }
        .nav-link:hover::after, .nav-link.active::after { width:100%; }
      `}</style>

            {/* ── ANNOUNCEMENT BAR ── */}
            <div className="bg-stone-900 text-white text-xs py-2 overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap gap-20">
                    {[...announcements, ...announcements].map((a, i) => (
                        <span key={i} className="tracking-widest uppercase font-medium">
                            <span className="mx-6 text-amber-400/50">◆</span>
                            {a}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── MAIN HEADER ── */}
            <header
                className={`bg-white shadow-sm ${mobileOpen ? "hidden" : "sticky top-0 z-100"
                    }`}
            >
                {/* ── TOP ROW ── */}
                <div className="border-b border-stone-100">
                    <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 h-24">

                        {/* Logo */}
                        <a href="/" className="flex-shrink-0">
                            <img src={Logo} alt="Husnya Fashion House"
                                className="h-18 object-contain mt-1"
                            />
                        </a>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-6">
                            {navItems.map((item) => {
                                const hasPanel = Boolean(item.dropdown || item.mega);
                                const isActive = activeNav === item.label;

                                return (
                                    <div
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={() => hasPanel && handleMouseEnter(item.label)}
                                        onMouseLeave={() => hasPanel && handleMouseLeave()}
                                    >
                                        <a
                                            href={item.href}
                                            className={`nav-link relative flex items-center gap-1 py-8 text-[13px] font-semibold uppercase tracking-wide whitespace-nowrap transition
                                                ${isActive ? "active" : ""}
                                                ${item.highlight === "sale"
                                                    ? "text-rose-600"
                                                    : item.highlight === "new"
                                                        ? "text-emerald-600"
                                                        : "text-stone-700 hover:text-rose-700"
                                                }`}
                                        >
                                            {item.label}
                                            {hasPanel && (
                                                <svg
                                                    className={`w-3 h-3 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                        </a>

                                        {/* Simple dropdown */}
                                        {item.dropdown && isActive && (
                                            <div className="fade-down absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                                                <div className="bg-white rounded-xl shadow-xl border border-stone-100 py-2 min-w-[200px]">
                                                    {item.dropdown.map((d) => (
                                                        <a
                                                            key={d.label}
                                                            href={d.href}
                                                            className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-stone-600 hover:text-rose-700 hover:bg-rose-50 transition whitespace-nowrap"
                                                        >
                                                            <span className="w-1 h-1 rounded-full bg-amber-400" />
                                                            {d.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Mega menu — real categories from ProductContext */}
                                        {item.mega && isActive && (
                                            <div className="fade-down absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                                                <div className="bg-white rounded-xl shadow-xl border border-stone-100 p-8 w-[520px]">
                                                    <div className="text-[11px] font-black uppercase tracking-widest text-amber-600 mb-4 pb-2 border-b border-stone-100">
                                                        Shop By Category
                                                    </div>

                                                    {categoriesLoading ? (
                                                        <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                                                            {Array.from({ length: 6 }).map((_, i) => (
                                                                <span key={i} className="h-3 w-20 rounded bg-stone-100 animate-pulse" />
                                                            ))}
                                                        </div>
                                                    ) : categories.length === 0 ? (
                                                        <div className="text-[13px] text-stone-400 py-4 text-center">
                                                            No categories available
                                                        </div>
                                                    ) : (
                                                        <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                                                            {categories.map((cat) => (
                                                                <a
                                                                    key={cat._id}
                                                                    to={`/category/${cat.slug || cat._id}`}
                                                                    className="flex items-center gap-2 text-[13px] font-medium text-stone-600 hover:text-rose-700 transition"
                                                                >
                                                                    <span className="w-1 h-1 rounded-full bg-rose-300 flex-shrink-0" />
                                                                    <span className="truncate">{cat.name}</span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <a
                                                        href="/products"
                                                        className="block mt-5 pt-4 border-t border-stone-100 text-center text-[12px] font-bold text-rose-700 hover:text-rose-800 uppercase tracking-widest transition"
                                                    >
                                                        Shop All Products →
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Icons */}
                        <div className="hidden lg:flex items-center gap-3">
                            <button
                                className="p-2"
                                onClick={() => setSearchOpen((s) => !s)}
                                aria-label="Toggle search"
                            >
                                🔍
                            </button>

                            <button className="p-2">
                                👤
                            </button>

                            <button className="p-2">
                                ♡
                            </button>

                            <button className="relative p-2">
                                🛒
                                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                    0
                                </span>
                            </button>
                        </div>
                        {/* Mobile Icons + Hamburger — shown only on mobile */}
                        <div className="flex lg:hidden items-center gap-1">
                            <button className="p-2 text-stone-600 text-lg">♡</button>
                            <button className="relative p-2 text-stone-600 text-lg">
                                🛒
                                <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
                            </button>
                            <button
                                onClick={() => setMobileOpen(true)}
                                className="p-2 text-stone-700 hover:text-rose-700 transition"
                                aria-label="Open menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── DESKTOP SEARCH BAR ── */}
                {searchOpen && (
                    <div className="hidden lg:block border-b border-stone-100 bg-stone-50 fade-down">
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-sm border border-stone-200 focus-within:ring-1 focus-within:ring-rose-300 transition max-w-xl mx-auto">
                                <svg className="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                </svg>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search suits, kurtis…"
                                    className="bg-transparent text-sm outline-none flex-1 text-stone-600 placeholder-stone-400"
                                />
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="text-stone-400 hover:text-rose-700 transition flex-shrink-0"
                                    aria-label="Close search"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* ── MOBILE DRAWER ── */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-40 flex">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <div className="relative bg-white w-80 max-w-full h-full overflow-y-auto shadow-2xl flex flex-col">

                        {/* Drawer Header with real logo */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50">
                            <div className="flex items-center gap-3">
                                <img
                                    src={Logo}
                                    alt="Husnya"
                                    className="h-10 object-contain"
                                />
                                <div>
                                    <div className="text-base font-bold text-stone-800 font-serif tracking-tight">HUSNYĀ</div>
                                    <div className="text-[10px] text-amber-600 uppercase tracking-widest font-semibold">Fashion House</div>
                                </div>
                            </div>
                            <button onClick={() => setMobileOpen(false)} className="p-1.5 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-full transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Search */}
                        <div className="px-5 py-3 border-b border-stone-100">
                            <div className="flex items-center gap-2 bg-stone-100 rounded-full px-4 py-2.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-rose-300 transition">
                                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                </svg>
                                <input type="text" placeholder="Search suits, kurtis…" className="bg-transparent text-sm outline-none flex-1 text-stone-600 placeholder-stone-400" />
                            </div>
                        </div>

                        {/* Nav Links */}
                        <nav className="flex-1 py-2 divide-y divide-stone-50">
                            {navItems.map((item) => (
                                <div key={item.label}>
                                    <button
                                        className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-left transition
                      ${item.highlight === "sale" ? "text-rose-600" :
                                                item.highlight === "new" ? "text-emerald-600" :
                                                    "text-stone-700 hover:text-rose-700 hover:bg-rose-50"}`}
                                        onClick={() => setOpenMobile(openMobile === item.label ? null : item.label)}
                                    >
                                        <span className="flex items-center gap-2">
                                            {item.highlight === "new" && (
                                                <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded uppercase">New</span>
                                            )}
                                            {item.label}
                                        </span>
                                        {(item.dropdown || item.mega) && (
                                            <svg
                                                className={`w-4 h-4 transition-transform text-stone-400 ${openMobile === item.label ? "rotate-180" : ""}`}
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </button>

                                    {item.dropdown && openMobile === item.label && (
                                        <div className="bg-amber-50/50 px-5 pb-2 border-t border-amber-100">
                                            {item.dropdown.map((d) => (
                                                <a key={d.label} href={d.href}
                                                    className="flex items-center gap-2 py-2.5 text-xs text-stone-600 hover:text-rose-700 border-b border-stone-100 last:border-0">
                                                    <span className="w-1 h-1 rounded-full bg-amber-400" />
                                                    {d.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {item.mega && openMobile === item.label && (
                                        <div className="bg-amber-50/50 px-5 pb-3 border-t border-amber-100">
                                            {categoriesLoading ? (
                                                <div className="py-3 text-sm text-stone-500">
                                                    Loading...
                                                </div>
                                            ) : categories.length === 0 ? (
                                                <div className="py-3 text-sm text-stone-500">
                                                    No categories found
                                                </div>
                                            ) : (
                                                categories.map((cat) => (
                                                    <Link
                                                        key={cat._id}
                                                        to={`/category/${cat.slug || cat._id}`}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="flex items-center gap-2 py-3 text-sm text-stone-700 hover:text-rose-700 border-b border-stone-100 last:border-0"
                                                    >
                                                        <span className="w-1 h-1 rounded-full bg-rose-400"></span>
                                                        {cat.name}
                                                    </Link>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Mobile Footer */}
                        <div className="border-t border-stone-100 px-5 py-4 bg-stone-50 flex gap-3">
                            <button className="flex-1 bg-rose-700 text-white text-sm font-bold py-2.5 rounded-full hover:bg-rose-800 transition">Sign In</button>
                            <button className="flex-1 border-2 border-stone-200 text-stone-700 text-sm font-bold py-2.5 rounded-full hover:border-rose-500 hover:text-rose-700 transition">Wishlist</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}