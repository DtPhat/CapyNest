import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Story } from './models/story.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StoriesRepository extends AbstractRepository<Story> {
  protected readonly logger = new Logger(StoriesRepository.name);
  constructor(
    @InjectModel(Story.name) storyModel: Model<Story>
  ) {
    super(storyModel)
  }
}
