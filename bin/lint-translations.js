import path from 'path'
import * as fs from 'fs'
import { sync as globSync } from 'glob'

const project = require(path.resolve(__dirname, 'config/project.config'))

const LANG_DIR = path.resolve(project.paths.client(), 'languages/')

const lintString = (translatedString, sourceString) => {
  let errors = {
    'mismatchVars': []
  }
  const varRxp = /(\{.+?\})/g
  let match = varRxp.exec(sourceString)
  while (match !== null) {
    if (translatedString.indexOf(match[0]) === -1) {
      errors['mismatchVars'].push(match[0])
    }
    match = varRxp.exec(sourceString)
  }
  return errors
}

const lintFile = (filename, sourceLanguage) => {
  let errors;
  const lang = JSON.parse(fs.readFileSync(filename))
  Object.keys(lang).forEach((key) => {
    errors = lintString(lang[key], sourceLanguage[key])
    if (errors['mismatchVars'].length > 0) {
      console.log('ERROR in "' + filename + '"['+key+']: mismatchVars: ' + errors['mismatchVars'])
    }
  })
}

const lintTranslations = () => {
  const sourceLanguage = JSON.parse(fs.readFileSync(path.resolve(LANG_DIR, 'en.json')))
  globSync(path.resolve(LANG_DIR, '*.json')).forEach((filename) => {
    if (filename.endsWith('en.json')) {
      return
    }
    lintFile(filename, sourceLanguage)
  })
}

lintTranslations()
