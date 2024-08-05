import { Module } from '@nestjs/common';
import { VocabulariesService } from './vocabularies.service';
import { VocabulariesController } from './vocabularies.controller';
import { VocabulariesRepository } from './vocabularies.repository';
import { Vocabulary, VocabularySchema } from './models/vocabulary.schema';
import { DatabaseModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Vocabulary.name, schema: VocabularySchema }]),
    JwtModule
  ],
  controllers: [VocabulariesController],
  providers: [VocabulariesService, VocabulariesRepository],
  exports: [VocabulariesService]
})
export class VocabulariesModule { }
