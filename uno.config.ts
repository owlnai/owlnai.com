import { defineConfig, presetIcons, presetWebFonts } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      cdn: 'https://esm.sh/'
    })
  ],
})