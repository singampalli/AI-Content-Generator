import axios from 'axios';

const BASE_URL = process.env.REACT_APP_DEEPSEEK_API_URL || 'http://localhost:8888/api/query';

const openAIService = {
  generateContentFromPrompt: async (promptText, options = {}) => {
    const payload = {
      "model": "deepseek",
      "prompt": promptText
    };
    try {
      const response = await axios.post(`${BASE_URL}`, payload);
      return response.data.output || "";
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw error;
    }
  },
};

export default openAIService;
