import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoriesRepository } from './stories.repository';
import { FilterStoriesDto } from './dto/filter-stories.dto';
import { Pagination, Sort } from '@app/common';
import { GeminiService } from '@app/external';

@Injectable()
export class StoriesService {

  constructor(
    private readonly storiesRepository: StoriesRepository,
    private readonly geminiService: GeminiService,
  ) { }
  async create(createStoryDto: CreateStoryDto) {
    try {
      const response = await this.storiesRepository.create(createStoryDto)
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async findAll(
    page: number = 1,
    size: number = 10,
    sort: Sort,
    filterDto: FilterStoriesDto
  ): Promise<{ data: any[]; pagination: Pagination }> {
    const offset = (page - 1) * size;
    const limit = Number(size);

    const queryFilter: {
      title?: { $regex: RegExp };
      level?: { $regex: RegExp };
      category?: { $regex: RegExp };
    } = {};

    if (filterDto.title) queryFilter.title = { $regex: new RegExp(filterDto.title, "i") };
    if (filterDto.level) queryFilter.level = { $regex: new RegExp(filterDto.level, "i") };
    if (filterDto.category) queryFilter.category = { $regex: new RegExp(filterDto.category, "i") };

    const [data, count] = await Promise.all([
      this.storiesRepository.find(queryFilter, sort, offset, limit),
      this.storiesRepository.countDocuments(queryFilter),
    ]);

    const totalPages = Math.ceil(count / size);
    const pagination: Pagination = {
      totalCount: count,
      totalPages: totalPages,
      currentPage: page,
    };

    return { data, pagination };
  }

  async findOne(_id: string) {
    return this.storiesRepository.findOne({ _id });
  }

  update(_id: string, updateStoryDto: UpdateStoryDto) {
    return this.storiesRepository.findOneAndUpdate(
      { _id },
      { $set: updateStoryDto }
    );
  }

  remove(_id: string) {
    return this.storiesRepository.findOneAndDelete({ _id });
  }

  async parseTranscript(transcript: string = "") {
    const prompt = `
    ${transcript} \n
    Convert this video transcript to JSON format which each object containing:
    sentence: separated part of a sentence merged into a sentence,
    timestamp: starting time of the above sentence as a number, translation: the Vietnamese translation of the sentence.
    `
    const response = await this.geminiService.generateResponse(prompt)

    return response
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
