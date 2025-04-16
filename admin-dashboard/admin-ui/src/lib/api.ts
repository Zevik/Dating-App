import axios from 'axios';

// API base URL - assume backend is running on port 3000
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ensure authorization header is properly set with Bearer token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access detected, redirecting to login');
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },
};

// Admin API calls
export const adminApi = {
  getStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      console.error('Get stats error:', error);
      throw error;
    }
  },
  getReports: async () => {
    try {
      const response = await api.get('/admin/reports');
      return response.data;
    } catch (error) {
      console.error('Get reports error:', error);
      throw error;
    }
  },
  updateReportStatus: async (reportId: number, status: string) => {
    try {
      const response = await api.patch(`/admin/reports/${reportId}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Update report ${reportId} error:`, error);
      throw error;
    }
  },
};

export default api; 