import { addLocaleData } from 'react-intl'

import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'
import it from 'react-intl/locale-data/it'

export const defaultLocale = 'en'

export const messages = {
  'en': require('../languages/en.json'),
  'es': require('../languages/es.json'),
  'it': require('../languages/it.json')
}

export const supportedLanguages = [
  { 'code': 'en', 'name': 'English' },
  { 'code': 'es', 'name': 'Español' },
  { 'code': 'it', 'name': 'Italiano' }
]

export const loadLocaleData = () => {
  addLocaleData([
    ...en,
    ...es,
    ...it
  ])
}

export const getUserLocale = () => {
  let language = defaultLocale

  if (window.userLocale) {
    language = window.userLocale
  } else if (navigator.language) {
    language = navigator.language
  }

  if (language in messages) {
    return language
  }
  return defaultLocale
}
