import es from 'circle-flags/flags/es.svg?url'
import fr from 'circle-flags/flags/fr.svg?url'

export interface Place {
  code: string
  country: string
  note?: string
  flag: string
}

// To add a country, import its flag above by ISO code and add a line here.
export const places: Place[] = [
  { code: 'es', country: 'Spain', note: 'Home', flag: es },
  { code: 'fr', country: 'France', note: 'Bordeaux', flag: fr },
]
