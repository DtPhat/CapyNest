import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionsRepository } from './collections.repository';
import { VocabulariesService } from '../vocabularies/vocabularies.service';
import { Types } from 'mongoose';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly vocabulariesService: VocabulariesService,
  ) { }
  async create(userId: string, createCollectionDto: CreateCollectionDto) {
    await this.validateCreateCollectionDto(createCollectionDto)
    return this.collectionsRepository.create({
      ...createCollectionDto,
      userId: new Types.ObjectId(userId),
    })
  }

  async findAllByUser(userId: string) {
    const collections = await this.collectionsRepository.find({
      userId: new Types.ObjectId(userId)
    })
    const response = []
    for (const collection of collections) {
      const vocabularies = await this.vocabulariesService.findAllByCollection(collection._id.toString())
      response.push({
        ...collection,
        totalVocab: vocabularies.length,
        vocabularies: vocabularies
      })
    }
    return response;
  }

  async findOne(_id: string) {
    const collection = await this.collectionsRepository.findOne({ _id })
    const vocabularies = await this.vocabulariesService.findAllByCollection(collection._id.toString())
    const response = {
      ...collection,
      vocabularies
    }
    return response;
  }

  async update(_id: string, updateCollectionDto: UpdateCollectionDto) {
    await this.validateUpdateCollectionDto(_id, updateCollectionDto)
    return this.collectionsRepository.findOneAndUpdate(
      { _id },
      { $set: updateCollectionDto },
    )
  }

  remove(_id: string) {
    return this.collectionsRepository.findOneAndDelete({ _id })
  }

  async validateCreateCollectionDto(createCollectionDto: CreateCollectionDto) {
    try {
      await this.collectionsRepository.findOne({ name: createCollectionDto.name })
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException("Collection name is already existed")
  }

  async validateUpdateCollectionDto(_id: string, updateCollectionDto: UpdateCollectionDto) {
    try {
      await this.collectionsRepository.findOne({
        _id: { $ne: _id },
        name: updateCollectionDto.name
      })
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException("Collection name is already existed")
  }
}

