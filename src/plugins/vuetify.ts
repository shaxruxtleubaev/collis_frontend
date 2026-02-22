import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#2563EB',        // Modern blue
          secondary: '#64748B',      // Slate
          accent: '#3B82F6',         // Light blue
          surface: '#FFFFFF',
          background: '#F8FAFC',     // Very light blue-gray
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
          success: '#10B981',
          'surface-dim': '#F1F5F9',
          'surface-light': '#E2E8F0'
        }
      }
    }
  }
})