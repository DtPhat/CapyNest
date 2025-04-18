import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosRepository } from './videos.repository';
import { FilterVideosDto } from './dto/filter-videos.dto';
import { Pagination, Sort } from '@app/common';
import { GeminiService } from '@app/external';

@Injectable()
export class VideosService {
  constructor(
    private readonly videosRepository: VideosRepository,
    private readonly geminiService: GeminiService,

  ) { }
  async create(createVideoDto: CreateVideoDto) {
    try {
      const response = await this.videosRepository.create(createVideoDto);
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async findAll(page: number, size: number, sort: Sort, filterDto: FilterVideosDto) {
    let offset = (page - 1) * size;
    let limit = Number(size);

    const queryFilter: {
      caption?: { $regex: RegExp };
      level?: { $regex: RegExp };
      category?: { $regex: RegExp };
    } = {};

    if (filterDto.caption) queryFilter.caption = { $regex: new RegExp(filterDto.caption, "i") };
    if (filterDto.level) queryFilter.level = { $regex: new RegExp(filterDto.level, "i") };
    if (filterDto.category) queryFilter.category = { $regex: new RegExp(filterDto.category, "i") };

    const [data, count] = await Promise.all([
      this.videosRepository.find(queryFilter, sort, offset, limit),
      this.videosRepository.countDocuments(queryFilter),
    ]);

    const totalPages = Math.ceil(count / size);
    const pagination: Pagination = {
      totalCount: count,
      totalPages: totalPages,
      currentPage: page,
    };

    return { data, pagination };
  }

  findOne(_id: string) {
    return this.videosRepository.findOne({ _id })
  }

  update(_id: string, updateVideoDto: UpdateVideoDto) {
    return this.videosRepository.findOneAndUpdate(
      { _id },
      { $set: updateVideoDto }
    );
  }

  remove(_id: string) {
    return this.videosRepository.findOneAndDelete({ _id });
  }

  async parseTranscript(transcript: string = "") {
    const input = `${transcript}\n\n`;
    const outputJsonPrompt = `
Convert this video transcript into an array of JSON objects. Each object must contain:

- "sentence": A complete sentence formed by combining fragmented phrases (based on timestamps and sentence continuity).
- "timestamp": The starting time in seconds. (e.g., 0:02 → 2, 1:30 → 90)
- "translation": A natural Vietnamese translation of the sentence — avoid literal word-by-word translations.

⚠️ Output ONLY raw JSON — no code block formatting like \`\`\`json, and no additional text or explanation. Return only a JSON array like: [{"sentence": "...", "timestamp": 0.00, "translation": "..."}, ...] without wrapping it in backticks.
`;

    try {
      const response = await this.geminiService.generateResponse(input + outputJsonPrompt);
      if (!response) {
        throw new Error('Gemini AI response is null or undefined');
      }
      return response;
    } catch (error) {
      console.error('Error parsing transcript:', error);
      throw new Error('Failed to parse transcript');
    }
  }

  isValidTranscriptFormat(transcript: string): boolean {
    const lines = transcript.split('\n');
    const timestampRegex = /^\d+:\d+/;

    for (const line of lines) {
      const parts = line.trim().split(' ');
      if (parts.length < 2) return false; // timestamp and text are required

      const timestamp = parts[0];
      if (!timestampRegex.test(timestamp)) return false; // invalid timestamp format

      // rest of the line is text, so we're good!
    }

    return true;
  }
}
