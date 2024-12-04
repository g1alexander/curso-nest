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
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

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

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.avengersService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateAvengerDto: UpdateAvengerDto,
  ) {
    return this.avengersService.update(term, updateAvengerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.avengersService.remove(id);
  }
}
