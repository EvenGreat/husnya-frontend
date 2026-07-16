import { useParams } from "react-router-dom";
import { useState, useRef, useMemo, useEffect } from "react";
import { useSingleProduct } from "../context/ProductContext";

function formatPrice(n) {
    if (n === undefined || n === null || isNaN(n)) return null;
    return `₹${Number(n).toLocaleString("en-IN")}`;
}

const COLOR_SWATCHES = {
    "butter yellow": "#F3D97B",
    "lavender": "#C9B8E8",
    "sky blue": "#8FC7E8",
    "baby pink": "#F5B8C4",
    "white": "#FFFFFF",
    "black": "#1C1C1C",
    "red": "#DC2626",
    "green": "#16A34A",
    "blue": "#2563EB",
    "maroon": "#7F1D1D",
};

function decodeHtmlEntities(str) {
    if (!str) return "";
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

function swatchColor(name) {
    return COLOR_SWATCHES[name?.toLowerCase()] || "#D6D3D1";
}

// Sum of stock across every size in a color group
function colorStock(colorGroup) {
    return (colorGroup?.sizes || []).reduce((sum, s) => sum + (Number(s.stock) || 0), 0);
}

export default function ProductDetailPage() {
    const { slug } = useParams();
    const { product, loading, error } = useSingleProduct(slug);
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState("center");
    const [activeColorIdx, setActiveColorIdx] = useState(0);
    const [activeSizeIdx, setActiveSizeIdx] = useState(0);
    const imgWrapRef = useRef(null);

    // Each entry is now a color group: { color, images: [...], sizes: [{ size, sku, stock }] }
    const colorGroups = product?.variants?.length ? product.variants : [];
    const hasUsableVariants = colorGroups.length > 0;

    const activeColor = useMemo(() => {
        if (!hasUsableVariants) return null;
        return colorGroups[activeColorIdx] || colorGroups[0];
    }, [colorGroups, activeColorIdx, hasUsableVariants]);

    const activeSize = useMemo(() => {
        if (!activeColor) return null;
        return activeColor.sizes?.[activeSizeIdx] || activeColor.sizes?.[0] || null;
    }, [activeColor, activeSizeIdx]);

    // When the product loads, default to the first color that actually has stock
    useEffect(() => {
        if (!hasUsableVariants) return;
        const firstInStock = colorGroups.findIndex((g) => colorStock(g) > 0);
        setActiveColorIdx(firstInStock >= 0 ? firstInStock : 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    // Whenever the active color changes: pick the first in-stock size for it,
    // and reset the gallery back to that color's first photo.
    useEffect(() => {
        if (!activeColor) return;
        const firstInStockSize = (activeColor.sizes || []).findIndex((s) => Number(s.stock) > 0);
        setActiveSizeIdx(firstInStockSize >= 0 ? firstInStockSize : 0);
        setActiveImg(0);
        setQty(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeColorIdx, activeColor]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-24 flex flex-col items-center gap-4 font-sans">
                <div className="w-10 h-10 border-4 border-stone-200 border-t-rose-600 rounded-full animate-spin" />
                <p className="text-stone-400">Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-24 text-center font-sans">
                <p className="text-rose-500 text-lg font-medium">Product not found.</p>
                <p className="text-stone-400 text-sm mt-2">The item you're looking for may have been removed.</p>
            </div>
        );
    }

    // Gallery shows the active color's own photos; falls back to the product's
    // main/gallery images for non-variant products (or if a color has none, which
    // shouldn't happen given backend validation, but keeps the page from breaking).
    const images = hasUsableVariants
        ? (activeColor?.images?.length ? activeColor.images : (product.images?.length ? product.images : [product.featuredImage]))
        : (product.images?.length ? product.images : [product.featuredImage]);

    const price = product.salePrice ?? product.regularPrice;
    const original = product.regularPrice;
    const hasDiscount = original && price && original > price;
    const discountPercent = hasDiscount ? Math.round(((original - price) / original) * 100) : 0;

    const effectiveStock = hasUsableVariants
        ? (activeSize ? Number(activeSize.stock) || 0 : 0)
        : (product.stock ?? 0);
    const inStock = effectiveStock > 0;

    function handleMouseMove(e) {
        const rect = imgWrapRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomOrigin(`${x}% ${y}%`);
    }

    function handleSelectColor(i) {
        const g = colorGroups[i];
        if (!g || colorStock(g) <= 0) return;
        setActiveColorIdx(i);
    }

    function handleSelectSize(i) {
        const s = activeColor?.sizes?.[i];
        if (!s || Number(s.stock) <= 0) return;
        setActiveSizeIdx(i);
        setQty(1);
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-stone-400 font-sans mb-8 uppercase tracking-wide">
                <span>{product.category?.name || "Shop"}</span>
                <span>/</span>
                <span className="text-stone-600">{product.name}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
                {/* Gallery */}
                <div>
                    <div
                        ref={imgWrapRef}
                        onMouseEnter={() => setIsZooming(true)}
                        onMouseLeave={() => setIsZooming(false)}
                        onMouseMove={handleMouseMove}
                        className="relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/5] cursor-zoom-in"
                    >
                        <img
                            src={images[activeImg]}
                            alt={product.name}
                            style={{ transformOrigin: zoomOrigin }}
                            className={`w-full h-full object-cover transition-transform duration-200 ease-out ${
                                isZooming ? "scale-[2]" : "scale-100"
                            }`}
                        />
                        {hasDiscount && (
                            <span className="absolute top-4 left-4 bg-rose-700 text-white text-xs font-sans font-semibold px-3 py-1 rounded-full tracking-wide pointer-events-none">
                                {discountPercent}% OFF
                            </span>
                        )}
                        {!inStock && (
                            <div className="absolute inset-0 bg-stone-900/50 flex items-center justify-center pointer-events-none">
                                <span className="bg-white text-stone-800 text-sm font-sans font-semibold px-4 py-2 rounded-full">
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="flex gap-3 mt-4">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                                        activeImg === i ? "border-rose-600" : "border-transparent hover:border-stone-300"
                                    }`}
                                >
                                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col">
                    {product.brand && (
                        <span className="text-rose-700 font-sans text-sm font-semibold uppercase tracking-wide mb-2">
                            {product.brand}
                        </span>
                    )}

                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-3 leading-tight">
                        {product.name}
                    </h1>

                    {product.shortDescription && (
                        <div
                            className="text-stone-500 font-sans text-sm mb-5 [&_p]:mb-2 [&_p:last-child]:mb-0"
                            dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(product.shortDescription) }}
                        />
                    )}

                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-200">
                        {price && <span className="text-rose-700 font-bold font-sans text-3xl">{formatPrice(price)}</span>}
                        {hasDiscount && (
                            <span className="text-stone-400 line-through font-sans text-lg">{formatPrice(original)}</span>
                        )}
                        {hasDiscount && (
                            <span className="text-emerald-600 font-sans text-sm font-semibold">
                                Save {formatPrice(original - price)}
                            </span>
                        )}
                    </div>

                    {/* Color selector */}
                    {hasUsableVariants && (
                        <div className="mb-6">
                            <p className="font-sans text-sm font-medium text-stone-700 mb-3">
                                Color: <span className="text-stone-500 font-normal">{activeColor?.color || "Select"}</span>
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {colorGroups.map((g, i) => {
                                    const selected = activeColorIdx === i;
                                    const disabled = colorStock(g) <= 0;
                                    return (
                                        <button
                                            key={g.color || i}
                                            type="button"
                                            onClick={() => handleSelectColor(i)}
                                            disabled={disabled}
                                            title={g.color}
                                            className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                                                selected ? "ring-2 ring-rose-600 ring-offset-2" : "ring-1 ring-stone-200 ring-offset-2 hover:ring-stone-400"
                                            } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                                        >
                                            <span
                                                className="w-8 h-8 rounded-full border border-black/10"
                                                style={{ backgroundColor: swatchColor(g.color) }}
                                            />
                                            {disabled && (
                                                <span className="absolute inset-0 flex items-center justify-center">
                                                    <span className="w-[140%] h-px bg-stone-400 rotate-45" />
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Size selector — sizes for the currently selected color only */}
                    {hasUsableVariants && activeColor?.sizes?.length > 0 && (
                        <div className="mb-6">
                            <p className="font-sans text-sm font-medium text-stone-700 mb-3">
                                Size: <span className="text-stone-500 font-normal">{activeSize?.size || "Select"}</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {activeColor.sizes.map((s, i) => {
                                    const selected = activeSizeIdx === i;
                                    const disabled = Number(s.stock) <= 0;
                                    return (
                                        <button
                                            key={s.sku || s.size || i}
                                            type="button"
                                            onClick={() => handleSelectSize(i)}
                                            disabled={disabled}
                                            className={`relative min-w-[3rem] px-3 py-2 rounded-lg font-sans text-sm font-medium border transition-all ${
                                                selected
                                                    ? "bg-stone-800 text-white border-stone-800"
                                                    : "border-stone-300 text-stone-600 hover:border-stone-500"
                                            } ${disabled ? "opacity-40 cursor-not-allowed line-through" : "cursor-pointer"}`}
                                        >
                                            {s.size || "One Size"}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Purchase card: stock, SKU, quantity, CTA */}
                    <div className="border border-stone-200 rounded-2xl p-5 bg-stone-50/60 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 font-sans text-sm">
                                <span className={`w-2 h-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
                                <span className={inStock ? "text-emerald-700 font-medium" : "text-rose-600 font-medium"}>
                                    {inStock ? `In Stock (${effectiveStock} available)` : "Out of Stock"}
                                </span>
                            </div>
                            {(hasUsableVariants ? activeSize?.sku : product.sku) && (
                                <span className="text-stone-400 font-sans text-xs tracking-wide">
                                    SKU: {hasUsableVariants ? activeSize.sku : product.sku}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    className="w-10 h-11 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-sans text-lg"
                                >
                                    −
                                </button>
                                <span className="w-10 text-center font-sans font-medium text-stone-800">{qty}</span>
                                <button
                                    type="button"
                                    onClick={() => setQty((q) => Math.min(effectiveStock || 99, q + 1))}
                                    className="w-10 h-11 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-sans text-lg"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                disabled={!inStock}
                                className="flex-1 bg-stone-800 hover:bg-rose-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-sans font-semibold py-3.5 rounded-xl transition-colors uppercase tracking-wide text-sm"
                            >
                                {inStock ? "Add to Cart" : "Unavailable"}
                            </button>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="space-y-3 font-sans text-sm text-stone-500">
                        {product.category?.name && (
                            <p>
                                <span className="text-stone-700 font-medium">Category:</span> {product.category.name}
                            </p>
                        )}
                        {product.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {product.tags.slice(0, 8).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs capitalize"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Full-width description section */}
            {product.description && (
                <div className="mt-16 pt-12 border-t border-stone-200">
                    <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6">Product Details</h2>
                    <div
                        className="text-stone-600 font-sans leading-relaxed max-w-4xl
                            [&_p]:mb-4
                            [&_h3]:text-xl [&_h3]:font-serif [&_h3]:font-semibold [&_h3]:text-stone-800 [&_h3]:mt-8 [&_h3]:mb-4
                            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
                            [&_li]:mb-1.5
                            [&_strong]:text-stone-800 [&_strong]:font-semibold"
                        dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(product.description) }}
                    />
                </div>
            )}
        </div>
    );
}