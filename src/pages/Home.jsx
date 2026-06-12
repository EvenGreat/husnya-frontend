import { useState } from "react";
import GeorgetteAnarkali from "../assets/image-sample/IMG_7332.jpeg.webp";
import ChikankariSuits from "../assets/image-sample/PDP_PAGE___website_16.jpg";
import pureLucknavi from "../assets/image-sample/chikankari suit.jpg";
import Saree from "../assets/image-sample/saree.jpg";


const categories = [
    { name: "Chikankari Suits", icon: "🪡", tag: "Bestseller" },
    { name: "Women Kurtis", icon: "👗", tag: "New" },
    { name: "Sarees", icon: "🌸", tag: "" },
    { name: "Lehengas", icon: "✨", tag: "Trending" },
    { name: "Dupattas", icon: "🧣", tag: "" },
    { name: "Men's Wear", icon: "👔", tag: "" },
    { name: "Kids Ethnic", icon: "🎀", tag: "New" },
    { name: "Accessories", icon: "💍", tag: "" },
];

const featured = [
    {
        name: "Pure Lucknowi Chikankari",
        price: "₹1,299",
        original: "₹2,499",
        img: pureLucknavi,
        badge: "52% OFF"
    },
    {
        name: "Georgette Anarkali Set",
        price: "₹2,199",
        original: "₹3,800",
        img: GeorgetteAnarkali,
        badge: "42% OFF"
    },
    {
        name: "Embroidered Cotton Kurti",
        price: "₹899",
        original: "₹1,599",
        img: ChikankariSuits,
        badge: "44% OFF"
    },
    {
        name: "Silk Chikankari Saree",
        price: "₹3,499",
        original: "₹5,999",
        img: Saree,
        badge: "42% OFF"
    }
];

const testimonials = [
    { name: "Priya S.", loc: "Lucknow", text: "The Chikankari work is absolutely stunning — exactly like the original!", stars: 5 },
    { name: "Meena R.", loc: "Delhi", text: "Fast delivery, beautiful fabric, and perfect stitching. Will buy again!", stars: 5 },
    { name: "Anjali K.", loc: "Mumbai", text: "My go-to store for ethnic wear. Love every piece I've ordered.", stars: 5 },
];

