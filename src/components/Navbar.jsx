import { Link } from "react-router-dom";
import husnyaLogo from "../assets/husnyalogo-5-300x296.png";

export default function Navbar() {
    return (
        <>
            {/* Top announcement bar */}
            <div className="bg-neutral-900 text-amber-400 text-xs font-medium tracking-widest uppercase text-center py-2 w-full">
                Free shipping on orders above ₹999 &nbsp;·&nbsp; New arrivals every Friday
            </div>

            <nav className="bg-white border-b border-stone-200 fixed w-full top-8 z-50">
                <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-[72px]">

                    {/* Logo + Brand Name */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src={husnyaLogo} alt="Husnya Logo" className="w-16 h-16 object-contain rounded-full border border-stone-200" />
                        <span className="text-2xl font-semibold text-neutral-900 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Husnya
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-9">
                        {["Home", "About", "Services", "Contact"].map((item) => (
                            <Link
                                key={item}
                                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                                className="text-sm font-medium tracking-widest uppercase text-neutral-600 hover:text-neutral-900 border-b-2 border-transparent hover:border-amber-400 pb-0.5 transition-all duration-200"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Right icons + CTA */}
                    <div className="flex items-center gap-5">
                        <button className="text-neutral-500 hover:text-amber-500 transition-colors" aria-label="Search">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                        </button>
                        <button className="text-neutral-500 hover:text-amber-500 transition-colors" aria-label="Wishlist">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        </button>
                        <button className="relative text-neutral-500 hover:text-amber-500 transition-colors" aria-label="Cart">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                            <span className="absolute -top-1 -right-1 bg-amber-400 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
                        </button>
                        <button className="bg-neutral-900 hover:bg-amber-500 text-white text-xs font-medium tracking-widest uppercase px-5 py-2.5 transition-colors duration-200">
                            Get Quote
                        </button>
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed nav */}
            <div className="h-[104px]" />
        </>
    );
}