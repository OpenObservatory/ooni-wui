import React from 'react'

export const WebConnectivityDetails = ({ measurement }) => {
  return (
    <div>
      {/* Normal measurement */}
      {measurement.test_keys.accessible !== false && measurement.test_keys.blocking === false &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o' /> No censorship detected</h2>
        <p>The website is accessible and uncensored from this network.</p>
      </div>
      }
      {(measurement.test_keys.accessible === true || measurement.test_keys.accessible === null) &&
      measurement.test_keys.blocking === null &&
      <div>
        <h2 className='result-warning'><i className='fa fa-exclamation-circle' /> Error in measurement</h2>
        {measurement.test_keys.accessible === true &&
        <p>The website is up, however there was a problem in assessing if whether or not it is being censored.</p>
        }
        {measurement.test_keys.accessible === null &&
        <p>There was an error in understanding if this site is up and/or censored.</p>
        }
      </div>
      }

      {/* Site inaccessible */}
      {measurement.test_keys.accessible === false && (
          measurement.test_keys.blocking === false || measurement.test_keys.blocking === null
        ) &&
        <div>
          <h2 className='result-warning'><i className='fa fa-exclamation-circle' /> Website unavailable</h2>
          <p>The website appears to not be available at the moment.
            Requests from the control vantage point are also failing.</p>
        </div>
      }

      {/* Evidence of censorship */}
      {measurement.test_keys.blocking !== null && measurement.test_keys.blocking !== false &&
      <div>
        <h2 className='result-danger'><i className='fa fa-times-circle-o' /> Evidence of censorship</h2>
      </div>
      }

      {measurement.test_keys.blocking === 'dns' &&
      <p>
        The site appears to be blocked due to <strong>DNS based
        censorship</strong>.
      </p>}

      {measurement.test_keys.blocking === 'http-diff' &&
      <p>
        The site appears to be blocked because it presents a <strong>different HTTP
        response</strong>.
      </p>
      }

      {measurement.test_keys.blocking === 'http-failure' &&
      <p>
        The site appears to be blocked because the <strong>HTTP request
        failed</strong> with <code>{measurement.test_keys.http_experiment_failure}</code>
      </p>
      }

      {measurement.test_keys.blocking === 'tcp_ip' &&
      <p>
        The site appears to be blocked by means of <strong>TCP/IP
        based blocking</strong>.
      </p>
      }

      {measurement.test_keys.blocking !== false &&
      measurement.test_keys.blocking != null &&
      <div className='circumvention-strategies'>
        <h3><i className='ooni icon-tor' /> Circumvention strategies</h3>
        <p>You can try to circumvent the blocking of the site
          <code>{measurement.input}</code> through the
          following:
        </p>
        {(measurement.test_keys.blocking === 'http-diff' ||
          measurement.test_keys.blocking === 'http-failure') &&
        measurement.input.substr(0, 5) !== 'https' &&
        <div className='circumvention-strategy'>
          <h3>Use Secure HTTP (HTTPS)</h3>
          <p>Try visiting the <strong>HTTPS</strong> version of the website in
            question by accessing it via
            <a href={`https${measurement.input.substr(4)}`}>https{measurement.input.substr(4)}</a>
          </p>
        </div>
        }
        {measurement.test_keys.blocking === 'dns' &&
        <div className='circumvention-strategy'>
          <h3>Change your DNS</h3>
          <p>Try <strong>changing your DNS resolver</strong> to one that does not
            implement blocking, such as the Google DNS resolver:
            <code>8.8.8.8</code>.
          </p>
          <p>You can find instructions on how to change your DNS resolver to the
            Google DNS resolver through the following URL: <a
              href='https://developers.google.com/speed/public-dns/docs/using' target='_blank'>
              https://developers.google.com/speed/public-dns/docs/using</a>
          </p>
        </div>
        }
        <div className='circumvention-strategy'>
          <h3>Use Tor</h3>
          <p>In most cases you should be able to circumvent censorship by
            using <strong>Tor</strong>.
            To download Tor visit: <a href='https://www.torproject.org/download/download.html.en' target='_blank'>
              https://www.torproject.org/download/download.html.en</a></p>
          <p>
            If the torproject.org website is blocked in your country you can download Tor from a mirror of it
            hosted on github: <a href='https://github.com/TheTorProject/gettorbrowser' target='_blank'>
              https://github.com/TheTorProject/gettorbrowser</a>
          </p>
        </div>

        <p>
          Note: The above techniques might not always work.
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
