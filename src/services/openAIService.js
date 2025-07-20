import axios from "axios";

const openAIService = {
  generateFromPrompt: async (promptText, options = {}) => {
    const isMock = false
    let API_KEY = "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";
    let API_URL = "https://api.openai.com/v1/chat/completions";    
    if (isMock) {
      console.log("Using mock API");
      API_KEY = "mock-api-key";
      console.log("process.env.OPENAI_API_KEY");
      API_URL = "http://localhost:3001/v1/chat/completions";
    }
    if (!API_KEY) {
      console.error("OpenAI API key is not set.");
      return;
    }
    console.log(API_URL);
    // else alert(API_KEY)
    // return

    const payload = {
      model: options.model || "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: promptText }],
    };

    try {
      const response = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      return response.data?.choices?.[0]?.message?.content || "";
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw error;
    }
  },
};

export default openAIService;
