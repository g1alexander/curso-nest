import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAvengerDto } from './dto/create-avenger.dto';
import { UpdateAvengerDto } from './dto/update-avenger.dto';
import { Model } from 'mongoose';
import { Avenger } from './entities/avenger.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AvengersService {
  constructor(
    @InjectModel(Avenger.name)
    private readonly avengerModel: Model<Avenger>,
  ) {}

  async create(createAvengerDto: CreateAvengerDto) {
    createAvengerDto.name = createAvengerDto.name.toLocaleLowerCase();

    try {
      const avenger = await this.avengerModel.create(createAvengerDto);

      return avenger;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Avenger already exists - ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.error(error);
      throw new InternalServerErrorException(
        'Something went wrong, check the logs',
      );
    }
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
