import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v7 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Honda', model: 'Civic' },
    { id: uuid(), brand: 'Jeep', model: 'Cherokee' },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car = { id: uuid(), ...createCarDto };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    const findCar = this.findOneById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        return { ...car, ...findCar, ...updateCarDto };
      }

      return car;
    });

    return updateCarDto;
  }

  delete(id: string) {
    const findCar = this.findOneById(id);

    this.cars = this.cars.filter((car) => car.id !== findCar.id);

    // return { message: `car with id ${id} was delete` };
  }
}
