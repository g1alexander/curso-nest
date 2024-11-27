import { Module } from '@nestjs/common';
import { AvengersService } from './avengers.service';
import { AvengersController } from './avengers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Avenger, AvengerSchema } from './entities/avenger.entity';

@Module({
  controllers: [AvengersController],
  providers: [AvengersService],
  imports: [
    MongooseModule.forFeature([{ name: Avenger.name, schema: AvengerSchema }]),
  ],
})
export class AvengersModule {}
