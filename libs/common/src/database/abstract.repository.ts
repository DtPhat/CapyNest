import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument extends AbstractDocument>{
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) { }
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    })
    return (await createdDocument.save()).toJSON() as unknown as TDocument
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>(true)
    if (!document) {
      this.logger.warn('Document was not found with filter query: ', filterQuery);
      throw new NotFoundException('Document was not found')
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      new: true
    }).lean<TDocument>(true)

    if (!document) {
      this.logger.warn('Document was not found with filter query: ', filterQuery);
      throw new NotFoundException('Document was not found')
    }
    return document
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    sort?: { field: string, direction: 'asc' | 'desc' },
    offset?: number,
    limit?: number,
  ): Promise<TDocument[]> {

    const query = this.model.find(filterQuery);

    if (sort && sort.field) {
      query.sort({ [sort.field]: sort.direction === 'asc' ? 1 : -1 });
    }

    if (typeof offset === 'number') {
      query.skip(offset);
    }

    if (typeof limit === 'number') {
      query.limit(limit);
    }

    const results = await query.lean<TDocument[]>(true)

    return results;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(filterQuery).lean<TDocument>(true);
  }

  async countDocuments(filterQuery: FilterQuery<TDocument>): Promise<number> {
    return this.model.countDocuments(filterQuery)
  }
}