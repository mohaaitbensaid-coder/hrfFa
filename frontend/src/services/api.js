import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.success && response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.success && response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    getStoredUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

// Artisan API
export const artisanAPI = {
    getAll: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.profession) params.append('profession', filters.profession);
        if (filters.city) params.append('city', filters.city);
        if (filters.search) params.append('search', filters.search);
        if (filters.sort) params.append('sort', filters.sort);

        const response = await api.get(`/artisans?${params.toString()}`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/artisans/${id}`);
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/artisans/stats/overview');
        return response.data;
    }
};

// User API
export const userAPI = {
    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await api.put('/users/profile', userData);
        if (response.data.success && response.data.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    getAllUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },

    updateUserStatus: async (userId, isActive) => {
        const response = await api.put(`/users/${userId}/status`, { isActive });
        return response.data;
    },

    deleteUser: async (userId) => {
        const response = await api.delete(`/users/${userId}`);
        return response.data;
    }
};

// Review API
export const reviewAPI = {
    create: async (reviewData) => {
        const response = await api.post('/reviews', reviewData);
        return response.data;
    },

    getByArtisan: async (artisanId) => {
        const response = await api.get(`/reviews/artisan/${artisanId}`);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/reviews');
        return response.data;
    },

    approve: async (reviewId, isApproved) => {
        const response = await api.put(`/reviews/${reviewId}/approve`, { isApproved });
        return response.data;
    },

    delete: async (reviewId) => {
        const response = await api.delete(`/reviews/${reviewId}`);
        return response.data;
    }
};

export default api;
