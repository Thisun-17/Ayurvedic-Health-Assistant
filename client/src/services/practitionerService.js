import api from '../utils/api';

// Practitioner related services
const practitionerService = {
  // Get all practitioners
  getAllPractitioners: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/practitioners?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get practitioner details by ID
  getPractitionerById: async (practitionerId) => {
    try {
      const response = await api.get(`/practitioners/${practitionerId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Book an appointment with a practitioner
  bookAppointment: async (practitionerId, appointmentData) => {
    try {
      const response = await api.post(`/practitioners/${practitionerId}/appointments`, appointmentData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get user's appointments
  getUserAppointments: async (status) => {
    try {
      const queryString = status ? `?status=${status}` : '';
      const response = await api.get(`/practitioners/appointments${queryString}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Cancel an appointment
  cancelAppointment: async (appointmentId) => {
    try {
      const response = await api.put(`/practitioners/appointments/${appointmentId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Rate a practitioner
  ratePractitioner: async (practitionerId, ratingData) => {
    try {
      const response = await api.post(`/practitioners/${practitionerId}/reviews`, ratingData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  },

  // Get practitioner reviews
  getPractitionerReviews: async (practitionerId) => {
    try {
      const response = await api.get(`/practitioners/${practitionerId}/reviews`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Server not available');
    }
  }
};

export default practitionerService;