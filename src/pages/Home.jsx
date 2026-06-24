import { useEffect, useRef, useState } from "react";
import HeroSlider from "../components/Heroslider";
import { useCategories, useLatestProducts, useFeaturedProducts } from "../context/ProductContext";
// ⬆️ Adjust this import path to match where you placed the ProductContext.jsx
// from your project (the file that exports ProductProvider / useCategories /
// useLatestProducts / useFeaturedProducts / useCategoryProducts).

// Fallback image used only if a product/category from the API has no image.
import fallbackImg from "../assets/image-sample/chikankari suit.jpg";

const testimonials = [
    { name: "Priya S.", loc: "Lucknow", text: "The Chikankari work is absolutely stunning — exactly like the original!", stars: 5 },
    { name: "Meena R.", loc: "Delhi", text: "Fast delivery, beautiful fabric, and perfect stitching. Will buy again!", stars: 5 },
    { name: "Anjali K.", loc: "Mumbai", text: "My go-to store for ethnic wear. Love every piece I've ordered.", stars: 5 },
];

const trust = [
    { icon: "✨", title: "Authentic Craft", desc: "Handcrafted Lucknowi Chikankari embroidery." },
    { icon: "🚚", title: "Fast Delivery", desc: "Shipping across India & worldwide." },
    { icon: "💳", title: "Secure Payments", desc: "Safe checkout and COD available." },
    { icon: "❤️", title: "50,000+ Customers", desc: "Trusted by women across India." },
];

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["bg-rose-300", "bg-stone-300", "bg-amber-200", "bg-emerald-200", "bg-indigo-200"];

/* ── Helpers to normalize whatever shape the API returns into what the UI needs ──
   Adjust the field names inside these two functions if your actual API response
   uses different keys (e.g. p.title instead of p.name). */
function formatPrice(n) {
    if (n === undefined || n === null || isNaN(n)) return null;
    return `₹${Number(n).toLocaleString("en-IN")}`;
}

function normalizeProduct(p) {
    const price = p.price ?? p.sellingPrice ?? p.discountPrice ?? null;
    const original = p.mrp ?? p.originalPrice ?? p.compareAtPrice ?? null;
    const discountPercent =
        price && original && original > price
            ? Math.round(((original - price) / original) * 100)
            : null;

    const createdAt = p.createdAt ? new Date(p.createdAt) : null;
    const isNew = createdAt ? Date.now() - createdAt.getTime() < 14 * 86400000 : false;

    return {
        id: p._id || p.id,
        name: p.name || p.title || "Untitled Product",
        price: formatPrice(price),
        original: formatPrice(original),
        img: p.images?.[0]?.url || p.images?.[0] || p.image || p.thumbnail || fallbackImg,
        badge: discountPercent ? `${discountPercent}% OFF` : null,
        isNew,
        isBest: Boolean(p.isBestseller || p.isFeatured),
        tag: isNew ? "Just In" : null,
    };
}

function normalizeCategory(c) {
    return {
        id: c._id || c.id,
        label: c.name || c.title || "Category",
        img: c.image || c.icon || fallbackImg,
    };
}

function Divider() {
    return (
        <div className="flex items-center justify-center gap-3 my-2">
            <div className="h-px w-16 bg-rose-200" />
            <span className="text-rose-400 text-lg">✦</span>
            <div className="h-px w-16 bg-rose-200" />
        </div>
    );
}

function SectionHead({ eyebrow, title }) {
    return (
        <div className="text-center mb-10">
            <p className="text-xs font-sans uppercase tracking-[0.25em] text-rose-500 mb-1">{eyebrow}</p>
            <h2 className="text-3xl font-serif font-bold text-stone-800">{title}</h2>
            <Divider />
        </div>
    );
}

/* ── Countdown timer hook ── */
function useCountdown(targetDate) {
    const calc = () => {
        const diff = new Date(targetDate) - new Date();
        if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
        return {
            d: Math.floor(diff / 86400000),
            h: Math.floor((diff % 86400000) / 3600000),
            m: Math.floor((diff % 3600000) / 60000),
            s: Math.floor((diff % 60000) / 1000),
        };
    };
    const [time, setTime] = useState(calc);
    useEffect(() => {
        const t = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(t);
    }, []);
    return time;
}

