import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function generateContentWithTools(tools) {
  const aiResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents:
      "my weight is 59Kg and my height is 165cm, calculate my BMI and tell me if I am underweight, normal weight, overweight or obese.",
    config: {
      tools: [
        {
          functionDeclarations: tools,
        },
      ],
    },
  });
  console.log("AI Response:", aiResponse.functionCalls);
  return aiResponse;
}
