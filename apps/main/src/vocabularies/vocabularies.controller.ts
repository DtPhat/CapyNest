import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VocabulariesService } from './vocabularies.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { JwtAuthGuard } from '../../../../libs/common/src/guards/jwt-auth.guard';
import { Types } from 'mongoose';

@UseGuards(JwtAuthGuard)
@Controller('vocabularies')
export class VocabulariesController {
  constructor(private readonly vocabulariesService: VocabulariesService) { }

  @Post()
  create(@Body() createVocabularyDto: CreateVocabularyDto) {
    return this.vocabulariesService.create({
      ...createVocabularyDto,
      collectionId: new Types.ObjectId(createVocabularyDto.collectionId)
    });
  }
  @Get(':collectionId')
  findAllByCollection(@Param('collectionId') collectionId: string) {
    return this.vocabulariesService.findAllByCollection(collectionId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVocabularyDto: UpdateVocabularyDto) {
    return this.vocabulariesService.update(+id, updateVocabularyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocabulariesService.remove(id);
  }
}