function CountdownBox({ val, label }) {
    return (
        <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 min-w-[56px]">
            <span className="text-2xl font-bold font-sans tabular-nums">{String(val).padStart(2, "0")}</span>
            <span className="text-xs font-sans uppercase tracking-widest text-rose-100">{label}</span>
        </div>
    );
}

/* ── Skeleton card shown while a section is loading ── */
function ProductCardSkeleton() {
    return (
        <div className="shrink-0 w-64 md:w-72 rounded-2xl overflow-hidden border border-stone-100 bg-white flex flex-col animate-pulse">
            <div className="h-72 bg-stone-200" />
            <div className="p-4 flex flex-col gap-3">
                <div className="h-4 bg-stone-200 rounded w-3/4" />
                <div className="h-3 bg-stone-200 rounded w-1/2" />
                <div className="h-9 bg-stone-200 rounded-xl mt-2" />
            </div>
        </div>
    );
}

/* ── Product Card (reusable) ── */
function ProductCard({ p, i, wishlist, toggle, showSize = false }) {
    const [selSize, setSelSize] = useState(null);
    const [selColor, setSelColor] = useState(null);
    return (
        <div className="group shrink-0 w-64 md:w-72 rounded-2xl overflow-hidden border border-stone-100 hover:shadow-2xl transition-all duration-500 bg-white flex flex-col">
            <div className="relative overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
                {/* Badges row */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {p.badge && <span className="bg-rose-600 text-white text-xs font-sans font-bold px-3 py-0.5 rounded-full shadow">{p.badge}</span>}
                    {p.isNew && <span className="bg-emerald-500 text-white text-xs font-sans font-bold px-3 py-0.5 rounded-full shadow">NEW</span>}
                    {p.isBest && <span className="bg-amber-500 text-white text-xs font-sans font-bold px-3 py-0.5 rounded-full shadow">BESTSELLER</span>}
                    {p.tag && <span className="bg-indigo-500 text-white text-xs font-sans font-bold px-3 py-0.5 rounded-full shadow">{p.tag}</span>}
                </div>
                <button
                    onClick={() => toggle(i)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-base transition hover:scale-110 hover:bg-rose-50"
                >
                    {wishlist.includes(i) ? "❤️" : "🤍"}
                </button>
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-rose-700/90 py-2.5 text-center">
                    <span className="text-white text-xs font-sans font-semibold tracking-widest uppercase">Quick View</span>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-3 flex-1">
                <h3 className="text-sm font-serif font-semibold text-stone-700 leading-snug">{p.name}</h3>
                {/* Color swatches */}
                <div className="flex gap-1.5">
                    {colors.map((c, ci) => (
                        <button
                            key={ci}
                            onClick={() => setSelColor(ci)}
                            className={`w-5 h-5 rounded-full ${c} border-2 transition ${selColor === ci ? "border-rose-600 scale-110" : "border-white shadow-sm"}`}
                        />
                    ))}
                </div>
                {/* Size pills */}
                {showSize && (
                    <div className="flex gap-1 flex-wrap">
                        {sizes.map((s) => (
                            <button
                                key={s}
                                onClick={() => setSelSize(s)}
                                className={`text-xs font-sans px-2 py-0.5 rounded border transition ${selSize === s ? "bg-stone-800 text-white border-stone-800" : "border-stone-300 text-stone-500 hover:border-stone-600"}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
                <div className="flex items-center gap-2">
                    {p.price && <span className="text-rose-700 font-bold font-sans text-base">{p.price}</span>}
                    {p.original && <span className="text-stone-400 text-xs line-through font-sans">{p.original}</span>}
                </div>
                <button className="mt-auto w-full bg-stone-800 hover:bg-rose-700 text-white text-xs font-sans font-semibold py-2.5 rounded-xl transition-colors duration-300 tracking-wide uppercase">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default function HomePage() {
    // ── Live data from ProductContext (replaces the old static arrays) ──
    const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
    const { products: latestProducts, loading: latestLoading, error: latestError } = useLatestProducts();
    const { products: featuredProducts, loading: featuredLoading, error: featuredError } = useFeaturedProducts();

    const normalizedCategories = categories.map(normalizeCategory);
    const normalizedFeatured = featuredProducts.map(normalizeProduct);
    const normalizedNewArrivals = latestProducts.map(normalizeProduct);

    const [wishlist, setWishlist] = useState([]);
    const toggle = (i) => setWishlist((w) => (w.includes(i) ? w.filter((x) => x !== i) : [...w, i]));

    const featuredRef = useRef(null);
    const newRef = useRef(null);
    const [featIdx, setFeatIdx] = useState(0);
    const [newIdx, setNewIdx] = useState(0);

    const scrollCarousel = (ref, direction, setIdx, total) => {
        const el = ref.current;
        if (!el) return;
        const cardW = el.children[0]?.offsetWidth + 20 || 300;
        el.scrollBy({ left: direction * cardW, behavior: "smooth" });
        setIdx((i) => Math.max(0, Math.min(total - 1, i + direction)));
    };

    const [tIdx, setTIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTIdx((i) => (i + 1) % testimonials.length), 4000);
        return () => clearInterval(t);
    }, []);

    // Sale ends 3 days from now
    const saleEnd = new Date(Date.now() + 3 * 86400000).toISOString();
    const { d, h, m, s } = useCountdown(saleEnd);

    return (
        <div className="font-serif bg-[#fdf8f5] text-stone-800 min-h-screen">

            {/* ── HERO ── */}
            <HeroSlider />

            {/* ── MARQUEE TRUST BAR ── */}
            <div className="bg-rose-700 text-white py-2.5 overflow-hidden">
                <div className="flex gap-12 animate-[marquee_22s_linear_infinite] whitespace-nowrap w-max">
                    {[...Array(4)].flatMap((_, ri) =>
                        trust.map((t, i) => (
                            <span key={`${ri}-${i}`} className="text-xs font-sans uppercase tracking-widest inline-flex items-center gap-2">
                                <span>{t.icon}</span>{t.title}
                                <span className="text-rose-300 mx-4">|</span>
                            </span>
                        ))
                    )}
                </div>
            </div>

            {/* ── CATEGORIES (live) ── */}
            <section className="py-20 bg-[#fdf8f5]">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionHead eyebrow="Explore" title="Shop By Category" />
                    {categoriesError && (
                        <p className="text-center text-sm font-sans text-rose-500 mb-6">
                            Couldn't load categories right now. Please refresh.
                        </p>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {categoriesLoading
                            ? [...Array(4)].map((_, i) => (
                                  <div key={i} className="h-80 w-full rounded-2xl bg-stone-200 animate-pulse" />
                              ))
                            : normalizedCategories.map((c) => (
                                  <div key={c.id} className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500">
                                      <img src={c.img} alt={c.label} className="h-80 w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
                                      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                          <h3 className="text-white font-serif font-semibold text-base tracking-wide drop-shadow">{c.label}</h3>
                                          <span className="mt-1 inline-block text-xs font-sans text-rose-200 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Shop Now →</span>
                                      </div>
                                  </div>
                              ))}
                    </div>
                </div>
            </section>

            {/* ── NEW ARRIVALS (live: latest products) ── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-xs font-sans uppercase tracking-[0.25em] text-rose-500 mb-1">Fresh Drops</p>
                            <h2 className="text-3xl font-serif font-bold text-stone-800">New Arrivals</h2>
                            <Divider />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => scrollCarousel(newRef, -1, setNewIdx, normalizedNewArrivals.length)}
                                className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition"
                            >‹</button>
                            <button
                                onClick={() => scrollCarousel(newRef, 1, setNewIdx, normalizedNewArrivals.length)}
                                className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition"
                            >›</button>
                            <a href="#" className="text-sm font-sans text-rose-700 hover:underline ml-2 hidden sm:block">View All →</a>
                        </div>
                    </div>

                    {latestError && (
                        <p className="text-sm font-sans text-rose-500 mb-4">Couldn't load new arrivals right now.</p>
                    )}

                    <div
                        ref={newRef}
                        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {latestLoading
                            ? [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
                            : normalizedNewArrivals.length === 0
                            ? <p className="text-sm font-sans text-stone-400 py-10">No new arrivals yet — check back soon.</p>
                            : normalizedNewArrivals.map((p, i) => (
                                  <ProductCard key={p.id ?? i} p={p} i={`new-${p.id ?? i}`} wishlist={wishlist} toggle={toggle} showSize={true} />
                              ))}
                    </div>
                    {/* Dots */}
                    {!latestLoading && normalizedNewArrivals.length > 0 && (
                        <div className="flex justify-center gap-2 mt-5">
                            {normalizedNewArrivals.map((_, i) => (
                                <button key={i} onClick={() => setNewIdx(i)}
                                    className={`rounded-full transition-all duration-300 ${newIdx === i ? "bg-rose-600 w-6 h-2" : "bg-stone-300 w-2 h-2"}`} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── SALE BANNER WITH COUNTDOWN ── */}
            <section className="max-w-7xl mx-auto px-4 py-10">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-800 via-rose-700 to-rose-500 text-white flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-12 shadow-2xl">
                    <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
                    <div className="relative z-10">
                        <p className="font-sans text-rose-200 uppercase tracking-[0.25em] text-xs mb-2">Limited Time</p>
                        <h3 className="text-4xl font-serif font-bold mb-1">Bridal Season Sale</h3>
                        <p className="text-rose-100 font-sans text-sm mb-5">Up to 60% off on Bridal Lehengas & Anarkali Sets</p>
                        {/* Countdown */}
                        <div className="flex gap-3">
                            <CountdownBox val={d} label="Days" />
                            <CountdownBox val={h} label="Hrs" />
                            <CountdownBox val={m} label="Min" />
                            <CountdownBox val={s} label="Sec" />
                        </div>
                    </div>
                    <button className="relative z-10 bg-white text-rose-700 font-sans font-bold px-10 py-3.5 rounded-full hover:bg-rose-50 transition shadow-lg whitespace-nowrap tracking-wide uppercase text-sm">
                        Shop the Sale
                    </button>
                </div>
            </section>

            {/* ── FEATURED COLLECTION CAROUSEL (live) ── */}
            <section className="py-20 bg-[#fdf8f5]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-xs font-sans uppercase tracking-[0.25em] text-rose-500 mb-1">Handpicked</p>
                            <h2 className="text-3xl font-serif font-bold text-stone-800">Featured Collection</h2>
                            <Divider />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => scrollCarousel(featuredRef, -1, setFeatIdx, normalizedFeatured.length)}
                                className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition"
                            >‹</button>
                            <button
                                onClick={() => scrollCarousel(featuredRef, 1, setFeatIdx, normalizedFeatured.length)}
                                className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition"
                            >›</button>
                            <a href="#" className="text-sm font-sans text-rose-700 hover:underline ml-2 hidden sm:block">View All →</a>
                        </div>
                    </div>

                    {featuredError && (
                        <p className="text-sm font-sans text-rose-500 mb-4">Couldn't load the featured collection right now.</p>
                    )}

                    <div
                        ref={featuredRef}
                        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {featuredLoading
                            ? [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
                            : normalizedFeatured.length === 0
                            ? <p className="text-sm font-sans text-stone-400 py-10">No featured products yet.</p>
                            : normalizedFeatured.map((p, i) => (
                                  <ProductCard key={p.id ?? i} p={p} i={`feat-${p.id ?? i}`} wishlist={wishlist} toggle={toggle} showSize={true} />
                              ))}
                    </div>
                    {!featuredLoading && normalizedFeatured.length > 0 && (
                        <div className="flex justify-center gap-2 mt-5">
                            {normalizedFeatured.map((_, i) => (
                                <button key={i} onClick={() => setFeatIdx(i)}
                                    className={`rounded-full transition-all duration-300 ${featIdx === i ? "bg-rose-600 w-6 h-2" : "bg-stone-300 w-2 h-2"}`} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── WHY HUSNYA (story strip) ── */}
            <section className="py-20 bg-rose-50 border-y border-rose-100">
                <div className="max-w-6xl mx-auto px-4">
                    <SectionHead eyebrow="Our Story" title="Why Husnya Chikankari?" />
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: "🪡", title: "300+ Artisans", desc: "We work directly with Lucknow's finest karigars keeping generations of craft alive." },
                            { icon: "🌿", title: "Natural Fabrics", desc: "Pure cotton, georgette & silk — breathable, ethical, and gentle on the planet." },
                            { icon: "🎁", title: "Gift-Ready Packaging", desc: "Every order arrives in our signature rose box — perfect for gifting." },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl px-8 py-10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center gap-4">
                                <div className="text-5xl">{item.icon}</div>
                                <h3 className="font-serif font-bold text-lg text-stone-800">{item.title}</h3>
                                <p className="text-sm font-sans text-stone-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TRUST PILLARS ── */}
            <section className="py-14 bg-white border-b border-rose-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-rose-100">
                        {trust.map((t, i) => (
                            <div key={i} className="text-center px-6 py-8 group">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{t.icon}</div>
                                <h3 className="font-serif font-bold text-stone-800 mb-1">{t.title}</h3>
                                <p className="text-xs font-sans text-stone-500 leading-relaxed">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS CAROUSEL ── */}
            <section className="py-20 bg-[#fdf8f5]">
                <div className="max-w-3xl mx-auto px-4">
                    <SectionHead eyebrow="Customer Love" title="What Our Customers Say" />
                    <div className="relative overflow-hidden rounded-3xl">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${tIdx * 100}%)` }}
                        >
                            {testimonials.map((t, i) => (
                                <div key={i} className="min-w-full text-center px-10 py-12 bg-white border border-rose-100 shadow-sm rounded-3xl">
                                    <div className="text-rose-500 text-xl mb-4">{"★".repeat(t.stars)}</div>
                                    <p className="text-stone-600 font-serif italic text-lg leading-relaxed mb-6">"{t.text}"</p>
                                    <p className="font-sans font-semibold text-stone-800 text-sm">{t.name}</p>
                                    <p className="font-sans text-stone-400 text-xs uppercase tracking-widest">{t.loc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, i) => (
                            <button key={i} onClick={() => setTIdx(i)}
                                className={`rounded-full transition-all duration-300 ${tIdx === i ? "bg-rose-600 w-6 h-2" : "bg-stone-300 w-2 h-2"}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INSTAGRAM MOSAIC ── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionHead eyebrow="Follow Us" title="@husnya_chikankari" />
                    <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:h-[480px]">
                        {(normalizedFeatured.length > 0 ? normalizedFeatured : normalizedNewArrivals)
                            .slice(0, 4)
                            .map((p, idx) => {
                                const spanClass =
                                    idx === 0 ? "md:row-span-2" : idx === 2 ? "md:col-span-2 md:row-span-2" : "";
                                return (
                                    <div key={p.id ?? idx} className={`group relative overflow-hidden rounded-2xl cursor-pointer ${spanClass}`}>
                                        <img src={p.img} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                            <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">📷</span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="text-center mt-8">
                        <a href="https://www.instagram.com/husnya_chikankari/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white font-sans font-semibold text-xs uppercase tracking-widest px-8 py-3 rounded-full transition-colors duration-300"
                        >
                            Follow on Instagram
                        </a>
                    </div>
                </div>
            </section>

            {/* ── NEWSLETTER ── */}
            <section className="py-20 bg-[#fdf8f5] border-t border-rose-100">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <SectionHead eyebrow="Stay Updated" title="Join the Husnya Circle" />
                    <p className="text-stone-500 font-sans text-sm mb-8 leading-relaxed">
                        Get new arrivals, exclusive deals & styling inspiration straight to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 border border-stone-300 rounded-full px-6 py-3.5 text-sm font-sans outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition"
                        />
                        <button className="bg-rose-700 hover:bg-rose-800 text-white font-sans font-semibold px-8 py-3.5 rounded-full transition-colors duration-300 tracking-wide shadow-md">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}