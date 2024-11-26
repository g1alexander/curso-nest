import { Injectable } from '@nestjs/common';
import { CreateAvengerDto } from './dto/create-avenger.dto';
import { UpdateAvengerDto } from './dto/update-avenger.dto';

@Injectable()
export class AvengersService {
  create(createAvengerDto: CreateAvengerDto) {
    return 'This action adds a new avenger';
  }

  findAll() {
    return `This action returns all avengers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} avenger`;
  }

  update(id: number, updateAvengerDto: UpdateAvengerDto) {
    return `This action updates a #${id} avenger`;
  }

  remove(id: number) {
    return `This action removes a #${id} avenger`;
  }
}
