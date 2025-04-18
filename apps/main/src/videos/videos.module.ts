import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { DatabaseModule } from '@app/common';
import { Video, VideoSchema } from './models/video.schema';
import { VideosRepository } from './videos.repository';
import { GeminiModule, GeminiService } from '@app/external';

@Module({
  imports: [DatabaseModule.forFeature([
    { name: Video.name, schema: VideoSchema },
  ]),
  GeminiModule
],
  controllers: [VideosController],
  providers: [VideosService, VideosRepository, GeminiService],
})
export class VideosModule { }
