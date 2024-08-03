import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoriesRepository } from './stories.repository';

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

  findAll() {
    return this.storiesRepository.find({})
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
