import axios from 'axios'
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'

const project = require('../config/project.config')
const transifexRcPath = path.join(process.env.HOME, '.transifexrc')
const sourceLanguage = 'en'
let username, password

const fail = () => {
  console.log("You must create a ~/.transifexrc file with in it:")
  console.log("username = YOURUSER")
  console.log("password = YOURPASSWORD (also API key)")
  process.exit(1)
}

const setupTransifex = () => {

  if (!fs.existsSync(transifexRcPath)) {
    console.log('Could not find ' + transifexRcPath)
    fail()
  }

  fs.readFileSync(transifexRcPath).toString()
    .split('\n').forEach(function(line) {
      var parseLine = function(l) {
          return l.split('=').slice(1).join('').replace(/^\s+/, '')
      }
      if (line.startsWith('username')) {
          username = parseLine(line)
      }
      if (line.startsWith('password')) {
          password = parseLine(line)
      }
  })

  if (!password || !username) {
    fail()
  }

  return axios.create({
    baseURL: 'https://www.transifex.com/api/2/',
    auth: {
      username,
      password
    }
  })
}

require('yargs')
  .usage('$0 <cmd>')
  .command('push', 'push translations', {
  }, runPush)
  .command('pull', 'pull translations', {
    onlyReviewed: {
      default: false
    },
    threshold: {
      help: 'include translations that are greater or equal to this percentage',
      default: 100
    }
  }, runPull)
  .help()
  .argv

function runPush(argv) {
  let transifex = setupTransifex()
  console.log('WARNING!')
  console.log('Pushing new translations can lead to the translations on transifex being overriden')
  inquirer.prompt([{
    type: 'confirm',
    name: 'sure',
    message: 'Do you want to continue?',
    default: false
  }])
    .then(({sure}) => {
      if (sure === false) {
        console.log('Ok. Quiting')
        process.exit(1)
      }
      fs.readFile(path.resolve(project.paths.client(),
                               'languages', 'en.json'), 'utf-8',
                  (err, data) => {
        transifex.put('/project/ooniprobe/resource/enjson/content',
                      { content: data },
                      { headers: { 'Content-Type': 'application/json' } })
          .then((resp) => {
            if (resp.status === 200) {
              console.log('Source language updated')
            } else {
              console.log('Error in updating source language')
              console.log(resp)
            }
        })
        .catch((error) => {
          console.log('Error in updating source language')
          console.log(error)
        })
      })
    })
}

async function runPull(argv) {
  let transifex = setupTransifex()
  let resp = await transifex.get('/project/ooniprobe/resource/enjson/stats')
  let completeLanguages = []
  for (let langCode in resp.data) {
    if (langCode == sourceLanguage) {
      continue
    }
    let stats = resp.data[langCode]
    console.log(langCode + ': ' + stats.completed)
    if (argv.onlyReviewed && Number(stats.reviewed.split('%')[0]) >= argv.threshold) {
      continue
    }
    if (Number(stats.completed.split('%')[0]) >= argv.threshold) {
      completeLanguages.push(langCode)
    }
  }
  completeLanguages.map((langCode) => {
    transifex.get(
        `/project/ooniprobe/resource/enjson/translation/${langCode}`)
      .then((resp) => {
        let dstPath = path.resolve(project.paths.client(),
                                   'languages', langCode+'.json')
        fs.writeFile(dstPath, resp.data.content, (err) => {
          if (err) {
            return console.log(err)
          }
          console.log("Wrote: " + dstPath)
        })
      })
  })
}
