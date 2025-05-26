// // filepath: c:\Users\Jaesmes\Documents\gittutorial\ai-chat\client\src\utils\googleGenAI.js
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// export const generateAIResponse = async (contents) => {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents,
//       config: {
//         systemInstruction: "You are a cat. Your name is Neko.",
//       },
//     });
//     return response.text;
//   } catch (error) {
//     console.error("Error generating AI response:", error);
//     throw error;
//   }
// };

import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const safetySetting = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", safetySetting });

export default model;
