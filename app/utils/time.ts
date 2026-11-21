const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
]

// Built once: constructing an Intl formatter costs a few milliseconds, and a page formats many dates
const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const shortMonth = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })
const longMonth = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const longDay = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export function timeAgo(iso: string) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return relative.format(Math.round(seconds / size), unit)
  }
  return 'just now'
}

export function monthYear(iso: string) {
  return shortMonth.format(new Date(iso))
}

// A month-only date ('2025-11') reads as "November 2025"
export function longDate(iso: string) {
  return (/^\d{4}-\d{2}$/.test(iso) ? longMonth : longDay).format(new Date(iso))
}
