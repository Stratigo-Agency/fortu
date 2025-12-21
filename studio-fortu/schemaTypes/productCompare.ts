import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productCompare',
  title: 'Product Comparison',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Optional heading above the comparison',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      description: 'Optional description text',
    }),
    defineField({
      name: 'products',
      title: 'Products to Compare',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{type: 'product'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'highlightLabel',
              title: 'Highlight Label',
              type: 'string',
              description: 'Optional badge label (e.g., "New", "Best Seller", "Popular")',
            }),
            defineField({
              name: 'specs',
              title: 'Specification Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Display', value: 'display'},
                          {title: 'Chip/Processor', value: 'chip'},
                          {title: 'Camera', value: 'camera'},
                          {title: 'Battery', value: 'battery'},
                          {title: 'Storage', value: 'storage'},
                          {title: 'Connectivity', value: 'connectivity'},
                          {title: 'WiFi', value: 'wifi'},
                          {title: 'Weight', value: 'weight'},
                          {title: 'Dimensions', value: 'dimensions'},
                          {title: 'Material', value: 'material'},
                          {title: 'Warranty', value: 'warranty'},
                          {title: 'Brightness', value: 'brightness'},
                          {title: 'Operating System', value: 'os'},
                          {title: 'Touchscreen', value: 'touchscreen'},
                          {title: 'Check', value: 'check'},
                          {title: 'Star', value: 'star'},
                        ],
                      },
                    }),
                    defineField({
                      name: 'label',
                      title: 'Spec Label',
                      type: 'string',
                      description: 'Main spec text (e.g., "M5 chip", "12MP Camera")',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'subLabel',
                      title: 'Sub Label',
                      type: 'string',
                      description: 'Secondary text below the main label',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'subLabel',
                    },
                  },
                },
              ],
            }),
            defineField({
              name: 'ctaLabel',
              title: 'CTA Button Label',
              type: 'string',
              description: 'Button text (e.g., "Learn more", "Buy now")',
              initialValue: 'Learn more',
            }),
            defineField({
              name: 'ctaLink',
              title: 'CTA Link',
              type: 'string',
              description: 'Link URL for the button',
            }),
          ],
          preview: {
            select: {
              title: 'product.name',
              media: 'product.images.0',
              highlight: 'highlightLabel',
            },
            prepare({title, media, highlight}) {
              return {
                title: title || 'Select a product',
                subtitle: highlight || '',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 products can be compared'),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
        ],
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this comparison section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      products: 'products',
      active: 'isActive',
    },
    prepare({heading, products, active}) {
      const count = products?.length || 0
      return {
        title: heading || 'Product Comparison',
        subtitle: `${active ? '✓' : '✗'} ${count} product${count !== 1 ? 's' : ''}`,
      }
    },
  },
})

