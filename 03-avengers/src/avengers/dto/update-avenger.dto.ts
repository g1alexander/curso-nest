import { PartialType } from '@nestjs/mapped-types';
import { CreateAvengerDto } from './create-avenger.dto';

export class UpdateAvengerDto extends PartialType(CreateAvengerDto) {}
