import axios from 'axios';

const BASE_URL = 'http://localhost:3001/templates';

const templateService = {
  getAllTemplates: async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  getTemplateById: async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createTemplate: async (template) => {
    const response = await axios.post(BASE_URL, template);
    return response.data;
  },

  updateTemplate: async (id, updatedTemplate) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedTemplate);
    return response.data;
  },

  deleteTemplate: async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
};

export default templateService;