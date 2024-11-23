import { Brand } from 'src/brands/entities/brand.entity';
import { v7 as uuid } from 'uuid';

export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Toyota',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Honda',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Ford',
    createdAt: Date.now(),
  },
];
