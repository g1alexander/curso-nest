import { Module } from '@nestjs/common';
import { AvengersService } from './avengers.service';
import { AvengersController } from './avengers.controller';

@Module({
  controllers: [AvengersController],
  providers: [AvengersService],
})
export class AvengersModule {}
