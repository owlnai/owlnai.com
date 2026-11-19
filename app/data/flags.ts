import be from 'circle-flags/flags/be.svg?url'
import es from 'circle-flags/flags/es.svg?url'
import fr from 'circle-flags/flags/fr.svg?url'
import pl from 'circle-flags/flags/pl.svg?url'

// Keyed by the `country` code in a place's front matter.
// To support another country, import its flag above and add it here.
export const flags: Record<string, { src: string; name: string }> = {
  be: { src: be, name: 'Belgium' },
  es: { src: es, name: 'Spain' },
  fr: { src: fr, name: 'France' },
  pl: { src: pl, name: 'Poland' },
}
