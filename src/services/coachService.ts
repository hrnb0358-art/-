import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askCoach(question: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: "あなたは『わくわく野球教室』のAIコーチです。小学生に対して、野球のルール、コツ、楽しさを優しく、わかりやすく、そしてやる気が出るように教えてください。回答は短く簡潔にし、絵文字を適度に使ってください。",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Coach Error:", error);
    return "ごめんね、ちょっとエラーが起きちゃった。もう一度聞いてみて！";
  }
}