export default function HomePage() {
    const [wishlist, setWishlist] = useState([]);
    const toggle = (i) =>
        setWishlist((w) => (w.includes(i) ? w.filter((x) => x !== i) : [...w, i]));

    return (
        <div className="font-serif bg-stone-50 text-stone-800 min-h-screen">
            <section className="relative bg-gradient-to-br from-rose-50 via-amber-50 to-stone-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-block bg-rose-100 text-rose-700 text-xs font-sans uppercase tracking-widest px-3 py-1 rounded-full mb-4">New Collection 2025</span>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-stone-800 mb-4">
                            The Art of<br /><span className="text-rose-700 italic">Chikankari</span><br />Reimagined
                        </h1>
                        <p className="text-stone-500 font-sans text-base mb-8 max-w-md mx-auto md:mx-0">
                            Hand-embroidered Lucknawi elegance — from breezy kurtis to bridal lehengas. Wear the craft.
                        </p>
                        <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                            <button className="bg-rose-700 hover:bg-rose-800 text-white font-sans font-semibold px-7 py-3 rounded-full transition shadow-md">Shop Now</button>
                            <button className="border border-stone-400 hover:border-rose-700 hover:text-rose-700 text-stone-600 font-sans font-semibold px-7 py-3 rounded-full transition">View Lookbook</button>
                        </div>
                        <div className="mt-10 flex gap-8 justify-center md:justify-start font-sans">
                            {[["10K+", "Happy Customers"], ["500+", "Designs"], ["100%", "Authentic"]].map(([n, l]) => (
                                <div key={l} className="text-center md:text-left">
                                    <div className="text-2xl font-bold text-rose-700">{n}</div>
                                    <div className="text-xs text-stone-500 uppercase tracking-wider">{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center relative">
                        <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-rose-100 absolute opacity-40 blur-3xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=85"
                            alt="Chikankari Fashion"
                            className="relative w-64 md:w-80 h-80 md:h-96 object-cover rounded-3xl shadow-2xl border-4 border-white"
                        />
                        <div className="absolute bottom-4 left-0 md:-left-6 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2 text-sm font-sans">
                            <span className="text-rose-600 text-lg">🌸</span>
                            <div>
                                <div className="font-semibold text-stone-700">Pure Chikankari</div>
                                <div className="text-stone-400 text-xs">Lucknawi Craft</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES ── */}
            <section className="max-w-7xl mx-auto px-4 py-14">
                <div className="text-center mb-10">
                    <p className="text-xs font-sans uppercase tracking-widest text-rose-600 mb-1">Explore</p>
                    <h2 className="text-3xl font-bold text-stone-800">Shop by Category</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                    {categories.map((c) => (
                        <button key={c.name} className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-rose-50 transition cursor-pointer relative">
                            {c.tag && (
                                <span className="absolute top-1 right-1 text-xs bg-rose-600 text-white rounded-full px-1.5 py-0.5 font-sans leading-none">{c.tag}</span>
                            )}
                            <div className="w-14 h-14 rounded-full bg-amber-50 group-hover:bg-rose-100 flex items-center justify-center text-2xl shadow-sm transition">{c.icon}</div>
                            <span className="text-xs font-sans text-stone-600 text-center leading-tight font-medium">{c.name}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ── FEATURED PRODUCTS ── */}
            <section className="bg-white py-14">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-xs font-sans uppercase tracking-widest text-rose-600 mb-1">Handpicked</p>
                            <h2 className="text-3xl font-bold text-stone-800">Featured Collection</h2>
                        </div>
                        <a href="#" className="text-sm font-sans text-rose-700 hover:underline hidden sm:block">View All →</a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {featured.map((p, i) => (
                            <div key={i} className="group rounded-2xl overflow-hidden border border-stone-100 hover:shadow-xl transition bg-stone-50">
                                <div className="relative overflow-hidden">
                                    <img src={p.img} alt={p.name} className="w-full h-52 object-cover group-hover:scale-105 transition duration-500" />
                                    <span className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-sans font-bold px-2 py-0.5 rounded-full">{p.badge}</span>
                                    <button
                                        onClick={() => toggle(i)}
                                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-sm transition hover:scale-110"
                                    >
                                        {wishlist.includes(i) ? "❤️" : "🤍"}
                                    </button>
                                </div>
                                <div className="p-3">
                                    <h3 className="text-sm font-semibold text-stone-700 leading-snug mb-1">{p.name}</h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-rose-700 font-bold font-sans">{p.price}</span>
                                        <span className="text-stone-400 text-xs line-through font-sans">{p.original}</span>
                                    </div>
                                    <button className="w-full bg-stone-800 hover:bg-rose-700 text-white text-xs font-sans font-semibold py-2 rounded-xl transition">Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SALE BANNER ── */}
            <section className="max-w-7xl mx-auto px-4 py-10">
                <div className="rounded-3xl bg-gradient-to-r from-rose-700 to-rose-500 text-white flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10">
                    <div>
                        <p className="font-sans text-rose-200 uppercase tracking-widest text-xs mb-1">Limited Time</p>
                        <h3 className="text-3xl font-bold mb-1">Bridal Season Sale</h3>
                        <p className="text-rose-100 font-sans text-sm">Up to 60% off on Bridal Lehengas & Anarkali Sets</p>
                    </div>
                    <button className="bg-white text-rose-700 font-sans font-bold px-8 py-3 rounded-full hover:bg-rose-50 transition shadow-md whitespace-nowrap">
                        Shop the Sale
                    </button>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="bg-amber-50 py-14">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <p className="text-xs font-sans uppercase tracking-widest text-rose-600 mb-1">Reviews</p>
                        <h2 className="text-3xl font-bold text-stone-800">What Our Customers Say</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                                <div className="text-rose-500 mb-3 text-sm">{"★".repeat(t.stars)}</div>
                                <p className="text-stone-600 font-sans text-sm italic mb-4">"{t.text}"</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-xs">{t.name[0]}</div>
                                    <div>
                                        <div className="text-sm font-semibold text-stone-700">{t.name}</div>
                                        <div className="text-xs text-stone-400 font-sans">{t.loc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── NEWSLETTER ── */}
            <section className="max-w-2xl mx-auto px-4 py-14 text-center">
                <p className="text-xs font-sans uppercase tracking-widest text-rose-600 mb-1">Stay Updated</p>
                <h2 className="text-2xl font-bold text-stone-800 mb-2">Join the Husnya Circle</h2>
                <p className="text-stone-500 font-sans text-sm mb-6">Get new arrivals, exclusive deals & styling inspiration straight to your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-1 border border-stone-300 rounded-full px-5 py-3 text-sm font-sans outline-none focus:border-rose-500 transition"
                    />
                    <button className="bg-rose-700 hover:bg-rose-800 text-white font-sans font-semibold px-6 py-3 rounded-full transition">Subscribe</button>
                </div>
            </section>
        </div>
    );
}