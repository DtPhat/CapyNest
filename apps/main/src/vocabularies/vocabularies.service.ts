import { Injectable } from '@nestjs/common';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabulariesRepository } from './vocabularies.repository';
import { ObjectId, Types } from 'mongoose';

@Injectable()
export class VocabulariesService {
  constructor(
    private readonly vocabulariesRepository: VocabulariesRepository
  ) { }
  create(createVocabularyDto: CreateVocabularyDto) {
    return this.vocabulariesRepository.create(createVocabularyDto)
  }

  async findAllByCollection(collectionId: string) {
    return this.vocabulariesRepository.find({
      collectionId: new Types.ObjectId(collectionId)
    });
  }

  update(id: number, updateVocabularyDto: UpdateVocabularyDto) {
    return `This action updates a #${id} vocabulary`;
  }

  remove(_id: string) {
    return this.vocabulariesRepository.findOneAndDelete({ _id });
  }
}
