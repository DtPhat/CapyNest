import { IsNotEmpty, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  description: string

  @IsString()
  picture: string
}
