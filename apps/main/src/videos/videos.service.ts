import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosRepository } from './videos.repository';
import { FilterVideosDto } from './dto/filter-videos.dto';
import { Pagination, Sort } from '@app/common';

@Injectable()
export class VideosService {
  constructor(
    private readonly videosRepository: VideosRepository,
  ) { }
  create(createVideoDto: CreateVideoDto) {
    return this.videosRepository.create(createVideoDto);
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
}
