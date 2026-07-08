import { apiAdmin } from "./api";

export const fetchAllCategories = () => {
    return apiAdmin.get("/cat/v1/fetch/category/all");
}

export const fetchCategoryById = (id) => {
    return apiAdmin.get(`cat//v1/fetch/category/${id}`);
}

export const fetchAllProducts = (params = {}) => {
    return apiAdmin.get("/prod/get/all/products", { params });
}

export const fetchProductBySlug = (slug) => {
    return apiAdmin.get(`/prod/${slug}`);
};

export const fetchLatestProducts = (limit = 12) => {
    return apiAdmin.get("/prod/get/all/products", {
        params: { status: "active", sort: "-createdAt", limit },
    });
}

export const fetchFeaturedProducts = (limit = 12) => {
    return apiAdmin.get("/prod/get/all/products", {
        params: { status: "active", featured: true, limit },
    });
}

export const fetchProductsByCategory = (categoryId, page = 1, limit = 10) => {
    return apiAdmin.get("/prod/get/all/products", {
        params: { status: "active", category: categoryId, page, limit, sort: "-createdAt" },
    });
}
