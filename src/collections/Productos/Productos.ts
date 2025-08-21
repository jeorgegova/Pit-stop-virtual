import type { CollectionConfig } from 'payload';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nombre del Producto', required: true },
    { name: 'description', type: 'textarea', label: 'Descripción', required: false },
    { name: 'price', type: 'number', label: 'Precio', required: true },
    {
      name: 'image',
      type: 'upload',
      label: 'Imagen del Producto',
      relationTo: 'media',
      required: false,
    },
    { name: 'category', type: 'text', label: 'Categoría', required: false },
    {
      name: 'compatibles',
      type: 'array',
      label: 'Automotores Compatibles',
      fields: [
        { name: 'vehicle', type: 'text', label: 'Vehículo Compatible', required: true },
      ],
      required: false,
    },
  ],
};

export default Products;