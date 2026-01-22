
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const refineWithGemini = async (basePrompt: string, userContent: string) => {
  if (!API_KEY) throw new Error("API Key is missing.");
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${basePrompt}\n\nUSER INPUT:\n${userContent}`,
  });

  const response = await model;
  return response.text;
};

export const chatWithGemini = async (messages: {role: string, parts: {text: string}[]}[]) => {
  if (!API_KEY) throw new Error("API Key is missing.");
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
        systemInstruction: "You are a helpful AI assistant for a content creator. Help the user refine their prompts, scripts, and video ideas based on the provided library of prompts."
    }
  });
  
  // Since the user is passing history, we should send it.
  // Note: the chat interface typically handles history. For simplicity, we just send the latest.
  const lastMessage = messages[messages.length - 1].parts[0].text;
  const response = await chat.sendMessage({ message: lastMessage });
  return response.text;
};
