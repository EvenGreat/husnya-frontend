import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { fetchAllCategories, fetchLatestProducts as apiLatest, fetchFeaturedProducts as apiFeatured, fetchProductsByCategory as apiByCategory, fetchAllProducts as apiAllProducts, fetchProductBySlug as apiProductBySlug, } from "../services/Productservice";

const initialState = {
    categories: [],
    latestProducts: [],
    featuredProducts: [],
    productsByCategory: {},
    allProducts: [],
    pagination: {},
    singleProduct: null,
    loading: {
        singleProduct: false,
    },
    errors: {
        singleProduct: null,
    },
    loading: {
        categories: false,
        latest: false,
        featured: false,
        byCategory: {},
        allProducts: false,
    },
    errors: {
        categories: null,
        latest: null,
        featured: null,
        byCategory: {},
        allProducts: null,
    },
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
    switch (action.type) {
        case "FETCH_CATEGORIES_START":
            return { ...state, loading: { ...state.loading, categories: true }, errors: { ...state.errors, categories: null } };
        case "FETCH_CATEGORIES_SUCCESS":
            return { ...state, loading: { ...state.loading, categories: false }, categories: action.payload };
        case "FETCH_CATEGORIES_ERROR":
            return { ...state, loading: { ...state.loading, categories: false }, errors: { ...state.errors, categories: action.payload } };

        case "FETCH_LATEST_START":
            return { ...state, loading: { ...state.loading, latest: true }, errors: { ...state.errors, latest: null } };
        case "FETCH_LATEST_SUCCESS":
            return { ...state, loading: { ...state.loading, latest: false }, latestProducts: action.payload };
        case "FETCH_LATEST_ERROR":
            return { ...state, loading: { ...state.loading, latest: false }, errors: { ...state.errors, latest: action.payload } };

        case "FETCH_FEATURED_START":
            return { ...state, loading: { ...state.loading, featured: true }, errors: { ...state.errors, featured: null } };
        case "FETCH_FEATURED_SUCCESS":
            return { ...state, loading: { ...state.loading, featured: false }, featuredProducts: action.payload };
        case "FETCH_FEATURED_ERROR":
            return { ...state, loading: { ...state.loading, featured: false }, errors: { ...state.errors, featured: action.payload } };

        case "FETCH_BY_CATEGORY_START":
            return {
                ...state,
                loading: { ...state.loading, byCategory: { ...state.loading.byCategory, [action.categoryId]: true } },
                errors: { ...state.errors, byCategory: { ...state.errors.byCategory, [action.categoryId]: null } },
            };
        case "FETCH_BY_CATEGORY_SUCCESS":
            return {
                ...state,
                loading: { ...state.loading, byCategory: { ...state.loading.byCategory, [action.categoryId]: false } },
                productsByCategory: {
                    ...state.productsByCategory,
                    [action.categoryId]: action.append
                        ? [...(state.productsByCategory[action.categoryId] || []), ...action.payload]
                        : action.payload,
                },
                pagination: { ...state.pagination, [action.categoryId]: action.pagination },
            };
        case "FETCH_BY_CATEGORY_ERROR":
            return {
                ...state,
                loading: { ...state.loading, byCategory: { ...state.loading.byCategory, [action.categoryId]: false } },
                errors: { ...state.errors, byCategory: { ...state.errors.byCategory, [action.categoryId]: action.payload } },
            };

        case "FETCH_ALL_START":
            return { ...state, loading: { ...state.loading, allProducts: true }, errors: { ...state.errors, allProducts: null } };
        case "FETCH_ALL_SUCCESS":
            return { ...state, loading: { ...state.loading, allProducts: false }, allProducts: action.payload };
        case "FETCH_ALL_ERROR":
            return { ...state, loading: { ...state.loading, allProducts: false }, errors: { ...state.errors, allProducts: action.payload } };
        case "FETCH_SINGLE_START":
            return { ...state, loading: { ...state.loading, singleProduct: true }, errors: { ...state.errors, singleProduct: null } };
        case "FETCH_SINGLE_SUCCESS":
            return { ...state, loading: { ...state.loading, singleProduct: false }, singleProduct: action.payload };
        case "FETCH_SINGLE_ERROR":
            return { ...state, loading: { ...state.loading, singleProduct: false }, errors: { ...state.errors, singleProduct: action.payload } };

        default:
            return state;
    }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ProductContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ProductProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // ── Fetch all active categories
    const fetchCategories = useCallback(async () => {
        dispatch({ type: "FETCH_CATEGORIES_START" });
        try {
            const { data } = await fetchAllCategories();
            const active = (data.categories || []).filter((c) => c.status === true);
            dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: active });
        } catch (err) {
            dispatch({ type: "FETCH_CATEGORIES_ERROR", payload: err.message });
        }
    }, []);
    const fetchProductBySlug = useCallback(async (slug) => {
        dispatch({ type: "FETCH_SINGLE_START" });
        try {
            const { data } = await apiProductBySlug(slug);
            dispatch({ type: "FETCH_SINGLE_SUCCESS", payload: data.data || null });
        } catch (err) {
            dispatch({ type: "FETCH_SINGLE_ERROR", payload: err.message });
        }
    }, []);
    // ── Fetch latest N products
    const fetchLatestProducts = useCallback(async (limit = 12) => {
        dispatch({ type: "FETCH_LATEST_START" });
        try {
            const { data } = await apiLatest(limit);
            dispatch({ type: "FETCH_LATEST_SUCCESS", payload: data.data?.products || [] });
        } catch (err) {
            dispatch({ type: "FETCH_LATEST_ERROR", payload: err.message });
        }
    }, []);

    // ── Fetch featured products
    const fetchFeaturedProducts = useCallback(async (limit = 12) => {
        dispatch({ type: "FETCH_FEATURED_START" });
        try {
            const { data } = await apiFeatured(limit);
            dispatch({ type: "FETCH_FEATURED_SUCCESS", payload: data.data?.products || [] });
        } catch (err) {
            dispatch({ type: "FETCH_FEATURED_ERROR", payload: err.message });
        }
    }, []);

    const fetchProductsByCategory = useCallback(
        async (categoryId, { page = 1, limit = 10, append = false } = {}) => {
            dispatch({ type: "FETCH_BY_CATEGORY_START", categoryId });
            try {
                const { data } = await apiByCategory(categoryId, page, limit);
                dispatch({
                    type: "FETCH_BY_CATEGORY_SUCCESS",
                    categoryId,
                    payload: data.data?.products || [],
                    pagination: data.data?.pagination || {},
                    append,
                });
            } catch (err) {
                dispatch({ type: "FETCH_BY_CATEGORY_ERROR", categoryId, payload: err.message });
            }
        },
        []
    );

    // ── Fetch products for ALL categories in parallel (home page carousels)
    const fetchAllCategoryProducts = useCallback(
        async (categories, limit = 10) => {
            await Promise.all(
                categories.map((cat) => fetchProductsByCategory(cat._id, { limit }))
            );
        },
        [fetchProductsByCategory]
    );

    // ── Fetch all products with optional filters
    const fetchAllProducts = useCallback(
        async ({ page = 1, limit = 20, search = "", sort = "-createdAt" } = {}) => {
            dispatch({ type: "FETCH_ALL_START" });
            try {
                const { data } = await apiAllProducts({ status: "active", page, limit, sort, ...(search && { search }) });
                dispatch({ type: "FETCH_ALL_SUCCESS", payload: data.data?.products || [] });
            } catch (err) {
                dispatch({ type: "FETCH_ALL_ERROR", payload: err.message });
            }
        },
        []
    );

    // ── Bootstrap on mount
    useEffect(() => {
        fetchCategories();
        fetchLatestProducts(12);
        fetchFeaturedProducts(12);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Once categories load, fetch per-category products
    useEffect(() => {
        if (state.categories.length > 0) {
            fetchAllCategoryProducts(state.categories, 10);
        }
    }, [state.categories]); // eslint-disable-line react-hooks/exhaustive-deps

    const value = {
        ...state,
        fetchCategories,
        fetchLatestProducts,
        fetchFeaturedProducts,
        fetchProductsByCategory,
        fetchAllCategoryProducts,
        fetchAllProducts,
        getProductsForCategory: (categoryId) => state.productsByCategory[categoryId] || [],
        isLoadingCategory: (categoryId) => state.loading.byCategory[categoryId] || false,
        getCategoryError: (categoryId) => state.errors.byCategory[categoryId] || null,
        getPagination: (categoryId) => state.pagination[categoryId] || {},
        fetchProductBySlug,
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

// ─── Root hook ────────────────────────────────────────────────────────────────
export function useProducts() {
    const ctx = useContext(ProductContext);
    if (!ctx) throw new Error("useProducts must be used inside <ProductProvider>");
    return ctx;
}

export function useCategories() {
    const { categories, loading, errors, fetchCategories } = useProducts();
    return { categories, loading: loading.categories, error: errors.categories, refetch: fetchCategories };
}

export function useLatestProducts() {
    const { latestProducts, loading, errors, fetchLatestProducts } = useProducts();
    return { products: latestProducts, loading: loading.latest, error: errors.latest, refetch: fetchLatestProducts };
}

export function useFeaturedProducts() {
    const { featuredProducts, loading, errors, fetchFeaturedProducts } = useProducts();
    return { products: featuredProducts, loading: loading.featured, error: errors.featured, refetch: fetchFeaturedProducts };
}

export function useCategoryProducts(categoryId) {
    const {
        getProductsForCategory,
        isLoadingCategory,
        getCategoryError,
        getPagination,
        fetchProductsByCategory,
    } = useProducts();

    const loadMore = useCallback(
        (currentPage) =>
            fetchProductsByCategory(categoryId, { page: currentPage + 1, append: true }),
        [categoryId, fetchProductsByCategory]
    );

    return {
        products: getProductsForCategory(categoryId),
        loading: isLoadingCategory(categoryId),
        error: getCategoryError(categoryId),
        pagination: getPagination(categoryId),
        loadMore,
        refetch: () => fetchProductsByCategory(categoryId),
    };
}

export function useSingleProduct(slug) {
    const { singleProduct, loading, errors, fetchProductBySlug } = useProducts();
    useEffect(() => {
        if (slug) fetchProductBySlug(slug);
    }, [slug]);
    return { product: singleProduct, loading: loading.singleProduct, error: errors.singleProduct };
}