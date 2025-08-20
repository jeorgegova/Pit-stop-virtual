import * as migration_20250816_031122_add_compatibles_to_products from './20250816_031122_add_compatibles_to_products';

export const migrations = [
  {
    up: migration_20250816_031122_add_compatibles_to_products.up,
    down: migration_20250816_031122_add_compatibles_to_products.down,
    name: '20250816_031122_add_compatibles_to_products'
  },
];
