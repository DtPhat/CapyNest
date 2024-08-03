import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Content } from "../models/story.schema";

export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  // @Prop({ required: true, default: 0 })
  // views: number;
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  display_image: string;

  @IsArray()
  contents: Content[];

  @IsString()
  @IsNotEmpty()
  category: string;

  // @Prop({ required: true, default: [] })
  // comment: Comment[];

  level: string;

  isPremium: boolean
}