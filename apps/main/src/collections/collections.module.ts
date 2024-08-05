import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@app/common';
import { Collection, CollectionSchema } from './models/collection.schema';
import { VocabulariesModule } from '../vocabularies/vocabularies.module';
import { CollectionsRepository } from './collections.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Collection.name, schema: CollectionSchema }]),
    JwtModule,
    VocabulariesModule
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionsRepository],
})
export class CollectionsModule { }
