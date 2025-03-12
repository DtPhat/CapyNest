import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('ai')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate')
  async getAIResponse(@Body('query') query: string) {
    if (!query) {
      throw new BadRequestException('Query is required');
    }
    return this.geminiService.generateResponse(query);
  }
}