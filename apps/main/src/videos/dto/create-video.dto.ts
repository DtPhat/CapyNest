import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export interface Transcript {
  sentence: string,
  timestamp: number,
  translation: string
}

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;

  @IsString()
  @IsNotEmpty()
  channel: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsString()
  @IsNotEmpty()
  caption: string;

  @IsNumber()
  duration: number;

  @IsArray()
  transcripts: Transcript[];

  @IsBoolean()
  isPremium: boolean
}