import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CurrentUser } from '@app/common';
import { JwtAuthGuard } from '../../../../libs/common/src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) { }

  @Post()
  create(
    @CurrentUser() currentUser,
    @Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(currentUser._id, createCollectionDto);
  }

  @Get()
  findAllByUser(
    @CurrentUser() currentUser
  ) {
    return this.collectionsService.findAllByUser(currentUser._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(id);
  }
}
