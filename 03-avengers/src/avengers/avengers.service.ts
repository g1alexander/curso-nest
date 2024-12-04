import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAvengerDto } from './dto/create-avenger.dto';
import { UpdateAvengerDto } from './dto/update-avenger.dto';
import { isValidObjectId, Model } from 'mongoose';
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
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all avengers`;
  }

  async findOne(term: string) {
    let avenger: Avenger;

    if (isValidObjectId(term)) {
      avenger = await this.avengerModel.findById(term);
    }

    if (!avenger) {
      const filter = !isNaN(Number(term))
        ? { no: term }
        : { name: term.toLowerCase().trim() };

      avenger = await this.avengerModel.findOne(filter);
    }

    if (avenger) return avenger;

    throw new BadRequestException(
      `Avenger with id or no or name ${term} not found`,
    );
  }

  async update(term: string, updateAvengerDto: UpdateAvengerDto) {
    const avenger = await this.findOne(term);

    if (updateAvengerDto.name) {
      updateAvengerDto.name = updateAvengerDto.name.toLowerCase();
    }

    try {
      await avenger.updateOne(updateAvengerDto);

      return { ...avenger.toJSON(), ...updateAvengerDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const avenger = await this.findOne(id);

    // await avenger.deleteOne();

    // return this.avengerModel.findByIdAndDelete(id);

    const { deletedCount } = await this.avengerModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new BadRequestException(`Id ${id} not found`);
    }
  }

  private handleExceptions(error: any) {
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
