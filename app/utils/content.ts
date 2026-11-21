import type { Ref } from 'vue'

// A content fetch that fails must fail the page, and with it the prerender, instead of rendering an empty section
export function assertLoaded(error: Ref<unknown>, what: string) {
  if (error.value) throw createError({ status: 500, statusText: `Could not load ${what}`, fatal: true, cause: error.value })
}
