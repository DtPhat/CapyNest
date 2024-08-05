import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Vocabulary } from './models/vocabulary.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VocabulariesRepository extends AbstractRepository<Vocabulary> {
  protected readonly logger = new Logger(VocabulariesRepository.name);
  constructor(
    @InjectModel(Vocabulary.name) vocabularyModel: Model<Vocabulary>
  ) {
    super(vocabularyModel)
  }
}
