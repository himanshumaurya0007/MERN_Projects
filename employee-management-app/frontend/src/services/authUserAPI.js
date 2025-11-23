import baseAPI from "./baseAPI";

const authUserAPI = {
    registerUser: async (userData) => {
        const { data } = await baseAPI.post('/v1/auth/register', userData);
        return data;
    },

    loginUser: async (userData) => {
        const { data } = await baseAPI.post('/v1/auth/login', userData);
        return data;
    },

    logoutUser: async () => {
        const { data } = await baseAPI.post('/v1/auth/logout');
        return data;
    },

    getCurrentUser: async () => {
        const { data } = await baseAPI.get('/v1/auth/me');
        return data;
    },
}

export default authUserAPI;