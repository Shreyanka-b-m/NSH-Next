import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidateProperties'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },

    {
      name: 'address',
      type: 'text',
    },

    {
      name: 'city',
      type: 'text',
    },

    {
      name: 'state',
      type: 'text',
    },

    {
      name: 'price',
      type: 'number',
    },

    {
      name: 'bedrooms',
      type: 'number',
    },

    {
      name: 'bathrooms',
      type: 'number',
    },

    {
      name: 'acArea',
      label: 'AC Area',
      type: 'text',
    },

    {
      name: 'designTheme',
      type: 'text',
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'broker',
      type: 'text',
    },

    {
      name: 'builder',
      type: 'text',
    },

    {
      name: 'architect',
      type: 'text',
    },

    {
      name: 'interiorDesigner',
      type: 'text',
    },

    {
      name: 'isFeatured',
      label: 'Featured Property',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'featuredImage',
      label: 'Homepage Featured Image',
      type: 'upload',
      relationTo: 'media',

      admin: {
        condition: (_, data) => data.isFeatured,
      },
    },

    {
      name: 'featuredDisplayName',
      label: 'Featured Display Name',
      type: 'text',
      admin: {
        description:
          'Optional name shown in the homepage featured slider instead of the property name.',
        condition: (_, data) => data.isFeatured,
      },
    },

    {
      name: 'gallery',
      type: 'array',

      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },

        {
          name: 'showInBanner',
          label: 'Show In Banner Slider',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },

    {
      name: 'floorPlans',
      type: 'array',

      fields: [
        {
          name: 'title',
          type: 'text',
        },

        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    {
      name: 'virtualTourUrl',
      label: 'Virtual Tour URL',
      type: 'text',
    },

    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'for-sale',

      options: [
        {
          label: 'For Sale',
          value: 'for-sale',
        },
        {
          label: 'Sold Out',
          value: 'sold-out',
        },
        {
          label: 'Under Contract',
          value: 'under-contract',
        },
      ],
    },

    {
      name: 'cardImage',
      label: 'Property Card Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
