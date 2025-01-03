import apiClient from '../config';

const imgsService = {
  getImgById: async (id) => {
    try {
      const response = await apiClient.get(`/imgs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching img details:', error);
      throw error;
    }
  },
};

export default imgsService;