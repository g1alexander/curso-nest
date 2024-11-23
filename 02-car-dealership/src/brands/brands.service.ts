import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { Brand } from './entities/brand.entity';
import { v7 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Brand 1',
      createdAt: Date.now(),
    },
    {
      id: uuid(),
      name: 'Brand 2',
      createdAt: Date.now(),
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLowerCase(),
      createdAt: Date.now(),
    };

    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const findBrand = this.findOne(id);

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        return { ...brand, ...findBrand, ...updateBrandDto };
      }

      return brand;
    });

    return updateBrandDto;
  }

  remove(id: string) {
    const findBrand = this.findOne(id);

    this.brands = this.brands.filter((brand) => brand.id !== findBrand.id);
  }
}
