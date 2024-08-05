import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoriesRepository } from './stories.repository';
import { FilterStoriesDto } from './dto/filter-stories.dto';
import { Sort } from '@app/common';

@Injectable()
export class StoriesService {
  constructor(
    private readonly storiesRepository: StoriesRepository,
  ) { }
  create(createStoryDto: CreateStoryDto) {
    return this.storiesRepository.create({
      ...createStoryDto,
    });
  }

  async findAll(page: number, size: number, sort: Sort, filterDto: FilterStoriesDto) {
    let offset = (page - 1) * size;
    let limit = Number(size);

    const queryFilter: {
      title?: { $regex: RegExp };
      level?: { $regex: RegExp };
      category?: { $regex: RegExp };
    } = {};

    if (filterDto.title) queryFilter.title = { $regex: new RegExp(filterDto.title, "i") };
    if (filterDto.level) queryFilter.level = { $regex: new RegExp(filterDto.level, "i") };
    if (filterDto.category) queryFilter.category = { $regex: new RegExp(filterDto.category, "i") };

    const result = await this.storiesRepository.find(queryFilter, sort, offset, limit)
    return result
  }

  findOne(_id: number) {
    return this.storiesRepository.findOne({ _id });
  }

  update(_id: string, updateStoryDto: UpdateStoryDto) {
    return this.storiesRepository.findOneAndUpdate(
      { _id },
      { $set: updateStoryDto }
    );
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
