const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
]

export function timeAgo(iso: string) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000
  const format = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit)
  }
  return 'just now'
}

export function monthYear(iso: string) {
  return new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso))
}

// A month-only date ('2025-11') reads as "November 2025"
export function longDate(iso: string) {
  const day = /^\d{4}-\d{2}$/.test(iso) ? undefined : 'numeric'
  return new Intl.DateTimeFormat('en-GB', { day, month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso))
}
