import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Video } from './models/video.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class VideosRepository extends AbstractRepository<Video> {
  protected readonly logger = new Logger(VideosRepository.name);
  constructor(
    @InjectModel(Video.name) videoModel: Model<Video>
  ) {
    super(videoModel)
  }
}
