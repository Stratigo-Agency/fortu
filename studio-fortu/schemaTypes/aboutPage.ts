import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'Tentang: Konten',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Main description about FORTU Digital',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Vision title (e.g., "Visi")',
          initialValue: 'Visi',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Main vision heading',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Vision description',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Mission title (e.g., "Misi")',
          initialValue: 'Misi',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Main mission heading',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          description: 'Mission description',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this content',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      active: 'isActive',
    },
    prepare({active}) {
      return {
        title: 'About Page Content',
        subtitle: active ? 'Active' : 'Inactive',
      }
    },
  },
})





