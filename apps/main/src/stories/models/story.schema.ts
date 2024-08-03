import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Story extends AbstractDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  // @Prop({ required: true, default: 0 })
  // views: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  display_image: string;

  @Prop({ required: true })
  contents: Content[];

  @Prop({ required: true })
  category: string;

  // @Prop({ required: true, default: [] })
  // comment: Comment[];

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  isPremium: boolean
}


export interface Comment {
  account_id: string,
  message: string
}

export interface Content {
  chapter: string,
  content: string
}



export const StorySchema = SchemaFactory.createForClass(Story);
