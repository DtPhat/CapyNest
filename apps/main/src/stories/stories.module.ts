import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { StoriesRepository } from './stories.repository';
import { DatabaseModule } from '@app/common';
import { Story, StorySchema } from './models/story.schema';

@Module({
  imports: [DatabaseModule.forFeature([
    { name: Story.name, schema: StorySchema },
  ])],
  controllers: [StoriesController],
  providers: [StoriesService, StoriesRepository],
})
export class StoriesModule { }
