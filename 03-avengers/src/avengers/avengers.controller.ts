import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // HttpCode,
  // HttpStatus,
} from '@nestjs/common';
import { AvengersService } from './avengers.service';
import { CreateAvengerDto } from './dto/create-avenger.dto';
import { UpdateAvengerDto } from './dto/update-avenger.dto';

@Controller('avengers')
export class AvengersController {
  constructor(private readonly avengersService: AvengersService) {}

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  create(@Body() createAvengerDto: CreateAvengerDto) {
    return this.avengersService.create(createAvengerDto);
  }

  @Get()
  findAll() {
    return this.avengersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avengersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvengerDto: UpdateAvengerDto) {
    return this.avengersService.update(+id, updateAvengerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avengersService.remove(+id);
  }
}
