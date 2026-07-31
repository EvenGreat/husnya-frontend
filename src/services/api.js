import axios from "axios";

export const apiAdmin = axios.create({
    baseURL: "http://localhost:3000/api",
    // baseURL: "https://api.husnya.com/api",

    headers: {
        "Content-Type": "application/json",
    },
});

apiAdmin.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("user_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);