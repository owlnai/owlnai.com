import { defineEventHandler } from 'nuxt/server'
import { person, socials } from '../../app/data/site'

// The "Save contact" button on the About page: a vCard with my name, site and social profiles
export default defineEventHandler(() => {
  const [given, ...rest] = person.name.split(' ')
  const family = rest.join(' ')

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${family};${given};;;`,
    `FN:${person.name}`,
    `NICKNAME:${person.handle}`,
    'URL:https://owlnai.com',
    ...socials.map((social) => `X-SOCIALPROFILE;TYPE=${social.id}:${social.href}`),
    'END:VCARD',
  ]

  return new Response(`${lines.join('\r\n')}\r\n`, {
    headers: {
      'content-type': 'text/vcard; charset=utf-8',
      'content-disposition': 'attachment; filename="unai-mengual.vcf"',
    },
  })
})
