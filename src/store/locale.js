import { addLocaleData } from 'react-intl'

// import el from 'react-intl/locale-data/el'
import en from 'react-intl/locale-data/en'
// import es from 'react-intl/locale-data/es'
// import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'
// import ru from 'react-intl/locale-data/ru'

export const defaultLocale = 'en'

export const messages = {
  // 'el': require('../languages/el.json'),
  'en': require('../languages/en.json'),
  // 'es': require('../languages/es.json'),
  // 'fr': require('../languages/fr.json'),
  'it': require('../languages/it.json')
  // 'ru': require('../languages/ru.json')
}

export const supportedLanguages = [
  // { 'code': 'el', 'name': 'GR' },
  { 'code': 'en', 'name': 'EN' },
  // { 'code': 'es', 'name': 'ES' },
  // { 'code': 'fr', 'name': 'FR' },
  { 'code': 'it', 'name': 'IT' }
  // { 'code': 'ru', 'name': 'RU' }
]

export const loadLocaleData = () => {
  addLocaleData([
    // ...el,
    ...en,
    // ...es,
    // ...fr,
    ...it
    // ...ru
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
