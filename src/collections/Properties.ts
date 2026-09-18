import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
    slug: 'properties',
    admin: {
        useAsTitle: 'name',
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
        
    ],  
}
