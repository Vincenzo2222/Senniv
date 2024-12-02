// Caricare direttamente il file .env
import 'dotenv/config';

import { OpenAI } from 'openai';

// Configurazione della API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Funzione per effettuare la richiesta all'API di OpenAI
async function callOpenAI() {
  try {
    console.log("API Key:", process.env.OPENAI_API_KEY); // Verifica se la chiave è corretta
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Hello, world!" }
      ],
      max_tokens: 10,
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Errore:", error.response ? error.response.data : error.message);
  }
}

// Eseguire la funzione
callOpenAI();
