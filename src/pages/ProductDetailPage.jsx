import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { useSingleProduct } from "../context/ProductContext";

function formatPrice(n) {
    if (n === undefined || n === null || isNaN(n)) return null;
    return `₹${Number(n).toLocaleString("en-IN")}`;
}

export default function ProductDetailPage() {
    const { slug } = useParams();
    const { product, loading, error } = useSingleProduct(slug);
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState("center");
    const imgWrapRef = useRef(null);

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

    const images = product.images?.length ? product.images : [product.featuredImage];
    const price = product.salePrice ?? product.regularPrice;
    const original = product.regularPrice;
    const hasDiscount = original && price && original > price;
    const discountPercent = hasDiscount ? Math.round(((original - price) / original) * 100) : 0;
    const inStock = (product.stock ?? 0) > 0;

    function handleMouseMove(e) {
        const rect = imgWrapRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomOrigin(`${x}% ${y}%`);
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
                        <p className="text-stone-500 font-sans text-sm mb-5">{product.shortDescription}</p>
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

                    {product.description && (
                        <p className="text-stone-600 font-sans leading-relaxed mb-6 whitespace-pre-line">
                            {product.description}
                        </p>
                    )}

                    <div className="flex items-center gap-2 mb-6 font-sans text-sm">
                        <span className={`w-2 h-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
                        <span className={inStock ? "text-emerald-700" : "text-rose-600"}>
                            {inStock ? `In Stock (${product.stock} available)` : "Out of Stock"}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setQty((q) => Math.max(1, q - 1))}
                                className="w-10 h-11 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-sans text-lg"
                            >
                                −
                            </button>
                            <span className="w-10 text-center font-sans font-medium text-stone-800">{qty}</span>
                            <button
                                onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
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

                    <div className="space-y-2 font-sans text-sm text-stone-500 border-t border-stone-200 pt-5">
                        {product.sku && (
                            <p>
                                <span className="text-stone-700 font-medium">SKU:</span> {product.sku}
                            </p>
                        )}
                        {product.category?.name && (
                            <p>
                                <span className="text-stone-700 font-medium">Category:</span> {product.category.name}
                            </p>
                        )}
                        {product.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {product.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}