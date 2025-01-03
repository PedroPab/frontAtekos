import apiClient from '../config';

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

  getFocusById: async (id) => {
    try {
      const response = await apiClient.get(`/focusProjects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching focus details:', error);
      throw error;
    }
  },

  getAllFocusElements: async (id, pagination) => {
    try {
      const { page, limit } = pagination || {};
      const query = new URLSearchParams();
      if (page) query.append('page', page);
      if (limit) query.append('limit', limit);

      const response = await apiClient.get(`/focusProjects/${id}/elements?${query.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching focus elements:', error);
      throw error;
    }
  },

};

export default focusService;