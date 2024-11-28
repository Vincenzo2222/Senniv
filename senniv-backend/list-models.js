const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

(async () => {
  try {
    const models = await openai.listModels();
    console.log("Modelli disponibili:", models.data);
  } catch (error) {
    console.error("Errore OpenAI:", error.message);
  }
})();
