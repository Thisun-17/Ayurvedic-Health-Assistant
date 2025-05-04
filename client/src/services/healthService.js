import api from '../utils/api';

const healthService = {
  // Get user's health tracking data
  getUserHealthData: async () => {
    try {
      const response = await api.get('/health/data');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Save mood entry
  saveMoodEntry: async (moodData) => {
    try {
      const response = await api.post('/health/mood', moodData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get mood history
  getMoodHistory: async (startDate, endDate) => {
    try {
      const response = await api.get('/health/mood', { 
        params: { startDate, endDate } 
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Save diet tracking entry
  saveDietEntry: async (dietData) => {
    try {
      const response = await api.post('/health/diet', dietData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get diet tracking history
  getDietHistory: async (startDate, endDate) => {
    try {
      const response = await api.get('/health/diet', { 
        params: { startDate, endDate } 
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Save dosha balance tracking entry
  saveDoshaBalanceEntry: async (balanceData) => {
    try {
      const response = await api.post('/health/dosha-balance', balanceData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get dosha balance tracking history
  getDoshaBalanceHistory: async (startDate, endDate) => {
    try {
      const response = await api.get('/health/dosha-balance', { 
        params: { startDate, endDate } 
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get health insights based on tracked data
  getHealthInsights: async () => {
    try {
      const response = await api.get('/health/insights');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get health recommendations based on tracked data
  getHealthRecommendations: async () => {
    try {
      const response = await api.get('/health/recommendations');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  }
};

export default healthService;