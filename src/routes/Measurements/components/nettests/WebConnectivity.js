import React from 'react'

export const WebConnectivityDetails = ({ measurement }) => {
  return (
    <div>
      <div className='measurement-results text-xs-center'>
        {measurement.test_keys.accessible === false &&
        <p className='text-danger copy'>not accessible</p>
        }
        {measurement.test_keys.accessible === true &&
        <p className='text-success copy'>accessible</p>
        }
        {measurement.test_keys.accessible === null &&
        <p className='text-muted copy'>accessibility unknown</p>
        }

        {measurement.test_keys.blocking === false &&
        <p className='text-success copy'>uncensored</p>
        }
        {measurement.test_keys.blocking !== false && measurement.test_keys.blocking !== null &&
        <p className='text-danger copy'>censored</p>
        }
        {measurement.test_keys.blocking == null &&
        <p className='text-muted copy'>censorship unknown</p>
        }

      </div>

      {measurement.test_keys.blocking === 'dns' &&
      <p className='text-danger'>
        The site appears to be blocked due to <strong>DNS based
        censorship</strong>.
      </p>}

      {measurement.test_keys.blocking === 'http-diff' &&
      <p className='text-danger copy'>
        The site appears to be blocked because it presents a <strong>different HTTP
        response</strong>.
      </p>
      }

      {measurement.test_keys.blocking === 'http-failure' &&
      <p className='text-danger copy'>
        The site appears to be blocked because the <strong>HTTP request
        failed</strong>.
      </p>
      }

      {measurement.test_keys.blocking === 'tcp_ip' &&
      <p className='text-danger'>
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
          <p>Try visiting the <strong>HTTPS</strong> version of the website in
            question by accessing it via
            <a href={`https${measurement.input.substr(4)}`}>https{measurement.input.substr(4)}</a>
          </p>
        </div>
        }
        {measurement.test_keys.blocking === 'dns' &&
        <div className='circumvention-strategy'>
          <p>Try <strong>changing your DNS resolver</strong> to one that does not
            implement blocking, such as the Google DNS resolver:
            <code>8.8.8.8</code>.
          </p>
          <p>You can find instructions on how to change your DNS resolver to the
            Google DNS resolver through the following URL: <a
              href='https://developers.google.com/speed/public-dns/docs/using'>
              https://developers.google.com/speed/public-dns/docs/using</a>
          </p>
        </div>
        }
        <div className='circumvention-strategy'>
          <p>In most cases you should be able to circumvent censorship by
            using <strong>Tor</strong>. To download Tor visit:
            <a href='https://www.torproject.org/download/download.html.en'>https
              ://www.torproject.org/download/download.html.en</a></p>
          <p>
            If the torproject.org website is blocked in your country you can
            download Tor from a mirror of it hosted on github:
            <a href='https://github.com/TheTorProject/gettorbrowser/'>
              https://github.com/TheTorProject/gettorbrowser/</a>
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
