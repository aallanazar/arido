import { GoogleGenAI } from "@google/genai";
import { ModelName } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a Base64 string.
 */
export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Sends an image and a text prompt to Gemini to edit the image.
 */
export const editImageWithGemini = async (
  imageFile: File,
  prompt: string
): Promise<string> => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);

    const response = await ai.models.generateContent({
      model: ModelName.EDIT_MODEL,
      contents: {
        parts: [
          imagePart,
          { text: prompt },
        ],
      }
    });

    // Extract the image from the response
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    throw new Error("No image generated in response");

  } catch (error) {
    console.error("Error editing image:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while processing the image.");
  }
};
