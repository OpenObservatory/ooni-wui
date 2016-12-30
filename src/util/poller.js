import {fetch} from './api'

export class Poller {

  constructor(updateUrl = '/api/status/update',
              initializeUrl = '/api/status',
              delay = 1*1000) {
    this.initializeUrl = initializeUrl
    this.updateUrl = updateUrl
    this.delay = delay
  }

  start(onNotifySuccess, onNotifyError) {
    if (onNotifySuccess === undefined) {
      onNotifySuccess = (result) => {
        console.log("Unbound onNotifySuccess", result)
      }
    }
    if (onNotifyError === undefined) {
      onNotifyError = (error) => {
        console.log("Unbound onNotifyError", error)
      }
    }
    let self = this
    let current
    if (this.initializeUrl !== undefined) {
      fetch(this.initializeUrl)
        .then((result) => result.json())
        .then((json) => {
          onNotifySuccess(json)
        })
        .catch((ex) => {
          onNotifyError(ex)
        })
    }
    const tick = () => {
      if (current === undefined || current.$resolved)  {
        current = fetch(self.updateUrl)
          .then((result) => result.json())
          .then((json) => {
            current.$resolved = true
            onNotifySuccess(json)
          })
          .catch((ex) => {
            current.$resolved = true
            onNotifyError(ex)
          })
      }
      current.$resolved = false
    }
    tick()
    setInterval(tick, this.delay)
  }

}
