import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Collection } from './models/collection.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CollectionsRepository extends AbstractRepository<Collection> {
  protected readonly logger = new Logger(CollectionsRepository.name);
  constructor(
    @InjectModel(Collection.name) collectionModel: Model<Collection>
  ) {
    super(collectionModel)
  }
}
