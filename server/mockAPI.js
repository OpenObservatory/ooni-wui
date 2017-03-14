const express = require('express')

const app = express()
let initialized = false

const newDecksSchema = [
  {
    'id': 'tor',
    'icon': 'oo-tor',
    'schedule': '@daily',
    'enabled': true,
    'running': false,
    'name': 'Tor test deck',
    'nettests': [
      'vanilla_tor'
    ],
    'description': 'This deck runs test related to testing the reachability of the Tor network'
  },
  {
    'id': 'web',
    'icon': 'fa-unlink',
    'schedule': '@daily',
    'enabled': true,
    'running': false,
    'name': 'Web test deck',
    'nettests': [
      'http_header_field_manipulation',
      'web_connectivity'
    ],
    'description': 'This deck runs HTTP Header Field Manipulation and the Web Connectivity test'
  },
  {
    'id': 'im',
    'icon': 'fa-comment-o',
    'schedule': '@daily',
    'enabled': true,
    'running': false,
    'name': 'Instant Messaging deck',
    'nettests': [
      'http_header_field_manipulation',
      'web_connectivity'
    ],
    'description': 'This test deck will check to see if instant messaging applications are working'
  },
  {
    'id': 'http-invalid',
    'icon': 'fa-eye',
    'schedule': '@daily',
    'enabled': true,
    'running': true,
    'name': 'HTTP Invalid Request Line',
    'nettests': [
      'http_invalid_request_line'
    ],
    'description': 'This deck runs HTTP Invalid Request Line test'
  }
]

app.get('/status', function (req, res) {
  res.cookie('XSRF-TOKEN', 'I am a happy token')
  res.json({
    'software_name': 'ooniprobe',
    'software_version': '2.1.0',
    'director_started': true,
    'country_code': 'GR',
    'quota_warning': false,
    'initialized': initialized,
    'asn': 'AS1241'
  })
})

app.get('/status/update', function (req, res) {
  setTimeout(function () {
    res.json({
      'software_name': 'ooniprobe',
      'software_version': '2.1.0',
      'director_started': true,
      'country_code': 'GR',
      'quota_warning': false,
      'initialized': initialized,
      'asn': 'AS1241'
    })
  }, 2000)
})

let notifyIdx = 0
app.get('/notify', function (req, res) {
  let nullMessage = {
    'message': '',
    'type': 'null'
  }
  let successMessage = {
    'message': 'this is a success',
    'type': 'success'
  }
  let errorMessage = {
    'message': 'this is an error',
    'type': 'error'
  }
  setTimeout(function () {
    // notifyIdx += 1
    // Always return null message
    if (notifyIdx === 0) {
      res.json(nullMessage)
      return
    }
    // This code is never reached.
    if (notifyIdx % 11 === 0) {
      res.json(successMessage)
    } else if (notifyIdx % 13 === 0) {
      res.json(errorMessage)
    } else {
      res.json(nullMessage)
    }
  }, 2000)
})

app.post('/nettest/*/start', function (req, res) {
  res.json({})
})

