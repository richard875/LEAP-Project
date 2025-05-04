import OpenAI from "openai";

let instance: OpenAI | null = null;

const getOpenAIClient = (): OpenAI => {
  if (!instance) {
    instance = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
  }
  return instance;
};

export default getOpenAIClient;
