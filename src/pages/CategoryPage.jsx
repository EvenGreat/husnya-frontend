import { useParams, Link } from "react-router-dom";
import { useCategoryProducts, useCategories } from "../context/ProductContext";

function formatPrice(n) {
    if (n === undefined || n === null || isNaN(n)) return null;
    return `₹${Number(n).toLocaleString("en-IN")}`;
}

function normalizeProduct(p) {
    const price = p.price ?? p.sellingPrice ?? p.discountPrice ?? null;
    const original = p.mrp ?? p.originalPrice ?? p.compareAtPrice ?? null;
    return {
        id: p._id || p.id,
        slug: p.slug, // NEW — needed for the detail route
        name: p.name || p.title || "Untitled Product",
        price: formatPrice(price),
        original: formatPrice(original),
        img: p.images?.[0]?.url || p.images?.[0] || p.image || p.thumbnail,
    };
}

export default function CategoryPage() {
    const { categoryId } = useParams();
    const { categories } = useCategories();
    const { products, loading, error, pagination, loadMore } = useCategoryProducts(categoryId);

    const category = categories.find((c) => (c._id || c.id) === categoryId);
    const normalized = products.map(normalizeProduct);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-8">
                {category?.name || "Category"}
            </h1>

            {error && <p className="text-rose-500 font-sans">Couldn't load products.</p>}

            {loading && normalized.length === 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-96 bg-stone-200 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : normalized.length === 0 ? (
                <p className="text-stone-400 font-sans">No products found in this category.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {normalized.map((p) => (
                        <Link to={`/product/${p.id}`} key={p.id} className="group">
                            <div className="rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-xl transition-shadow duration-300">
                                <img src={p.img} alt={p.name} className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="p-4">
                                    <h3 className="text-sm font-serif font-semibold text-stone-700">{p.name}</h3>
                                    <div className="flex gap-2 mt-2">
                                        {p.price && <span className="text-rose-700 font-bold font-sans text-sm">{p.price}</span>}
                                        {p.original && <span className="text-stone-400 text-xs line-through font-sans">{p.original}</span>}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {pagination?.hasMore && (
                <div className="text-center mt-10">
                    <button
                        onClick={() => loadMore(pagination.page || 1)}
                        className="border border-stone-800 px-8 py-3 rounded-full font-sans text-sm uppercase tracking-widest hover:bg-stone-800 hover:text-white transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}