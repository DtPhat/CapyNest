import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface Transcript {
  sentence: string,
  timestamp: number,
  translation: string
}

@Schema({ versionKey: false, timestamps: true })
export class Video extends AbstractDocument {
  @Prop({ required: true })
  videoId: string;

  @Prop({ required: true, default: 0 })
  category: String;

  @Prop({ required: true })
  channel: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true, default: [] })
  caption: String;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  transcripts: Transcript[]

  @Prop({ required: true })
  isPremium: boolean
}

export const VideoSchema = SchemaFactory.createForClass(Video);