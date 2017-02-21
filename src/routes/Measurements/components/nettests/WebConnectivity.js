import React from 'react'
import { FormattedMessage } from 'react-intl'

export const WebConnectivityDetails = ({ measurement }) => {
  return (
    <div>
      {/* Normal measurement */}
      {measurement.test_keys.accessible !== false && measurement.test_keys.blocking === false &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o' />
          {' '}<FormattedMessage
            id='nettests.webConnectivity.noCensorshipDetected'
            defaultMessage='No censorship detected'
          />
        </h2>
        <p>
          <FormattedMessage
            id='nettests.webConnectivity.websiteAccessibleUncensored'
            defaultMessage='The website appears to be accessible and uncensored from this network.'
          />
        </p>
      </div>
      }
      {(measurement.test_keys.accessible === true || measurement.test_keys.accessible === null) &&
      measurement.test_keys.blocking === null &&
      <div>
        <h2 className='result-warning'><i className='fa fa-exclamation-circle' />
          {' '}<FormattedMessage
            id='nettests.webConnectivity.errorInMeasurement'
            defaultMessage='Error in measurement' />
        </h2>
        {measurement.test_keys.accessible === true &&
        <p>
          <FormattedMessage
            id='nettests.webConnectivity.websiteUp'
            defaultMessage='This website is up, but there was a problem in assessing whether or not it is being censored.'
          />
        </p>
        }
        {measurement.test_keys.accessible === null &&
        <p>
          <FormattedMessage
            id='nettests.webConnectivity.thereWasAnError'
            defaultMessage='There was an error in understanding if this site is up and/or censored.'
          />
        </p>
        }
      </div>
      }

      {/* Site inaccessible */}
      {measurement.test_keys.accessible === false && (
          measurement.test_keys.blocking === false || measurement.test_keys.blocking === null
        ) &&
        <div>
          <h2 className='result-warning'><i className='fa fa-exclamation-circle' />
            {' '}<FormattedMessage
              id='nettests.webConnectivity.websiteUnavailable'
              defaultMessage='Website unavailable'
            />
          </h2>
          <p>
            <FormattedMessage
              id='nettests.webConnectivity.websiteUnavailableDesc'
              defaultMessage='This website does not appear to be available at the moment. Requests from the control vantage point are also failing.'
            />
          </p>
        </div>
      }

      {/* Evidence of censorship */}
      {measurement.test_keys.blocking !== null && measurement.test_keys.blocking !== false &&
      <div>
        <h2 className='result-danger'><i className='fa fa-times-circle-o' />
          {' '}<FormattedMessage
            id='nettests.webConnectivity.evidenceOfCensorship'
            defaultMessage='Evidence of possible censorship'
          />
        </h2>
      </div>
      }

      {measurement.test_keys.blocking === 'dns' &&
      <p>
        <FormattedMessage
          id='nettests.webConnectivity.censorshipDNSBased'
          defaultMessage='This site appears to be blocked due to {dnsCensorship}.'
          values={{
            dnsCensorship: <strong><FormattedMessage
              id='nettest.webConnectivity.censorshipDNSBased.reason'
              defaultMessage='DNS based censorship'
            /></strong>
          }}
        />
      </p>}

      {measurement.test_keys.blocking === 'http-diff' &&
      <p>
        <FormattedMessage
          id='nettests.webConnectivity.httpDiff'
          defaultMessage='This site appears to be blocked because it presents a {differentHTTPResponse}.'
          values={{
            differentHTTPResponse: <strong>
              <FormattedMessage
                id='nettests.webConnectivity.httpDiff.reason'
                defaultMessage='different HTTP response'
              />
            </strong>
          }}
        />
      </p>
      }

      {measurement.test_keys.blocking === 'http-failure' &&
      <p>
        <FormattedMessage
          id='nettests.webConnectivity.httpFailure'
          defaultMessage='This site appears to be blocked because the {HTTPRequestFailed} with {errorMessage}.'
          values={{
            HTTPRequestFailed: <strong><FormattedMessage
              id='nettests.webConnectivity.httpFailure.what'
              defaultMessage='HTTP request failed'
            /></strong>,
            errorMessage: <code>{measurement.test_keys.http_experiment_failure}</code>
          }}
        />
      </p>
      }

      {measurement.test_keys.blocking === 'tcp_ip' &&
      <p>
        <FormattedMessage
          id='nettests.webConnectivity.tcpIP'
          defaultMessage='This site appears to be blocked by means of {TCPIPBasedBlocking}'
          values={{
            TCPIPBasedBlocking: <strong><FormattedMessage
              id='nettests.webConnectivity.tcpIP.reason'
              defaultMessage='TCP/IP based blocking'
            /></strong>
          }}
        />
      </p>
      }

      {measurement.test_keys.blocking !== false &&
      measurement.test_keys.blocking != null &&
      <div className='circumvention-strategies'>
        <h3><i className='ooni icon-tor' />
          {' '}<FormattedMessage
            id='nettests.webConnectivity.circumventionStrategies.title'
            defaultMessage='Circumvention strategies'
          />
        </h3>
        <p>
          <FormattedMessage
            id='nettests.webConnectivity.circumventionStrategies.text1'
            defaultMessage='You can try to circumvent the blocking of the site {siteURL} through the following:'
            values={{
              siteURL: <code>{measurement.input}</code>
            }}
          />
        </p>
        {(measurement.test_keys.blocking === 'http-diff' ||
          measurement.test_keys.blocking === 'http-failure') &&
        measurement.input.substr(0, 5) !== 'https' &&
        <div className='circumvention-strategy'>
          <h3>
            {' '}<FormattedMessage
              id='nettests.circumventionStrategies.useHTTPS.title'
              defaultMessage='Use Secure HTTP (HTTPS)'
            />
          </h3>
          <p>
            <FormattedMessage
              id='nettests.circumventionStrategies.useHTTPS.text'
              defaultMessage='Try visiting the {https} version of the website in question by accessing it via {url}'
              values={{
                https: <strong>HTTPS</strong>,
                url: <a target='_blank'
                  href={`https${measurement.input.substr(4)}`}>https{measurement.input.substr(4)}</a>
              }}
            />
          </p>
        </div>
        }
        {measurement.test_keys.blocking === 'dns' &&
        <div className='circumvention-strategy'>
          <h3>
            {' '}<FormattedMessage
              id='nettests.webConnectivity.circumvention.changeDNS.title'
              defaultMessage='Change your DNS'
            />
          </h3>
          <p>
            <FormattedMessage
              id='nettests.webConnectivity.circumvention.changeDNS.text'
              defaultMessage='Try {changeDNS} to one that does not implement blocking, such as OpenDNS ({openDNS}) or Google DNS: {googleDNS}.'
              values={{
                changeDNS: <strong><FormattedMessage
                  id='nettests.webConnectivity.circumvention.changeDNS.text.changeDNS'
                  defaultMessage='changing your DNS resolver'
                /></strong>,
                googleDNS: <code>8.8.8.8</code>,
                openDNS: <code>208.67.222.222</code>
              }}
            />
          </p>
          <p>
            <FormattedMessage
              id='nettests.webConnectivity.circumvention.changeDNS.instructions'
              defaultMessage='You can find instructions on how to change your DNS resolver through the following URL: {instructionsLink}'
              values={{
                instructionsLink:<a href='https://www.opendns.com/setupguide/' target='_blank'>
                  https://www.opendns.com/setupguide/
                </a>
              }}
            />
          </p>
        </div>
        }
        <div className='circumvention-strategy'>
          <h3><FormattedMessage
            id='nettests.webConnectivity.circumvention.useTor.title'
            defaultMessage='Use Tor'
          /></h3>
          <p>
            <FormattedMessage
              id='nettests.webConnectivity.circumvention.useTor.text'
              defaultMessage='In most cases you should be able to circumvent censorship by using {Tor}.'
              values={{
                Tor: <strong>Tor</strong>
              }} />
            <FormattedMessage
              id='nettests.webConnectivity.circumvention.useTor.downloadTor'
              defaultMessage='On a computer you can use {torBrowserLink}, on Android {orbotLink} and on iOS {onionBrowserLink}'
              values={{
                torBrowserLink:
  <a href='https://www.torproject.org/download/download.html.en' target='_blank'>
                    Tor Browser
                  </a>,
                orbotLink:
  <a href='https://play.google.com/store/apps/details?id=org.torproject.android' target='_blank'>
                    OrBot
                  </a>,
                onionBrowser:
  <a href='https://itunes.apple.com/it/app/onion-browser-secure-anonymous' target='_blank'>
                    Onion Browser
                  </a>
              }}
            />
          </p>
          <p>
            <FormattedMessage
              id='nettests.webConnectivity.circumvention.useTor.torBlocked'
              defaultMessage='If the torproject.org website is blocked in your country, you can download Tor from a mirror of it hosted on github: {gettorLink}'
              values={{
                gettorLink: <a href='https://github.com/TheTorProject/gettorbrowser' target='_blank'>
                              https://github.com/TheTorProject/gettorbrowser
                </a>
              }}
            />
          </p>
        </div>

        <p>
          <FormattedMessage
            id='nettests.webConnectivity.circumvention.note'
            defaultMessage='Note: The above techniques might not always work.'
          />
        </p>

      </div>
      }

    </div>
  )
}

WebConnectivityDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default WebConnectivityDetails
