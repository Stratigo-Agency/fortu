import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productSlide',
  title: 'Product Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      description: 'Name displayed in the tab selector (e.g., "Cruiser", "Cruiser ST")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Main heading displayed on the slide (e.g., "The easy-rider")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slideImage',
      title: 'Slide Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Full-screen background image for this product slide',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Feature Tags',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureTag',
          fields: [
            defineField({
              name: 'text',
              title: 'Feature Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional icon name (e.g., "battery", "gps", "frame", "range", "power", "speed", "lock", "bluetooth", "app", "check", "timer")',
              options: {
                list: [
                  {title: 'None', value: ''},
                  {title: 'Battery', value: 'battery'},
                  {title: 'GPS', value: 'gps'},
                  {title: 'Frame', value: 'frame'},
                  {title: 'Range', value: 'range'},
                  {title: 'Power', value: 'power'},
                  {title: 'Speed', value: 'speed'},
                  {title: 'Lock', value: 'lock'},
                  {title: 'Bluetooth', value: 'bluetooth'},
                  {title: 'App', value: 'app'},
                  {title: 'Check', value: 'check'},
                  {title: 'Timer', value: 'timer'},
                  {title: 'Pen', value: 'pen'},
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'text',
              icon: 'icon',
            },
            prepare({title, icon}) {
              return {
                title: title || 'Untitled Feature',
                subtitle: icon ? `Icon: ${icon}` : 'No icon',
              }
            },
          },
        },
      ],
      description: 'Short feature highlights with optional icons',
    }),
    defineField({
      name: 'product',
      title: 'Linked Product',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'Optional: Link to a product for more details',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      description: 'Optional link when clicking on the slide',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which the slide appears (lower numbers appear first)',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this slide',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'slideImage',
      active: 'isActive',
    },
    prepare({title, subtitle, media, active}) {
      return {
        title: title || 'Untitled Slide',
        subtitle: `${active ? '✓' : '✗'} ${subtitle || ''}`,
        media,
      }
    },
  },
})

