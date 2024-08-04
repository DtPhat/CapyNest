import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { DatabaseModule } from '@app/common';
import { Video, VideoSchema } from './models/video.schema';
import { VideosRepository } from './videos.repository';

@Module({
  imports: [DatabaseModule.forFeature([
    { name: Video.name, schema: VideoSchema },
  ])],
  controllers: [VideosController],
  providers: [VideosService, VideosRepository],
})
export class VideosModule { }
