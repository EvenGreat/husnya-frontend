import { useState, useRef } from "react";

const navItems = [
    {
        label: "Home",
        href: "#",
        dropdown: [
            { label: "About Us", href: "#" },
            { label: "Our Story", href: "#" },
            { label: "Contact Us", href: "#" },
        ],
    },
    { label: "NEW ARRIVALS SS'26", href: "#", highlight: "new" },
    { label: "Summer Sale", href: "#", highlight: "sale" },
    { label: "Best Sellers", href: "#" },
    {
        label: "Baarat Ready",
        href: "#",
        dropdown: [
            { label: "Cocktail", href: "#" },
            { label: "Mehfil-e-Mehendi", href: "#" },
            { label: "Phoolo ki Haldi", href: "#" },
            { label: "Shaandaar Sangeet", href: "#" },
            { label: "Sagna Di Shaam", href: "#" },
            { label: "Gift Cards", href: "#" },
        ],
    },
    { label: "Styles under ₹5999", href: "#" },
    {
        label: "Shop By Category",
        href: "#",
        mega: true,
        columns: [
            {
                title: "Ethnic Wear",
                links: [
                    { label: "Chikankari Suits", href: "#" },
                    { label: "Women Kurtis", href: "#" },
                    { label: "Kurta/Sharara Sets", href: "#" },
                    { label: "Lehenga Sets", href: "#" },
                    { label: "Draped Sarees", href: "#" },
                    { label: "Dhoti & Sets", href: "#" },
                ],
            },
            {
                title: "Fusion & Modern",
                links: [
                    { label: "Fusion Sets", href: "#" },
                    { label: "Co-Ord Sets", href: "#" },
                    { label: "Westerns", href: "#" },
                    { label: "Jumpsuit", href: "#" },
                    { label: "Kaftans", href: "#" },
                    { label: "Dupattas", href: "#" },
                ],
            },
            {
                title: "More",
                links: [
                    { label: "Kids Ethnic", href: "#" },
                    { label: "Accessories", href: "#" },
                    { label: "🚚 Ready to Ship", href: "#" },
                    { label: "Shop All", href: "#" },
                ],
            },
        ],
    },
    {
        label: "Shop by Collection",
        href: "#",
        mega: true,
        columns: [
            {
                title: "Premium",
                links: [
                    { label: "Moksha Gold", href: "#" },
                    { label: "Shehzaadi Silk", href: "#" },
                    { label: "Khwabeeda – Blue Chikankari", href: "#" },
                    { label: "MemSahib – Chikankari", href: "#" },
                    { label: "Queen of Wands – Velvet Vows", href: "#" },
                    { label: "Soul of Swans – Ivory & Gold", href: "#" },
                ],
            },
            {
                title: "Festive",
                links: [
                    { label: "Rangeela Re", href: "#" },
                    { label: "Gulaal – Vibrant Intricacy", href: "#" },
                    { label: "Chingari – Fiery Festive", href: "#" },
                    { label: "Sitara – Shine like a Diamond", href: "#" },
                    { label: "Kora Kashi – Banarasi Brocade", href: "#" },
                    { label: "Afreen – Velvets", href: "#" },
                ],
            },
            {
                title: "Everyday",
                links: [
                    { label: "Moksha", href: "#" },
                    { label: "Maaya – Tie & Dye", href: "#" },
                    { label: "Garden of Eden", href: "#" },
                    { label: "Cleopatra", href: "#" },
                    { label: "Noor", href: "#" },
                    { label: "Jalsa", href: "#" },
                ],
            },
        ],
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
    const timeoutRef = useRef(null);

    const handleMouseEnter = (label) => {
        clearTimeout(timeoutRef.current);
        setActiveNav(label);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setActiveNav(null), 150);
    };

    return (
        <>
            {/* ── MARQUEE ANNOUNCEMENT BAR ── */}
            <div className="bg-stone-900 text-white text-xs py-2 overflow-hidden font-sans">
                <div className="flex animate-marquee whitespace-nowrap gap-16">
                    {[...announcements, ...announcements].map((a, i) => (
                        <span key={i} className="tracking-wider uppercase">{a}</span>
                    ))}
                </div>
            </div>

            {/* ── MAIN HEADER ── */}
            <header className="bg-white border-b border-stone-200 sticky top-0 z-50">

                {/* Top Row: Logo + Icons */}
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden text-stone-600 hover:text-rose-700 transition"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* Logo */}
                    <a href="#" className="flex flex-col items-center gap-0 select-none">
                        <span className="text-2xl leading-none">🪡</span>
                        <span className="text-xl font-bold text-rose-700 font-serif tracking-tight leading-none">Husnya</span>
                        <span className="text-xs text-stone-400 font-sans tracking-widest uppercase leading-none">Ethnic Elegance</span>
                    </a>

                    {/* Right Icons */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <button className="hidden md:flex text-stone-500 hover:text-rose-700 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                        </button>
                        {/* Account */}
                        <button className="hidden md:flex text-stone-500 hover:text-rose-700 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                            </svg>
                        </button>
                        {/* Wishlist */}
                        <button className="hidden md:flex text-stone-500 hover:text-rose-700 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" />
                            </svg>
                        </button>
                        {/* Cart */}
                        <button className="relative text-stone-500 hover:text-rose-700 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 6h12.8M7 13L5.4 5M10 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                            <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-sans font-bold">0</span>
                        </button>
                    </div>
                </div>

                {/* ── DESKTOP NAV BAR ── */}
                <nav className="hidden lg:block border-t border-stone-100 bg-white">
                    <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-0">
                        {navItems.map((item) => (
                            <div
                                key={item.label}
                                className="relative group"
                                onMouseEnter={() => (item.dropdown || item.mega) && handleMouseEnter(item.label)}
                                onMouseLeave={() => (item.dropdown || item.mega) && handleMouseLeave()}
                            >
                                <a
                                    href={item.href}
                                    className={`flex items-center gap-1 px-3 py-3.5 text-xs font-sans font-semibold uppercase tracking-wide whitespace-nowrap transition border-b-2
                    ${item.highlight === "sale" ? "text-rose-600 border-rose-600" :
                                            item.highlight === "new" ? "text-emerald-600 border-transparent hover:border-emerald-500" :
                                                item.highlight === "celeb" ? "text-amber-600 border-transparent hover:border-amber-500" :
                                                    "text-stone-700 border-transparent hover:text-rose-700 hover:border-rose-600"}`}
                                >
                                    {item.label}
                                    {(item.dropdown || item.mega) && (
                                        <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </a>

                                {/* Simple Dropdown */}
                                {item.dropdown && activeNav === item.label && (
                                    <div
                                        className="absolute top-full left-0 bg-white border border-stone-100 shadow-xl rounded-b-xl py-2 min-w-48 z-50"
                                        onMouseEnter={() => handleMouseEnter(item.label)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {item.dropdown.map((d) => (
                                            <a
                                                key={d.label}
                                                href={d.href}
                                                className="block px-5 py-2.5 text-xs font-sans text-stone-600 hover:text-rose-700 hover:bg-rose-50 transition"
                                            >
                                                {d.label}
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {/* Mega Dropdown */}
                                {item.mega && activeNav === item.label && (
                                    <div
                                        className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-stone-100 shadow-2xl rounded-b-2xl py-6 px-6 z-50 w-max"
                                        onMouseEnter={() => handleMouseEnter(item.label)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="flex gap-10">
                                            {item.columns.map((col) => (
                                                <div key={col.title} className="min-w-44">
                                                    <div className="text-xs font-sans font-bold uppercase tracking-widest text-rose-600 mb-3 pb-1.5 border-b border-rose-100">
                                                        {col.title}
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {col.links.map((l) => (
                                                            <li key={l.label}>
                                                                <a
                                                                    href={l.href}
                                                                    className="text-xs font-sans text-stone-600 hover:text-rose-700 hover:translate-x-1 inline-block transition-all"
                                                                >
                                                                    {l.label}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </nav>
            </header>

            {/* ── MOBILE DRAWER ── */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-40 flex">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setMobileOpen(false)} />

                    {/* Drawer */}
                    <div className="relative bg-white w-80 max-w-full h-full overflow-y-auto shadow-2xl flex flex-col">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
                            <div>
                                <div className="text-lg font-serif font-bold text-rose-700">🪡 Husnya</div>
                                <div className="text-xs font-sans text-stone-400 uppercase tracking-widest">Ethnic Elegance</div>
                            </div>
                            <button onClick={() => setMobileOpen(false)} className="text-stone-400 hover:text-rose-700 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Search in mobile */}
                        <div className="px-5 py-3 border-b border-stone-100">
                            <div className="flex items-center gap-2 bg-stone-100 rounded-full px-4 py-2">
                                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                </svg>
                                <input type="text" placeholder="Search..." className="bg-transparent text-sm font-sans outline-none flex-1 text-stone-600 placeholder-stone-400" />
                            </div>
                        </div>

                        {/* Nav Links */}
                        <nav className="flex-1 py-2">
                            {navItems.map((item) => (
                                <div key={item.label}>
                                    <button
                                        className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-sans font-semibold text-left transition
                      ${item.highlight === "sale" ? "text-rose-600" :
                                                item.highlight === "new" ? "text-emerald-600" :
                                                    item.highlight === "celeb" ? "text-amber-600" :
                                                        "text-stone-700 hover:text-rose-700"}`}
                                        onClick={() => setOpenMobile(openMobile === item.label ? null : item.label)}
                                    >
                                        {item.label}
                                        {(item.dropdown || item.mega) && (
                                            <svg
                                                className={`w-4 h-4 transition-transform ${openMobile === item.label ? "rotate-180" : ""}`}
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* Simple dropdown open */}
                                    {item.dropdown && openMobile === item.label && (
                                        <div className="bg-rose-50 px-5 pb-2">
                                            {item.dropdown.map((d) => (
                                                <a key={d.label} href={d.href} className="block py-2 text-xs font-sans text-stone-600 hover:text-rose-700 border-b border-rose-100 last:border-0">
                                                    {d.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {/* Mega dropdown open */}
                                    {item.mega && openMobile === item.label && (
                                        <div className="bg-rose-50 px-5 pb-3">
                                            {item.columns.map((col) => (
                                                <div key={col.title} className="mt-3">
                                                    <div className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-1.5">{col.title}</div>
                                                    {col.links.map((l) => (
                                                        <a key={l.label} href={l.href} className="block py-1.5 text-xs font-sans text-stone-600 hover:text-rose-700 border-b border-rose-100 last:border-0">
                                                            {l.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Mobile footer actions */}
                        <div className="border-t border-stone-100 px-5 py-4 flex gap-4">
                            <button className="flex-1 bg-rose-700 text-white text-sm font-sans font-semibold py-2.5 rounded-full hover:bg-rose-800 transition">Sign In</button>
                            <button className="flex-1 border border-stone-300 text-stone-700 text-sm font-sans font-semibold py-2.5 rounded-full hover:border-rose-600 hover:text-rose-700 transition">Wishlist</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Marquee animation style */}
            <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 28s linear infinite; }
      `}</style>
        </>
    );
}