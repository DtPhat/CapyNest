import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosRepository } from './videos.repository';
import { FilterVideosDto } from './dto/filter-videos.dto';
import { Sort } from '../types/global.types';

@Injectable()
export class VideosService {
  constructor(
    private readonly videosRepository: VideosRepository,
  ) { }
  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
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

    const result = await this.videosRepository.find(queryFilter, sort, offset, limit)
    return result
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
