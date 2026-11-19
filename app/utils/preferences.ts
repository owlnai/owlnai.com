import { createColorScheme, createLocalStorage } from '@ui-sdk/core'

export const colorScheme = createColorScheme({
  global: true,
  storage: createLocalStorage('owlnai-color-scheme'),
})
