import axios from 'axios';

const baseAPI = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/',
    withCredentials: true,
});

baseAPI.interceptors.request.use(
    (config) => {
        // Only set application/json for non-formData requests
        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json';
        }

        // For FormData, axios will automatically set multipart/form-data with boundary
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// --- Interceptor for automatic refresh ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

baseAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {

            // Do not attempt refresh if the failed request IS refresh-token
            if (originalRequest.url.includes("/v1/auth/refresh-token")) {
                console.error("Refresh token invalid or missing, forcing login...");
                // window.location.href = "/";
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Queue requests while refresh is happening
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => baseAPI(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Try refreshing token
                await baseAPI.post("/v1/auth/refresh-token");

                processQueue(null);
                return baseAPI(originalRequest); // retry the original request
            } catch (err) {
                processQueue(err, null);
                console.error("No valid refresh token, redirecting to login...");
                // window.location.href = "/";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default baseAPI;