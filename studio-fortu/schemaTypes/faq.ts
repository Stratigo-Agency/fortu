import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Main heading for the FAQ section',
      initialValue: 'Frequently Asked Questions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      description: 'Optional description below the heading',
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Untitled Question',
                subtitle: subtitle ? subtitle.substring(0, 80) + '...' : '',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one FAQ item is required'),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which the FAQ section appears (lower numbers appear first)',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this FAQ section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      items: 'items',
      active: 'isActive',
    },
    prepare({title, items, active}) {
      const itemCount = items?.length || 0
      return {
        title: title || 'FAQ Section',
        subtitle: `${active ? '✓' : '✗'} ${itemCount} question${itemCount !== 1 ? 's' : ''}`,
      }
    },
  },
})

