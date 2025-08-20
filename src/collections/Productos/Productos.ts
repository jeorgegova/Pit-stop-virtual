import type { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products', // Nombre único para la colección (usado en la API)
  admin: {
    useAsTitle: 'name', // Campo que se mostrará como título en el panel de administración
  },
  access: {
    read: () => true, // Permite que todos lean los productos
    create: () => true, // Ajusta según tus necesidades de permisos
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre del Producto',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      required: false,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Precio',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Imagen del Producto',
      relationTo: 'media', // Relación con la colección de medios (debe estar configurada)
      required: false,
    },
    {
      name: 'category',
      type: 'text',
      label: 'Categoría',
      required: false,
    },
    // Nuevo campo para automotores compatibles
    {
      name: 'compatibles', // Nombre del campo (úsalo en consultas y en el tipo Product)
      type: 'array', // Tipo arreglo para múltiples valores
      label: 'Automotores Compatibles',
      fields: [
        {
          name: 'vehicle', // Nombre del subcampo (ej. "Toyota Corolla")
          type: 'text',
          label: 'Vehículo Compatible',
          required: true,
        },
      ],
      required: false, // Opcional, pero puedes hacerlo required si es necesario
    },
  ],
};

export default Products;