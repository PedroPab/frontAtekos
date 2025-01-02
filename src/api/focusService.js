import apiClient from './config';

const focusService = {
  getAllFocus: async (pagination) => {
    try {
      const { page, limit } = pagination || {};
      const query = new URLSearchParams();
      if (page) query.append('page', page);
      if (limit) query.append('limit', limit);
      const response = await apiClient.get(`/focusProjects?${query.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching focus:', error);
      throw error;
    }
  },

  createFocus: async (focusData) => {
    try {
      const response = await apiClient.post('/focusProjects', focusData);
      return response.data;
    } catch (error) {
      console.error('Error creating focus:', error);
      throw error;
    }
  },

  // Otros métodos para actualizar y eliminar focus
};

export default focusService;