app.get('/nettest', function (req, res) {
  res.json({
    'tcp_connect': {
      'category': 'blocking',
      'description': 'Performs a TCP connect scan of all the host port combinations given as input.',
      'simple_options': {},
      'version': '0.2.0',
      'arguments': {
        'file': {
          'required': true,
          'type': 'file',
          'description': 'File containing the IP:PORT combinations to be tested, one per line.',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/' +
              'nettests/blocking/tcp_connect.py',
      'id': 'tcp_connect',
      'name': 'TCP Connect'
    },
    'traceroute': {
      'category': 'manipulation',
      'description': 'Performs a UDP, TCP, ICMP traceroute with destination port number set to 0, ' +
                     '22, 23, 53, 80, 123, 443, 8080 and 65535.',
      'simple_options': {},
      'version': '0.3',
      'arguments': {
        'interval': {
          'required': false,
          'type': 'text',
          'description': 'Specify the inter-packet delay in seconds.',
          'value': null
        },
        'numPackets': {
          'required': false,
          'type': 'text',
          'description': 'Specify the number of packets to send per hop.',
          'value': null
        },
        'maxttl': {
          'required': false,
          'type': 'text',
          'description': 'The maximum value of ttl to set on packets.',
          'value': 30
        },
        'timeout': {
          'required': false,
          'type': 'text',
          'description': 'The timeout for the traceroute test.',
          'value': 5
        },
        'dstport': {
          'required': false,
          'type': 'text',
          'description': 'Specify a single destination port. May be repeated.',
          'value': null
        },
        'backend': {
          'required': true,
          'type': 'text',
          'description': 'Test backend to use.',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'manipulation/traceroute.py',
      'id': 'traceroute',
      'name': 'Traceroute'
    },
    'bridge_reachability': {
      'category': 'blocking',
      'description': 'A test for checking if bridges are reachable from a given location.',
      'simple_options': {},
      'version': '0.1.2',
      'arguments': {
        'timeout': {
          'required': false,
          'type': 'text',
          'description': 'Specify the timeout after which to consider the Tor bootstrapping process to have failed.',
          'value': 120
        },
        'file': {
          'required': true,
          'type': 'file',
          'description': 'File containing bridges to test reachability for. They should be one per line IP:ORPort or ' +
                         'TransportType IP:ORPort (ex. obfs2 127.0.0.1:443).',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'blocking/bridge_reachability.py',
      'id': 'bridge_reachability',
      'name': 'Bridge Reachability'
    },
    'facebook_messenger': {
      'category': 'blocking',
      'description': 'This test checks to see if the servers used by Facebook messenger are reachable',
      'simple_options': {},
      'version': '0.4.0',
      'arguments': {},
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'blocking/facebook_messenger.py',
      'id': 'facebook_messenger',
      'name': 'Facebook Messenger'
    },
    'http_header_field_manipulation': {
      'category': 'manipulation',
      'description': 'Checks if the HTTP request the server sees is the same as the one that the client has created.',
      'simple_options': {},
      'version': '0.1.5',
      'arguments': {
        'headers': {
          'required': false,
          'type': 'text',
          'description': 'Specify a yaml formatted file from which to read the request headers to send.',
          'value': null
        },
        'backend': {
          'required': true,
          'type': 'text',
          'description': 'URL of the backend to use for sending the requests.',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'manipulation/http_header_field_manipulation.py',
      'id': 'http_header_field_manipulation',
      'name': 'HTTP Header Field Manipulation'
    },
    'meek_fronted_requests': {
      'category': 'blocking',
      'description': 'This tests for the Meek Tor pluggable transport frontend reachability.',
      'simple_options': {},
      'version': '0.0.1',
      'arguments': {
        'expectedBody': {
          'required': false,
          'type': 'text',
          'description': 'Expected body content from GET response.',
          'value': 'I\u2019m just a happy little web server.\n'
        },
        'hostHeader': {
          'required': false,
          'type': 'text',
          'description': 'Specify "inside" Host Header to test.',
          'value': null
        },
        'file': {
          'required': false,
          'type': 'file',
          'description': 'File containing the domainName:hostHeader combinations to be tested, one per line.',
          'value': null
        },
        'domainName': {
          'required': false,
          'type': 'text',
          'description': 'Specify a single fronted domainName to test.',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'blocking/meek_fronted_requests.py',
      'id': 'meek_fronted_requests',
      'name': 'Meek fronted requests test'
    },
    'vanilla_tor': {
      'category': 'blocking',
      'description': 'A test for checking if vanilla Tor connections work.',
      'simple_options': {},
      'version': '0.1.0',
      'arguments': {
        'timeout': {
          'required': false,
          'type': 'text',
          'description': 'Specify the timeout after which to consider the Tor bootstrapping process to have failed.',
          'value': 300
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'blocking/vanilla_tor.py',
      'id': 'vanilla_tor',
      'name': 'Vanilla Tor'
    },
    'dns_consistency': {
      'category': 'blocking',
      'description': 'Checks to see if the DNS responses from a set of DNS resolvers are consistent.',
      'simple_options': {},
      'version': '0.7.0',
      'arguments': {
        'testresolvers': {
          'required': false,
          'type': 'file',
          'description': 'File containing list of DNS resolvers to test against.',
          'value': null
        },
        'testresolver': {
          'required': false,
          'type': 'text',
          'description': 'Specify a single test resolver to use for testing.',
          'value': null
        },
        'file': {
          'required': true,
          'type': 'file',
          'description': 'Input file of list of hostnames to attempt to resolve',
          'value': null
        },
        'backend': {
          'required': true,
          'type': 'text',
          'description': 'The OONI backend that runs the DNS resolver.',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'blocking/dns_consistency.py',
      'id': 'dns_consistency',
      'name': 'DNS Consistency'
    },
    'http_requests': {
      'category': 'blocking',
      'description': 'Performs a HTTP GET request over Tor and one over the local network and ' +
                     'compares the two results.',
      'simple_options': {},
      'version': '0.2.5',
      'arguments': {
        'url': {
          'required': false,
          'type': 'text',
          'description': 'Specify a single URL to test.',
          'value': null
        },
        'file': {
          'required': false,
          'type': 'file',
          'description': 'List of URLS to perform GET and POST requests to',
          'value': null
        },
        'factor': {
          'required': false,
          'type': 'text',
          'description': 'What factor should be used for triggering censorship (0.8 == 80%).',
          'value': 0.8
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'blocking/http_requests.py',
      'id': 'http_requests',
      'name': 'HTTP Requests'
    },
    'captiveportal': {
      'category': 'manipulation',
      'description': 'Captive Portal Test.',
      'simple_options': {},
      'version': '0.3',
      'arguments': {
        'user-agent': {
          'required': false,
          'type': 'text',
          'description': 'User agent for HTTP requests.',
          'value': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2) Gecko/20100115 Firefox/3.6'
        },
        'asset': { 'required': false, 'type': 'text', 'description': 'Asset file.', 'value': null },
        'experiment-url': {
          'required': false,
          'type': 'text',
          'description': 'Experiment URL.',
          'value': 'http://google.com/'
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'manipulation/captiveportal.py',
      'id': 'captiveportal',
      'name': 'captiveportal'
    },
    'dns_spoof': {
      'category': 'manipulation',
      'description': 'Used to validate if the type of censorship happening is DNS spoofing or not.',
      'simple_options': {},
      'version': '0.0.1',
      'arguments': {
        'hostname': {
          'required': true,
          'type': 'text',
          'description': 'Specify the hostname of a censored site.',
          'value': null
        },
        'resolver': {
          'required': true,
          'type': 'text',
          'description': 'Specify the resolver that should be used for DNS queries (ip:port).',
          'value': null
        },
        'backend': {
          'required': false,
          'type': 'text',
          'description': 'Specify the IP address of a good DNS resolver (ip:port).',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'manipulation/dns_spoof.py',
      'id': 'dns_spoof',
      'name': 'DNS Spoof'
    },
    'openvpn': {
      'category': 'third_party',
      'description': 'Connects to an OpenVPN server and does a HTTP GET for thespecified URL.',
      'simple_options': {},
      'version': '0.0.2',
      'arguments': {
        'url': {
          'required': true,
          'type': 'text',
          'description': 'Specify a single URL on the OpenVPN subnet to test.',
          'value': null
        },
        'openvpn-config': {
          'required': true,
          'type': 'text',
          'description': 'Specify an OpenVPN configuration file.',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'third_party/openvpn.py',
      'id': 'openvpn',
      'name': 'OpenVPN Client Test'
    },
    'web_connectivity': {
      'category': 'blocking',
      'description': 'Identifies the reason for blocking of a given URL by performing DNS resolution of ' +
                     'the hostname, doing a TCP connect to the resolved IPs and then fetching the page ' +
                     'and comparing all these results with those of a control.',
      'simple_options': [{ 'type': 'text', 'name': 'url' }, { 'type': 'file/url', 'name': 'file' }],
      'version': '0.1.0',
      'arguments': {
        'retries': {
          'required': false,
          'type': 'text',
          'description': 'Number of retries for the HTTP request',
          'value': 1
        },
        'file': {
          'required': false,
          'type': 'file',
          'description': 'List of URLS to perform GET requests to',
          'value': null
        },
        'url': { 'required': false, 'type': 'text', 'description': 'Specify a single URL to test', 'value': null },
        'timeout': { 'required': false, 'type': 'text', 'description': 'Total timeout for this test', 'value': 240 },
        'dns-discovery': {
          'required': true,
          'type': 'text',
          'description': 'Specify the dns discovery test helper',
          'value': 'whoami.akamai.net'
        },
        'backend': {
          'required': true,
          'type': 'text',
          'description': 'The web_consistency backend test helper',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'blocking/web_connectivity.py',
      'id': 'web_connectivity',
      'name': 'Web connectivity'
    },
    'http_host': {
      'category': 'manipulation',
      'description': 'Tests a variety of different filter bypassing techniques based on the HTTP Host header field.',
      'simple_options': {},
      'version': '0.2.4',
      'arguments': {
        'content': {
          'required': false,
          'type': 'text',
          'description': 'The file to read from containing the content of a block page.',
          'value': null
        },
        'file': {
          'required': true,
          'type': 'file',
          'description': 'List of hostnames to test for censorship.',
          'value': null
        },
        'backend': {
          'required': true,
          'type': 'text',
          'description': 'URL of the test backend to use. Should be listening on port 80 and be a ' +
                         'HTTPReturnJSONHeadersHelper (ex. http://1.1.1.1).',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'manipulation/http_host.py',
      'id': 'http_host',
      'name': 'HTTP Host'
    },
    'whatsapp': {
      'category': 'blocking',
      'description': 'This test checks to see if the servers used by whatsapp messenger are reachable',
      'simple_options': {},
      'version': '0.5.0',
      'arguments': {},
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'blocking/whatsapp.py',
      'id': 'whatsapp',
      'name': 'Whatsapp'
    },
    'netalyzr': {
      'category': 'third_party',
      'description': 'A wrapper around the Netalyzr java command line client.',
      'simple_options': {},
      'version': '0.1',
      'arguments': {
        'clipath': {
          'required': true,
          'type': 'text',
          'description': 'Specify the path to NetalyzrCLI.jar (can be downloaded from ' +
                         'http://netalyzr.icsi.berkeley.edu/NetalyzrCLI.jar).',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'third_party/netalyzr.py',
      'id': 'netalyzr',
      'name': 'NetalyzrWrapper'
    },
    'psiphon': {
      'category': 'third_party',
      'description': 'Bootstraps Psiphon and does a HTTP GET for the specified URL.',
      'simple_options': {},
      'version': '0.1.0',
      'arguments': {
        'url': {
          'required': false,
          'type': 'text',
          'description': 'Specify the URL to fetch over psiphon (default: http://www.google.com/humans.txt).',
          'value': 'http://www.google.com/humans.txt'
        },
        'expected-body': {
          'required': false,
          'type': 'text',
          'description': 'Specify the beginning of the expected body in the response ' +
                         '(default: Google is built by a large).',
          'value': 'Google is built by a large'
        },
        'psiphonpath': {
          'required': false,
          'type': 'text',
          'description': 'Specify psiphon python client path.',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'third_party/psiphon.py',
      'id': 'psiphon',
      'name': 'Psiphon Test'
    },
    'http_invalid_request_line': {
      'category': 'manipulation',
      'description': 'Performs out of spec HTTP requests in the attempt to trigger a proxy error message.',
      'simple_options': {},
      'version': '0.2',
      'arguments': {
        'backendport': {
          'required': false,
          'type': 'text',
          'description': 'Specify the port that the TCP echo server is running (should only be set for debugging).',
          'value': 80
        },
        'backend': {
          'required': true,
          'type': 'text',
          'description': 'The OONI backend that runs a TCP echo server.',
          'value': null
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'manipulation/http_invalid_request_line.py',
      'id': 'http_invalid_request_line',
      'name': 'HTTP Invalid Request Line'
    },
    'lantern': {
      'category': 'third_party',
      'description': 'Bootstraps Lantern, connects to a URL and verifies if it contains the expected input.',
      'simple_options': {},
      'version': '0.1.0',
      'arguments': {
        'url': {
          'required': false,
          'type': 'text',
          'description': 'Specify the URL to fetch over lantern (default: http://www.google.com/humans.txt).',
          'value': 'http://www.google.com/humans.txt'
        },
        'expected-body': {
          'required': false,
          'type': 'text',
          'description': 'Specify the beginning of the expected body in the response ' +
                         '(default: Google is built by a large).',
          'value': 'Google is built by a large'
        }
      },
      'path': '/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/' +
              'third_party/lantern.py',
      'id': 'lantern',
      'name': 'Lantern Circumvention Tool Test'
    }
  })
})

app.get('/initialize', function (req, res) {
  res.json({
    'available_decks': newDecksSchema
  })
})

app.post('/initialize', function (req, res) {
  initialized = true
  res.json({})
})

app.get('/deck', function (req, res) {
  res.json({
    'decks': newDecksSchema
  })
})

app.post('/deck/*/enable', function (req, res) {
  res.json({})
})
app.post('/deck/*/disable', function (req, res) {
  res.json({})
})
app.post('/deck/*/run', function (req, res) {
  res.json({})
})
app.post('/deck/*/start', function (req, res) {
  res.json({})
})

const getSampleMeasurement = (testName, testKeys, input = '', annotations = {}) => {
  let sampleMeasurement = {
    'annotations': annotations,
    'data_format_version': '0.2.0',
    'id': 'c1939d27-7f6e-4d88-aafc-c31336b7a469',
    'input': input,
    'input_hashes': [],
    'measurement_start_time': '2017-01-12 00:29:22',
    'options': [
      '--file',
      '$tor_bridge_lines'
    ],
    'probe_asn': 'AS30722',
    'probe_cc': 'IT',
    'probe_city': null,
    'probe_ip': '127.0.0.1',
    'report_id': '20170112T002818Z_AS30722_GsvkWjyQ5OGY2ylqJ0gMiPzwIhZXXKBfhvSthWyxo8ta1Afha0',
    'software_name': 'ooniprobe',
    'software_version': '2.1.0',
    'test_helpers': {},
    'test_keys': testKeys,
    'test_name': testName,
    'test_runtime': 0.057000160217285156,
    'test_start_time': '2017-01-12 00:29:22',
    'test_version': '0.2.0'
  }
  return sampleMeasurement
}

const baseHttpTempl = {
  'agent': 'agent',
  'requests': [
    {
      'failure': null,
      'request': {
        'body': null,
        'headers': {
          'Host': 'az668014.vo.msecnd.net'
        },
        'method': 'GET',
        'tor': {
          'exit_ip': null,
          'exit_name': null,
          'is_tor': false
        },
        'url': 'https://example.com/'
      },
      'response': {
        'body': 'I\u2019m just a happy little web server.\n',
        'code': 200,
        'headers': {
          'Accept-Ranges': 'bytes',
          'Content-Type': 'text/plain; charset=utf-8',
          'Date': 'Thu, 12 Jan 2017 00:29:21 GMT',
          'Last-Modified': 'Sat, 07 Jan 2017 09:12:51 GMT',
          'Server': 'ECAcc (mxp/0FAA)',
          'X-Cache': 'HIT'
        }
      }
    }
  ],
  'socksproxy': null
}

const mockMeasurements = [
  {
    'size': -1,
    'running': false,
    'country_code': 'GR',
    'test_name': 'tcp_connect',
    'test_start_time': '20161214T085527Z',
    'completed': true,
    'keep': false,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': true,
    'id': '20161214T085527Z-GR-AS1241-tcp_connect',
    // These are added
    'result': 'ok',
    'deck_id': 'tor',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'tcp_connect',
      'results': [
        { 'anomaly': false, 'idx': 0, 'url': 'obfs4 109.105.109.165:24215' },
        { 'anomaly': true, 'idx': 1, 'url': 'obfs3 222.111.109.165:24215' }
      ]
    },
    'sample_measurements': [
      getSampleMeasurement('tcp_connect', { 'connection': 'success' },
        'obfs4 1.1.1.1:111', { 'test_class': 'tor_bridge_reachability' }
      ),
      getSampleMeasurement('tcp_connect', { 'connection': 'generic_timeout_error' },
        'obfs4 2.2.2.2:111', { 'test_class': 'tor_bridge_reachability' }
      )
    ]
  },
  {
    'size': -1,
    'running': false,
    'country_code': 'GR',
    'test_name': 'meek_fronted_requests_test',
    'test_start_time': '20161214T080637Z',
    'completed': true,
    'keep': false,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': false,
    'id': '20161214T080637Z-GR-AS1241-meek_fronted_requests_test',
    'result': 'ok',
    'deck_id': 'web',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'meek_fronted_requests_test',
      'results': [
        { 'anomaly': false, 'idx': 0, 'url': ['meeka', 'meekb'] },
        { 'anomaly': true, 'idx': 1, 'url': ['meekc', 'meekd'] }
      ]
    },
    'sample_measurements': [
      getSampleMeasurement('meek_fronted_requests_test', Object.assign({}, baseHttpTempl, { 'success': true }),
        ['meeka', 'meekb']
      ),
      getSampleMeasurement('meek_fronted_requests_test',
        Object.assign({}, baseHttpTempl, { 'success': false, 'error': 'generic_timeout_failure' }),
        ['meeka', 'meekb']
      )
    ]
  },
  {
    'size': -1,
    'running': false,
    'country_code': 'GR',
    'test_name': 'facebook_messenger',
    'test_start_time': '20161214T080551Z',
    'completed': true,
    'keep': false,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': true,
    'id': '20161215T080551Z-GR-AS1241-facebook_messenger',
    'result': 'ok',
    'deck_id': 'web',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'facebook_messenger',
      'results': [
        { 'url': null, 'idx': 0, 'anomaly': true }
      ]
    },
    'sample_measurements': [
      getSampleMeasurement('facebook_messenger',
        { facebook_b_api_dns_consistent: true,
          facebook_b_api_reachable: true,
          facebook_b_graph_dns_consistent: true,
          facebook_b_graph_reachable: true,
          facebook_dns_blocking: false,
          facebook_edge_dns_consistent: true,
          facebook_edge_reachable: true,
          facebook_external_cdn_dns_consistent: true,
          facebook_external_cdn_reachable: true,
          facebook_scontent_cdn_dns_consistent: true,
          facebook_scontent_cdn_reachable: true,
          facebook_star_dns_consistent: true,
          facebook_star_reachable: true,
          facebook_stun_dns_consistent: true,
          facebook_stun_reachable: null,
          facebook_tcp_blocking: false }
      )
    ]
  },
  {
    'size': -1,
    'running': false,
    'country_code': 'GR',
    'test_name': 'facebook_messenger',
    'test_start_time': '20161214T080551Z',
    'completed': true,
    'keep': false,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': false,
    'id': '20161214T080551Z-GR-AS1241-facebook_messenger',
    'result': 'ok',
    'deck_id': 'web',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'facebook_messenger',
      'results': [
        { 'url': null, 'idx': 0 }
      ]
    },
    'sample_measurements': [
      getSampleMeasurement('facebook_messenger',
        { facebook_b_api_dns_consistent: false,
          facebook_b_api_reachable: true,
          facebook_b_graph_dns_consistent: true,
          facebook_b_graph_reachable: true,
          facebook_dns_blocking: false,
          facebook_edge_dns_consistent: true,
          facebook_edge_reachable: true,
          facebook_external_cdn_dns_consistent: true,
          facebook_external_cdn_reachable: true,
          facebook_scontent_cdn_dns_consistent: true,
          facebook_scontent_cdn_reachable: true,
          facebook_star_dns_consistent: true,
          facebook_star_reachable: true,
          facebook_stun_dns_consistent: true,
          facebook_stun_reachable: null,
          facebook_tcp_blocking: false }
      )
    ]
  },
  {
    'size': -1,
    'running': false,
    'country_code': 'GR',
    'test_name': 'vanilla_tor',
    'test_start_time': '20161213T090551Z',
    'completed': true,
    'keep': false,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': false,
    'id': '20161213T090551Z-GR-AS1241-vanilla_tor',
    'result': 'ok',
    'deck_id': 'web',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'vanilla_tor',
      'results': [
        { 'url': null, 'idx': 0 }
      ]
    },
    'sample_measurements': [
      getSampleMeasurement('vanilla_tor', {
        'success': true,
        'tor_version': '0.2.24',
        'tor_log': 'Tor log line 1\nTor log line 2\n'
      })
    ]
  },
  {
    'size': -1,
    'running': false,
    'country_code': 'GR',
    'test_name': 'http_invalid_request_line',
    'test_start_time': '20161214T080551Z',
    'completed': true,
    'keep': false,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': true,
    'id': '20161214T080551Z-GR-AS1241-http_invalid_request_line',
    'result': 'ok',
    'deck_id': 'web',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'http_invalid_request_line',
      'results': [
        { 'url': null, 'idx': 0 }
      ]
    },
    'sample_measurements': [
      getSampleMeasurement('http_invalid_request_line', {
        'received': [
          '0G21 / HTTP/1.1\\n\\r',
          'AAAAAa/ HTTP/1.1\\n\\r',
          'GET / HTTP/fmD\\n\\r',
          'PNLHq Dnt8h OYVR7 TOGLY\\n\\r'
        ],
        'sent': [
          '0G21 / HTTP/1.1\\n\\r',
          'DIFFERENT',
          'GET / HTTP/fmD\\n\\r',
          'PNLHq Dnt8h OYVR7 TOGLY\\n\\r'
        ],
        'tampering': true
      })
    ]
  },
  {
    'size': -1,
    'running': false,
    'country_code': 'GR',
    'test_name': 'http_invalid_request_line',
    'test_start_time': '20161214T080551Z',
    'completed': true,
    'keep': false,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': false,
    'id': '20161212T080551Z-GR-AS1241-http_invalid_request_line',
    'result': 'ok',
    'deck_id': 'web',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'http_invalid_request_line',
      'results': [
        { 'url': null, 'idx': 0 }
      ]
    },
    'sample_measurements': [
      getSampleMeasurement('http_invalid_request_line', {
        'received': [
          '0G21 / HTTP/1.1\\n\\r',
          'AAAAAAAa/ HTTP/1.1\\n\\r',
          'GET / HTTP/fmD\\n\\r',
          'PNLHq Dnt8h OYVR7 TOGLY\\n\\r'
        ],
        'sent': [
          '0G21 / HTTP/1.1\\n\\r',
          'AAAAAAAAAAAa/ HTTP/1.1\\n\\r',
          'GET / HTTP/fmD\\n\\r',
          'PNLHq Dnt8h OYVR7 TOGLY\\n\\r'
        ],
        'tampering': false
      })
    ]
  },
  {
    'size': -1,
    'running': true,
    'progress': 20,
    'country_code': 'GR',
    'test_name': 'web_connectivity',
    'test_start_time': '20161214T090551Z',
    'completed': true,
    'keep': false,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': false,
    'id': '20161212T090551Z-GR-AS1241-web_connectivity',
    'result': 'ok',
    'deck_id': 'web',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'web_connectivity',
      'results': []
    },
    'sample_measurements': []
  },
  {
    'size': -1,
    'running': false,
    'country_code': 'GR',
    'test_name': 'http_header_field_manipulation',
    'test_start_time': '20161214T080551Z',
    'completed': true,
    'keep': false,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': false,
    'id': '20161212T080551Z-GR-AS1241-http_header_field_manipulation',
    'result': 'ok',
    'deck_id': 'web',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'http_header_field_manipulation',
      'results': [
        { 'url': null, 'idx': 0 }
      ]
    },
    'sample_measurements': [
      getSampleMeasurement('http_header_field_manipulation', {
        'tampering': {
          'header_field_name': false,
          'header_field_number': false,
          'header_field_value': false,
          'header_name_capitalization': false,
          'header_name_diff': [],
          'request_line_capitalization': false,
          'total': false
        }
      })
    ]
  },
  {
    'size': -1,
    'running': false,
    'country_code': 'GR',
    'test_name': 'ndt',
    'test_start_time': '20161214T080551Z',
    'completed': true,
    'keep': false,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': false,
    'id': '20161218T090551Z-GR-AS1241-ndt',
    'result': 'ok',
    'deck_id': 'web',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'ndt',
      'results': [
        { 'url': null, 'idx': 0 }
      ]
    },
    'sample_measurements': [
      getSampleMeasurement('ndt', {
        'server_address': 'ndt.iupui.mlab1.tun01.measurement-lab.org',
        'advanced': {
          'avg_rtt': 5.13346789453766,
          'mss': 1448,
          'max_rtt': 11,
          'min_rtt': 1,
          'timeouts': 0,
          'out_of_order': 0.0333642261353105,
          'packet_loss': 0.000454366833677178,

          // I don't use any of these
          'congestion_limited': 0.960565649283394,
          'fast_retran': 37,
          'received_limited': 0.0,
          'sender_limited': 0.0394343507166061
        },
        'simple': {
          'download': 94152.8262005166,
          'upload': 24152.8262005166,
          'ping': 2.20298767089844,
          // I don't use this (maybe we put it in advanced?)
          'fastest_test': 'multi_stream'
        }
      })
    ]
  },
  {
    'size': -1,
    'running': false,
    'country_code': 'GR',
    'test_name': 'web_connectivity',
    'test_start_time': '20161214T080502Z',
    'completed': true,
    'keep': true,
    'asn': 'AS1241',
    'stale': false,
    'anomaly': false,
    'id': '20161214T080502Z-GR-AS1241-web_connectivity',
    'result': 'error',
    'deck_id': 'web',
    'summary': {
      'test_start_time': '2017-01-12 00:29:22',
      'anomaly': false,
      'country_code': 'GR',
      'asn': 'AS10',
      'test_name': 'web_connectivity',
      'results': [
        { 'anomaly': false, 'idx': 0, 'url': 'http://example.unblocked.org' },
        { 'anomaly': true, 'idx': 1, 'url': 'http://example.dns.blocked.org' },
        { 'anomaly': true, 'idx': 2, 'url': 'http://example.tcp.blocked.org' },
        { 'anomaly': true, 'idx': 3, 'url': 'http://example.http-failure.blocked.org' },
        { 'anomaly': true, 'idx': 4, 'url': 'http://example.http-diff.blocked.org' },
        { 'anomaly': true, 'idx': 5, 'url': 'http://example.unreachable.org' }
      ]
    },
    'sample_measurements': [
      getSampleMeasurement('web_connectivity', Object.assign({},
        baseHttpTempl, {
          'status_code_match': true,
          'title_match': true,
          'control_failure': null,
          'dns_consistency': 'consistent',
          'dns_experiment_failure': null,
          'headers_match': true,
          'http_experiment_failure': null,
          'accessible': true,
          'blocking': false,
          'body_length_match': true,
          'body_proportion': 1.0,
          'client_resolver': '91.80.37.105'
        }), 'http://example.unblocked.org'),
      getSampleMeasurement('web_connectivity', Object.assign({},
        baseHttpTempl, {
          'status_code_match': true,
          'title_match': true,
          'control_failure': null,
          'dns_consistency': 'inconsistent',
          'dns_experiment_failure': null,
          'headers_match': true,
          'http_experiment_failure': null,
          'accessible': true,
          'blocking': 'dns',
          'body_length_match': true,
          'body_proportion': 1.0,
          'client_resolver': '91.80.37.105'
        }), 'http://example.dns.blocked.org'),
      getSampleMeasurement('web_connectivity', Object.assign({},
        baseHttpTempl, {
          'status_code_match': true,
          'title_match': true,
          'control_failure': 'generic_timeout_failure',
          'dns_consistency': 'consistent',
          'dns_experiment_failure': null,
          'headers_match': true,
          'http_experiment_failure': null,
          'accessible': true,
          'blocking': 'tcp_ip',
          'body_length_match': true,
          'body_proportion': 1.0,
          'client_resolver': '91.80.37.105'
        }), 'http://example.tcp.blocked.org'),
      getSampleMeasurement('web_connectivity', Object.assign({},
        baseHttpTempl, {
          'status_code_match': true,
          'title_match': true,
          'control_failure': 'generic_timeout_failure',
          'dns_consistency': 'consistent',
          'dns_experiment_failure': null,
          'headers_match': true,
          'http_experiment_failure': 'generic_timeout_error',
          'accessible': true,
          'blocking': 'http-failure',
          'body_length_match': true,
          'body_proportion': 1.0,
          'client_resolver': '91.80.37.105'
        }), 'http://example.http-failure.blocked.org'),
      getSampleMeasurement('web_connectivity', Object.assign({},
        baseHttpTempl, {
          'status_code_match': true,
          'title_match': true,
          'control_failure': 'generic_timeout_failure',
          'dns_consistency': 'consistent',
          'dns_experiment_failure': null,
          'headers_match': true,
          'http_experiment_failure': null,
          'accessible': true,
          'blocking': 'http-diff',
          'body_length_match': true,
          'body_proportion': 1.0,
          'client_resolver': '91.80.37.105'
        }), 'http://example.http-diff.blocked.org'),
      getSampleMeasurement('web_connectivity', Object.assign({},
        baseHttpTempl, {
          'status_code_match': true,
          'title_match': true,
          'control_failure': 'generic_timeout_failure',
          'dns_consistency': 'consistent',
          'dns_experiment_failure': null,
          'headers_match': true,
          'http_experiment_failure': null,
          'accessible': false,
          'blocking': false,
          'body_length_match': true,
          'body_proportion': 1.0,
          'client_resolver': '91.80.37.105'
        }), 'http://example.unreachable.org/')
    ]
  }
]

app.get('/measurement', function (req, res) {
  let measurementList = mockMeasurements.map((m) => {
    let measurement = Object.assign({}, m, {})
    delete measurement['sample_measurements']
    delete measurement['summary']
    return measurement
  })
  res.json({
    'measurements': measurementList
  })
})

mockMeasurements.forEach((measurement) => {
  app.get('/measurement/' + measurement.id, function (req, res) {
    res.json(measurement.summary)
  })
})

mockMeasurements.forEach((measurement) => {
  measurement.sample_measurements.forEach((sample, idx) => {
    app.get(`/measurement/${measurement.id}/${idx}`, function (req, res) {
      res.json(sample)
    })
  })
})

app.delete('/measurement/*', function (req, res) {
  res.json({})
})

app.post('/measurement/*/keep', function (req, res) {
  res.json({})
})

app.get('/logs', function (req, res) {
  let older = []
  if (req.query.all === 'true') {
    older = ['This is an older log 1', 'This is an older log 2']
  }
  res.json({
    latest: 'This is the latest log',
    older: older
  })
})

module.exports = app
