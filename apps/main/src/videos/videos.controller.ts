import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FilterVideosDto } from './dto/filter-videos.dto';
import { Sort } from '@app/common';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @Post()
  // async create(@Body() createVideoDto: CreateVideoDto) {
  //   return this.videosService.create(createVideoDto);
  // }

  async create(@Body() createVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("size") size: number = 10,
    @Query("caption") caption: string = "",
    @Query("category") category: string = "",
    @Query("level") level: string = "",
    @Query("sortBy") sortBy: string = "_id",
    @Query("direction") direction: "asc" | "desc" = "asc"
  ) {

    const filterDto: FilterVideosDto = {
      caption,
      category,
      level,
    }

    const sort: Sort = {
      field: sortBy,
      direction: direction
    }

    return this.videosService.findAll(page, size, sort, filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.videosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Put(':id')
  updateWithPut(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }

  @Post('parsed-transcript')
  async getParsedTranscript(
    @Body() stringTranscript: string,
  ) {
    return this.videosService.parseTranscript(stringTranscript);
  }

}
