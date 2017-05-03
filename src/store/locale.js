import { addLocaleData } from 'react-intl'

import ar from 'react-intl/locale-data/ar'
import el from 'react-intl/locale-data/el'
import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'
import fr from 'react-intl/locale-data/fr'
import fa from 'react-intl/locale-data/fa'
import it from 'react-intl/locale-data/it'
import hi from 'react-intl/locale-data/hi'
import ru from 'react-intl/locale-data/ru'

export const defaultLocale = 'en'

/* IMPORTANT!
  When adding a new supported language remember to also add it to main.mobile.js and main.js!
 */

export const messages = {
  'ar': require('../languages/ar.json'),
  'el': require('../languages/el.json'),
  'en': require('../languages/en.json'),
  'es': require('../languages/es.json'),
  'fa': require('../languages/fa.json'),
  'fr': require('../languages/fr.json'),
  'it': require('../languages/it.json'),
  'hi': require('../languages/hi.json'),
  'ru': require('../languages/ru.json')
}

export const supportedLanguages = [
  { 'code': 'ar', 'name': 'العَرَبِيَّة‎‎' },
  { 'code': 'el', 'name': 'ελληνικά' },
  { 'code': 'en', 'name': 'English' },
  { 'code': 'es', 'name': 'Español' },
  { 'code': 'fa', 'name': 'فارسی' },
  { 'code': 'fr', 'name': 'Français' },
  { 'code': 'it', 'name': 'Italiano' },
  { 'code': 'hi', 'name': 'हिन्दी' },
  { 'code': 'ru', 'name': 'ру́сский' }
]

export const loadLocaleData = () => {
  addLocaleData([
    ...ar,
    ...el,
    ...en,
    ...es,
    ...fa,
    ...fr,
    ...it,
    ...hi,
    ...ru
  ])
}

export const getUserLocale = () => {
  let language = defaultLocale

  if (window.userLocale) {
    if (typeof window.userLocale.get === 'function') {
      language = window.userLocale.get()
    } else {
      language = window.userLocale
    }
  } else if (navigator.language) {
    language = navigator.language
  }

  if (language in messages) {
    return language
  }
  return defaultLocale
}

const RTLLocales = [
  'ar',
  'fa',
  'he'
]

export const getDirection = (locale) => {
  if (RTLLocales.indexOf(locale) !== -1) {
    return 'rtl'
  }
  return 'ltr'
}
