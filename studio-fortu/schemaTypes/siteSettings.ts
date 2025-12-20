import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Social Media & Company Information',
  type: 'document',
  groups: [
    {name: 'contact', title: 'Contact Information', default: true},
    {name: 'social', title: 'Social Media'},
    {name: 'branding', title: 'Branding'},
  ],
  fields: [
    // CONTACT INFORMATION
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'branding',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'branding',
      description: 'Short company description for footer',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'branding',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      group: 'contact',
      rows: 3,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      group: 'contact',
      description: 'WhatsApp number with country code (e.g., +6289684073110)',
    }),
    // SOCIAL MEDIA
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      fields: [
        defineField({
          name: 'twitter',
          title: 'Twitter / X',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      media: 'logo',
    },
    prepare({title, media}) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global site configuration',
        media,
      }
    },
  },
})

