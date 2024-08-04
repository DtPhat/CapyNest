import { IsString } from "class-validator"

export class FilterVideosDto {
  caption: string

  category: string

  level: string

}