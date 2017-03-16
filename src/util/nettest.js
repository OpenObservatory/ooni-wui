import React from 'react'

export const snakeToHuman = (string) => {
  string = string || ''
  string = string.toString()
  string = string.trim()
  string = string.replace(/_/g, ' ')
  string = string.charAt(0).toUpperCase() + string.slice(1)
  return string
}

const NETTEST_PRETTY_NAMES = {
  'web_connectivity': 'Web Connectivity',
  'facebook_messenger': 'Facebook Messenger',
  'http_header_field_manipulation': 'HTTP Header Field Manipulation',
  'http_invalid_request_line': 'HTTP Invalid Request Line',
  'whatsapp': 'WhatsApp',
  'ndt': 'NDT Speed Test',
  'meek_fronted_requests_test': 'Meek Circumvention Test',
  'vanilla_tor': 'Vanilla Tor',
  'tcp_connect': 'TCP Connect'
}

export const getPrettyNettestName = (testName) => {
  const name = NETTEST_PRETTY_NAMES[testName]

  return name || snakeToHuman(testName)
}

const OONI_ICONS = {
  'oo-tor': 'ooni icon-tor',
  'oo-unknown': 'ooni icon-censorship-tampering'
}

export const getDeckIcon = (iconName, other) => {
  let className = 'medium-icon '
  console.log('I got', iconName, other)
  if (iconName && iconName.startsWith('fa-')) {
    className += `fa ${iconName}`
  } else {
    let iconClass = OONI_ICONS[iconName] || OONI_ICONS['oo-unknown']
    className += iconClass
  }
  return (
    <i className={className} />
  )
}
