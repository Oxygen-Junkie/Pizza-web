import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import OpenLayersMap from 'vue3-openlayers'
import vue3StarRatings from 'vue3-star-ratings'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/styles.scss'
import 'uno.css'
import 'vue3-openlayers/dist/vue3-openlayers.css'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    ctx.app.use(OpenLayersMap)
    ctx.app.component('vue3-star-ratings', vue3StarRatings)
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
