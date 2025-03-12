import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

@Injectable()
export class GeminiService {
  private readonly GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;

  async generateResponse(prompt: string = "Explain how AI works") {
    if (!this.GOOGLE_AI_API_KEY) {
      throw new HttpException('Google AI API key is missing!', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const genAI = new GoogleGenerativeAI(this.GOOGLE_AI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new HttpException('Failed to fetch response from Gemini AI', HttpStatus.BAD_REQUEST);
    }

  }
}
