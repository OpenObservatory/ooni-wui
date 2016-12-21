import realFetch from 'isomorphic-fetch';

export function fetch(url, options) {
  // Add XSRF protection in here
  return realFetch(url, options)
}
