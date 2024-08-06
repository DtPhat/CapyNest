import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Schema({ versionKey: false, timestamps: true })
export class Collection extends AbstractDocument {
  @Prop({ required: true })
  name: string

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId

  @Prop({ default: '' })
  description: string

  @Prop({ default: '' })
  picture: string
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);