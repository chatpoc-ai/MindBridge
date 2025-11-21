import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSummary = async (content: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Summarize the following article content in 2-3 concise sentences:\n\n${content}`,
    });
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating summary. Please try again later.";
  }
};

export const generateAnswer = async (questionTitle: string, questionContent: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful expert. Provide a clear, concise answer to this user question.\n\nTitle: ${questionTitle}\nDetails: ${questionContent}`,
    });
    return response.text || "Could not generate answer.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating answer.";
  }
};