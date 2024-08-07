import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Content } from "../models/story.schema";

export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

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

  @IsString()
  level: string;

  @IsBoolean()
  isPremium: boolean
}