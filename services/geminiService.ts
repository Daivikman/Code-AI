import { GoogleGenAI } from "@google/genai";
import { ModelTool } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder for environments where the key is not set.
  // In a real scenario, the app would fail to initialize the API.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const getPromptForTool = (tool: ModelTool, code: string, language: string): string => {
  switch (tool) {
    case ModelTool.Generate:
      return `Generate a complete and functional code snippet in ${language} for the following task: ${code}. Provide only the code, without any explanation or markdown formatting.`;
    case ModelTool.Explain:
      return `Explain the following ${language} code snippet in detail. Describe its purpose, how it works, and key components: \n\n\`\`\`${language}\n${code}\n\`\`\``;
    case ModelTool.Debug:
      return `Debug the following ${language} code snippet. Identify any errors, explain the root cause, and provide a corrected version with an explanation of the fix: \n\n\`\`\`${language}\n${code}\n\`\`\``;
    case ModelTool.Optimize:
      return `Optimize the following ${language} code snippet for performance and efficiency. Provide the optimized code and explain the improvements made: \n\n\`\`\`${language}\n${code}\n\`\`\``;
    default:
      throw new Error('Invalid tool selected');
  }
};

export const runCodeTool = async (
  tool: ModelTool,
  code: string,
  language: string
): Promise<string> => {
  try {
    const prompt = getPromptForTool(tool, code, language);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Gemini API call failed:', error);
    if (error instanceof Error) {
      return `An error occurred while communicating with the AI model: ${error.message}`;
    }
    return 'An unknown error occurred while communicating with the AI model.';
  }
};

export const getVoiceResponse = async (query: string): Promise<string> => {
    try {
        const prompt = `You are CodeAI, a helpful and friendly voice assistant for software developers. Your responses should be conversational and concise, suitable for being spoken aloud. Address the user's query directly. User query: "${query}"`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error('Gemini API call failed for voice:', error);
        if (error instanceof Error) {
            return `I'm sorry, I encountered an error: ${error.message}`;
        }
        return 'I\'m sorry, I was unable to process your request.';
    }
};