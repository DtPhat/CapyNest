import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Vocabulary extends AbstractDocument {
  @Prop({ required: true })
  sourceText: string;

  @Prop({ required: true })
  translation: string;

  @Prop({ type: Types.ObjectId, ref: 'Collection', required: true })
  collectionId: Types.ObjectId;
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);