import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateVocabularyDto {
  @IsString()
  @IsNotEmpty()
  sourceText: string;

  @IsString()
  @IsNotEmpty()
  translation: string;

  @IsMongoId()
  @IsNotEmpty()
  collectionId: Types.ObjectId;
}
