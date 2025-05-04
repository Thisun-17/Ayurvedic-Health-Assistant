import api from '../utils/api';

const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/users/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Reset password
  resetPassword: async (token, password) => {
    try {
      const response = await api.post(`/users/reset-password/${token}`, { password });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.get(`/users/verify-email/${token}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  }
};

export default authService;