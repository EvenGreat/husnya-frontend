import { useState, useEffect, useCallback } from "react";
import GeorgetteAnarkali from "../assets/image-sample/IMG_7332.jpeg.webp";
import ChikankariSuits from "../assets/image-sample/PDP_PAGE___website_16.jpg";
import pureLucknavi from "../assets/image-sample/chikankari suit.jpg";

const slides = [
    {
        bg: pureLucknavi,
        tag: "New Collection 2025",
        heading: "The Art of",
        highlight: "Chikankari",
        sub: "Reimagined",
        desc: "Hand-embroidered Lucknawi elegance — from breezy kurtis to bridal lehengas. Wear the craft.",
        badge: { icon: "🌸", label: "Pure Chikankari", sub: "Lucknawi Craft" },
        cta1: "Shop Now",
        cta2: "View Lookbook",
    },
    {
        bg: GeorgetteAnarkali,
        tag: "Limited Time Offer",
        heading: "Bridal Season",
        highlight: "Sale",
        sub: "Up to 60% Off",
        desc: "Stunning Bridal Lehengas & Georgette Anarkali Sets — handpicked for your most special moments.",
        badge: { icon: "✨", label: "Bridal Collection", sub: "Starting ₹2,199" },
        cta1: "Shop the Sale",
        cta2: "View Bridal",
    },
    {
        bg: ChikankariSuits,
        tag: "Bestseller",
        heading: "Pure Lucknowi",
        highlight: "Suits",
        sub: "For Every Occasion",
        desc: "Authentic cotton & georgette Chikankari suits with delicate hand threadwork — timeless & graceful.",
        badge: { icon: "🏷️", label: "From ₹899", sub: "Free Delivery" },
        cta1: "Explore Suits",
        cta2: "New Arrivals",
    },
];

const DURATION = 5000;

export default function HeroSlider() {
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [animKey, setAnimKey] = useState(0);

    const goTo = useCallback((index) => {
        setActive((index + slides.length) % slides.length);
        setAnimKey((k) => k + 1);
        setProgress(0);
    }, []);

    useEffect(() => {
        setProgress(0);
        const start = Date.now();
        const tick = setInterval(() => {
            const pct = Math.min(100, ((Date.now() - start) / DURATION) * 100);
            setProgress(pct);
        }, 40);
        const auto = setTimeout(() => goTo(active + 1), DURATION);
        return () => {
            clearInterval(tick);
            clearTimeout(auto);
        };
    }, [active, goTo]);

    return (
        <>
            {/* ── HERO SLIDER ── */}
            <section className="relative overflow-hidden bg-stone-900" style={{ height: "520px" }}>

                {/* Slides */}
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 flex items-center"
                        style={{
                            opacity: active === i ? 1 : 0,
                            zIndex: active === i ? 10 : 0,
                            transition: "opacity 1s ease",
                        }}
                        aria-hidden={active !== i}
                    >
                        {/* Background image */}
                        <img
                            src={slide.bg}
                            alt={slide.highlight}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ filter: "brightness(.75)" }}
                            loading={i === 0 ? "eager" : "lazy"}
                        />

                        {/* Gradient overlay — left readable, right fades */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(to right, rgba(10,4,4,0.45) 0%, rgba(10,4,4,0.20) 55%, rgba(10,4,4,0.02) 100%)",
                            }}
                        />

                        {/* Slide content */}
                        <div className="relative z-10 px-8 md:px-16 max-w-2xl"
                            style={{
                                animation:
                                    active === i
                                        ? `slideUp 0.75s ease both`
                                        : "none",
                            }}
                            key={animKey}
                        >
                            {/* Tag pill */}
                            <span className="inline-flex items-center gap-1.5 bg-rose-700/80 text-rose-100 text-xs font-sans uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-300 inline-block" />
                                {slide.tag}
                            </span>
                            {/* Badge card — bottom left */}
                            <div className="bottom-10 left-8 md:left-16 z-20 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
                                <span className="text-2xl">{slide.badge.icon}</span>
                                <div>
                                    <div className="text-sm font-semibold text-stone-800 leading-tight">
                                        {slide.badge.label}
                                    </div>
                                    <div className="text-xs text-stone-400 font-sans mt-0.5">
                                        {slide.badge.sub}
                                    </div>
                                </div>
                            </div>
                            {/* Headline */}
                            <h1 className="font-serif font-bold text-white leading-tight mb-4"
                                style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
                                {slide.heading}
                                <br />
                                <span className="italic text-rose-300">{slide.highlight}</span>
                                <br />
                                <span className="text-white/80 font-normal" style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)" }}>
                                    {slide.sub}
                                </span>
                            </h1>


                            {/* Description */}
                            <p className="text-white/65 font-sans text-sm md:text-base mb-8 leading-relaxed max-w-md">
                                {slide.desc}
                            </p>

                            {/* CTAs */}
                            <div className="flex gap-3 flex-wrap">
                                <button className="bg-rose-700 hover:bg-rose-800 active:scale-95 text-white font-sans font-semibold px-7 py-3 rounded-full text-sm transition-all shadow-lg shadow-rose-900/40">
                                    {slide.cta1}
                                </button>
                                <button className="border border-white/40 hover:border-white/80 hover:bg-white/10 text-white font-sans font-semibold px-7 py-3 rounded-full text-sm transition-all">
                                    {slide.cta2}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Prev / Next arrows */}
                <button
                    onClick={() => goTo(active - 1)}
                    className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-light border border-white/25 bg-black/20 hover:bg-rose-700/80 hover:border-transparent transition-all"
                    aria-label="Previous slide"
                >
                    ‹
                </button>
                <button
                    onClick={() => goTo(active + 1)}
                    className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-light border border-white/25 bg-black/20 hover:bg-rose-700/80 hover:border-transparent transition-all"
                    aria-label="Next slide"
                >
                    ›
                </button>

                {/* Dot indicators — bottom right */}
                <div className="absolute bottom-10 right-8 md:right-16 z-30 flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                                width: active === i ? "24px" : "8px",
                                background: active === i ? "#fff" : "rgba(255,255,255,0.35)",
                            }}
                        />
                    ))}
                </div>

                {/* Slide counter — top right */}
                <div className="absolute top-6 right-8 md:right-16 z-30 font-sans text-xs text-white/50 tracking-widest">
                    <span className="text-white font-semibold text-sm">{String(active + 1).padStart(2, "0")}</span>
                    {" "}/{" "}
                    {String(slides.length).padStart(2, "0")}
                </div>

                {/* Progress bar */}
                <div
                    className="absolute bottom-0 left-0 h-0.5 bg-rose-500 z-40 transition-none"
                    style={{ width: `${progress}%` }}
                />
            </section>

            {/* Keyframe animation */}
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(22px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}