import axios from 'axios';

// Use a hardcoded URL for now to ensure it works
const API_URL = 'http://localhost:5000/api';

console.log('API Service initialized with URL:', API_URL);

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // Change to false to avoid CORS issues
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('API Request Interceptor - Token exists:', !!token);
    if (token) {
      console.log('Adding Authorization header with token');
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request config:', {
      url: config.url,
      method: config.method,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => {
    console.log('Registering user with data:', userData);
    return api.post('/auth/register', userData);
  },
  login: (credentials) => {
    console.log('Logging in with credentials:', credentials);
    return api.post('/auth/login', credentials);
  },
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout')
};

// Donation API
export const donationAPI = {
  create: (donationData) => api.post('/donations', donationData),
  getAll: () => api.get('/donations'),
  getOne: (id) => api.get(`/donations/${id}`),
  update: (id, data) => api.patch(`/donations/${id}`, data),
  delete: (id) => api.delete(`/donations/${id}`)
};

// Blog API
export const blogAPI = {
  getAll: () => api.get('/blogs'),
  getAllAdmin: () => api.get('/blogs/all'),
  getOne: (id) => api.get(`/blogs/${id}`),
  create: (blogData) => api.post('/blogs', blogData),
  update: (id, data) => api.patch(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`)
};

// Contact API
export const contactAPI = {
  submit: (contactData) => api.post('/contact', contactData),
  getAll: () => api.get('/contact'),
  getOne: (id) => api.get(`/contact/${id}`),
  update: (id, data) => api.patch(`/contact/${id}`, data),
  delete: (id) => api.delete(`/contact/${id}`)
};

// Team API
export const teamAPI = {
  getAll: () => api.get('/team'),
  getAllAdmin: () => api.get('/team/all'),
  getOne: (id) => api.get(`/team/${id}`),
  create: (formData) => api.post('/team', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  update: (id, formData) => api.patch(`/team/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  delete: (id) => api.delete(`/team/${id}`)
};

// FAQ API
export const faqAPI = {
  getAll: () => api.get('/faq'),
  getAllAdmin: () => api.get('/faq/all'),
  getByCategory: (category) => api.get(`/faq/category/${category}`),
  getOne: (id) => api.get(`/faq/${id}`),
  create: (faqData) => api.post('/faq', faqData),
  submit: (question) => api.post('/faq/submit', { question }),
  update: (id, data) => api.patch(`/faq/${id}`, data),
  delete: (id) => api.delete(`/faq/${id}`),
  getAllAdmin: () => api.get('/faq/admin/all'),
  updateFAQ: (id, data) => api.put(`/faq/admin/${id}`, data)
};

export default api; 