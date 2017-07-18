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

export const getDeckIconClassName = (iconName) => {
  if (iconName && iconName.startsWith('fa-')) {
    return `fa ${iconName}`
  } else {
    let iconClass = OONI_ICONS[iconName] || OONI_ICONS['oo-unknown']
    return iconClass
  }
}

export const getDeckIcon = (iconName, other) => {
  let className = 'medium-icon '
  className += getDeckIconClassName(iconName)
  return (
    <i className={className} />
  )
}

export const MLAB_LOC_TO_COUNTRY = {
  'yyz01': 'CA',
  'yyc01': 'CA',
  'yul01': 'CA',
  'wlg02': 'NZ',
  'wlg01': 'NZ',
  'vie01': 'AT',
  'tun01': 'TN',
  'trn01': 'IT',
  'tpe01': 'TW',
  'tnr01': 'MG',
  'syd02': 'AU',
  'syd01': 'AU',
  'svg01': 'NO',
  'sin01': 'SG',
  'sea05': 'US',
  'sea04': 'US',
  'sea03': 'US',
  'sea02': 'US',
  'sea01': 'US',
  'prg01': 'CZ',
  'par01': 'FR',
  'ord05': 'US',
  'ord04': 'US',
  'ord03': 'US',
  'ord02': 'US',
  'ord01': 'US',
  'nuq06': 'US',
  'nuq05': 'US',
  'nuq04': 'US',
  'nuq03': 'US',
  'nuq02': 'US',
  'nuq01': 'US',
  'nbo01': 'KE',
  'mnl01': 'PH',
  'mil01': 'IT',
  'mia05': 'US',
  'mia04': 'US',
  'mia03': 'US',
  'mia02': 'US',
  'mia01': 'US',
  'mad01': 'ES',
  'los01': 'NG',
  'lju01': 'SI',
  'lhr01': 'GB',
  'lga07': 'US',
  'lga06': 'US',
  'lga05': 'US',
  'lga04': 'US',
  'lga03': 'US',
  'lga02': 'US',
  'lga01': 'US',
  'lca01': 'CY',
  'lba01': 'GB',
  'lax05': 'US',
  'lax04': 'US',
  'lax03': 'US',
  'lax02': 'US',
  'lax01': 'US',
  'jnb01': 'ZA',
  'iad05': 'US',
  'iad04': 'US',
  'iad03': 'US',
  'iad02': 'US',
  'iad01': 'US',
  'hnd01': 'JP',
  'ham01': 'DE',
  'dub01': 'IE',
  'dfw05': 'US',
  'dfw04': 'US',
  'dfw03': 'US',
  'dfw02': 'US',
  'dfw01': 'US',
  'den04': 'US',
  'den03': 'US',
  'den02': 'US',
  'den01': 'US',
  'bog01': 'CO',
  'bkk01': 'TH',
  'beg01': 'RS',
  'atl05': 'US',
  'atl04': 'US',
  'atl03': 'US',
  'atl02': 'US',
  'atl01': 'US',
  'ath03': 'GR',
  'ath02': 'GR',
  'ath01': 'GR',
  'arn01': 'SE',
  'ams02': 'NL',
  'ams01': 'NL',
  'akl01': 'NZ',
  'acc02': 'GH',
  'acc01': 'GH'
}

export const mlabServerToCountry = (serverAddress) => {
  return MLAB_LOC_TO_COUNTRY[serverAddress.split('.')[3]]
}

export const mlabServerToName = (serverAddress) => {
  return serverAddress.split('.').slice(3, 4).join('.')
}
