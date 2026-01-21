
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly as per guidelines for initialization
export const askGeminiAboutBenefits = async (prompt: string, userContext?: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';

  const systemInstruction = `
    Você é o assistente virtual da Santa Casa de Maceió para o Cartão de Descontos.
    Responda dúvidas sobre benefícios, onde usar o cartão, e como obter descontos em exames e consultas.
    A Santa Casa de Maceió é referência em Alagoas.
    O cartão oferece descontos em:
    1. Consultas em diversas especialidades (Cardiologia, Pediatria, Ortopedia, etc).
    2. Exames de imagem (Raio-X, Tomografia, Ressonância).
    3. Laboratórios conveniados.
    4. Farmácias parceiras (Pague Menos, Droasil).
    Seja educado, prestativo e fale em Português do Brasil.
    Informações do usuário atual: ${JSON.stringify(userContext || {})}.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Directly access the .text property from the response object
    return response.text || "Desculpe, não consegui processar sua dúvida agora.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao consultar o assistente.";
  }
};
