import apiClient from '../config';
import FormData from 'form-data';

const focusElementService = {
  createElement: async (focusProjectId, elementData) => {
    try {
      const formData = new FormData();
      for (const key in elementData) {
        formData.append(key, elementData[key]);
      }

      const response = await apiClient.post(`/focusProjects/${focusProjectId}/elements`, formData, {
        headers: formData.getHeaders(),
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
