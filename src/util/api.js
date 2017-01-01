import realFetch from 'isomorphic-fetch'
import cookie from 'react-cookie'

export function fetch (url, options = {}) {
  // Add XSRF protection in here
  const xsrfToken = cookie.load('XSRF-TOKEN')
  if (xsrfToken) {
    options = {
      ...options,
      credentials: 'same-origin',
      headers: { ...options.headers, 'X-XSRF-TOKEN': xsrfToken }
    }
  }
  return realFetch(url, options)
}
