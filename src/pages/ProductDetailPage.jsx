import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSingleProduct } from "../context/ProductContext";

function formatPrice(n) {
    if (n === undefined || n === null || isNaN(n)) return null;
    return `₹${Number(n).toLocaleString("en-IN")}`;
}

export default function ProductDetailPage() {
    const { slug } = useParams();
    const { product, loading, error } = useSingleProduct(productId);
    const [activeImg, setActiveImg] = useState(0);

    if (loading) {
        return <div className="max-w-6xl mx-auto px-4 py-20 text-center font-sans text-stone-400">Loading product...</div>;
    }
    if (error || !product) {
        return <div className="max-w-6xl mx-auto px-4 py-20 text-center font-sans text-rose-500">Product not found.</div>;
    }

    const images = product.images?.length ? product.images.map((i) => i.url || i) : [product.image];
    const price = product.price ?? product.sellingPrice;
    const original = product.mrp ?? product.originalPrice;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 min-h-screen">
            <div>
                <img src={images[activeImg]} alt={product.name} className="w-full h-[500px] object-cover rounded-2xl" />
                <div className="flex gap-3 mt-4">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            onClick={() => setActiveImg(i)}
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${activeImg === i ? "border-rose-600" : "border-transparent"}`}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-serif font-bold text-stone-800 mb-3">{product.name || product.title}</h1>
                <div className="flex items-center gap-3 mb-6">
                    {price && <span className="text-rose-700 font-bold font-sans text-2xl">{formatPrice(price)}</span>}
                    {original && <span className="text-stone-400 line-through font-sans">{formatPrice(original)}</span>}
                </div>
                <p className="text-stone-600 font-sans leading-relaxed mb-8">{product.description}</p>
                <button className="w-full bg-stone-800 hover:bg-rose-700 text-white font-sans font-semibold py-3.5 rounded-xl transition-colors uppercase tracking-wide">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}