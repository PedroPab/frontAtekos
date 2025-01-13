import apiClient from '../config';

const focusElementService = {
  createElement: async (focusProjectId, elementFormData) => {
    try {
      const response = await apiClient.post(`/focusProjects/${focusProjectId}/elements`, elementFormData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating focus element:', error);
      throw error;
    }
  },

  getElements: async (focusProjectId, pagination) => {
    try {
      const { page, limit } = pagination || {};
      const query = new URLSearchParams();
      if (page) query.append('page', page);
      if (limit) query.append('limit', limit);

      const response = await apiClient.get(`/api/v1/focusProjects/${focusProjectId}/elements?${query.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching focus elements:', error);
      throw error;
    }
  },
};

export default focusElementService;
