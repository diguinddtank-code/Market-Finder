import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MarketPotentialData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    cityName: {
      type: Type.STRING,
      description: "The formatted name of the city and state/country found."
    },
    cityDescription: {
      type: Type.STRING,
      description: "A brief, engaging description of the city's sports culture, vibe, or significance (max 2 sentences)."
    },
    totalPopulation: {
      type: Type.INTEGER,
      description: "Estimated total population of the city."
    },
    targetDemographicCount: {
      type: Type.INTEGER,
      description: "Estimated number of children and teenagers between 5 and 17 years old."
    },
    potentialStudents: {
      type: Type.INTEGER,
      description: "Exactly 1% of the targetDemographicCount, rounded to the nearest integer."
    },
    insight: {
      type: Type.STRING,
      description: "A short, high-energy, business-focused sentence about the massive revenue potential."
    },
    projectedGrowthRate: {
      type: Type.NUMBER,
      description: "Estimated annual growth rate for the youth sports market in decimal format (e.g., 0.05 for 5%)."
    }
  },
  required: ["cityName", "cityDescription", "totalPopulation", "targetDemographicCount", "potentialStudents", "insight", "projectedGrowthRate"],
};

export const calculateMarketPotential = async (locationInput: string): Promise<MarketPotentialData> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Calculate market potential for soccer academies in: ${locationInput}.
      
      Logic:
      1. Identify the city.
      2. Provide a brief description of the city (max 2 sentences).
      3. Estimate total population based on general knowledge.
      4. Estimate the demographic 5-17 years old (typically 15-20% of pop).
      5. Calculate 1% (ONE PERCENT) of that demographic (targetDemographicCount * 0.01).
      6. Estimate a realistic annual growth rate for the youth sports market in this region (e.g. 0.03 to 0.07).
      
      Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are an aggressive sports market analyst. You provide data to show academy owners the massive money they are leaving on the table. Focus on opportunity.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as MarketPotentialData;
  } catch (error) {
    console.error("Error calculating market potential:", error);
    throw error;
  }
};