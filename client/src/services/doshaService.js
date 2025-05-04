import api from '../utils/api';

const doshaService = {
  // Get dosha quiz questions
  getQuizQuestions: async () => {
    try {
      const response = await api.get('/dosha/quiz-questions');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Submit quiz answers and get result
  submitQuizAnswers: async (answers) => {
    try {
      const response = await api.post('/dosha/quiz-result', { answers });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get dosha profile for current user
  getUserDoshaProfile: async () => {
    try {
      const response = await api.get('/dosha/profile');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Save dosha assessment results to user profile
  saveDoshaResult: async (result) => {
    try {
      const response = await api.post('/dosha/save-result', result);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get dosha recommendations based on user's profile
  getDoshaRecommendations: async (doshaType) => {
    try {
      const response = await api.get(`/dosha/recommendations/${doshaType}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get history of dosha assessments for a user
  getDoshaHistory: async () => {
    try {
      const response = await api.get('/dosha/history');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get foods recommended for dosha balance
  getDoshaFoodRecommendations: async (doshaType) => {
    try {
      const response = await api.get(`/dosha/food-recommendations/${doshaType}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  }
};

export default doshaService;