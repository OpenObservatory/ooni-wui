const express = require('express')

const app = express()
let initialized = false

const newDecksSchema = [
  {
    'id': 'tor',
    'icon': 'fa-wrench',
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
    notifyIdx += 1
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
  // eslint-disable-next-line no-unused-vars
  const currentSchema = {
    'available': {
      'tor': {
        'schedule': '@daily',
        'enabled': true,
        'name': 'Tor test deck',
        'description': 'This deck runs test related to testing the reachability of the Tor network'
      },
      'web': {
        'schedule': '@daily',
        'enabled': true,
        'name': 'Web test deck',
        'description': 'This deck runs HTTP Header Field Manipulation and the Web Connectivity test'
      },
      'im': {
        'schedule': '@daily',
        'enabled': true,
        'name': 'Instant Messaging deck',
        'description': 'This test deck will check to see if instant messaging applications are working'
      },
      'http-invalid': {
        'schedule': '@daily',
        'enabled': true,
        'name': 'HTTP Invalid Request Line',
        'description': 'This deck runs HTTP Invalid Request Line test'
      }
    },
    'enabled': {
      'tor': {
        'schedule': '@daily',
        'enabled': true,
        'name': 'Tor test deck',
        'description': 'This deck runs test related to testing the reachability of the Tor network'
      },
      'web': {
        'schedule': '@daily',
        'enabled': true,
        'name': 'Web test deck',
        'description': 'This deck runs HTTP Header Field Manipulation and the Web Connectivity test'
      },
      'im': {
        'schedule': '@daily',
        'enabled': true,
        'name': 'Instant Messaging deck',
        'description': 'This test deck will check to see if instant messaging applications are working'
      },
      'http-invalid': {
        'schedule': '@daily',
        'enabled': true,
        'name': 'HTTP Invalid Request Line',
        'description': 'This deck runs HTTP Invalid Request Line test'
      }
    }
  }
  const newSchema = {
    'decks': newDecksSchema
  }
  res.json(newSchema)
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

app.get('/measurement', function (req, res) {
  res.json({
    'measurements': [
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
        'id': '20161214T085527Z-GR-AS1241-tcp_connect',
      // These are added
        'result': 'ok',
        'deck_id': 'tor'
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
        'id': '20161214T080637Z-GR-AS1241-meek_fronted_requests_test',
        'result': 'ok',
        'deck_id': 'web'
      },
      {
        'size': -1,
        'running': true,
        'country_code': 'GR',
        'test_name': 'facebook_messenger',
        'test_start_time': '20161214T080551Z',
        'completed': true,
        'keep': false,
        'asn': 'AS1241',
        'stale': false,
        'id': '20161214T080551Z-GR-AS1241-facebook_messenger',
        'result': 'ok',
        'deck_id': 'web'
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
        'id': '20161214T080502Z-GR-AS1241-web_connectivity',
        'result': 'error',
        'deck_id': 'web'
      },
      {
        'size': -1,
        'running': false,
        'country_code': 'GR',
        'test_name': 'web_connectivity',
        'test_start_time': '20161213T080502Z',
        'completed': true,
        'keep': true,
        'asn': 'AS1241',
        'stale': false,
        'id': '20161213T080502Z-GR-AS1241-web_connectivity',
        'result': 'ok',
        'deck_id': 'web'
      }
    ]
  })
})

app.get('/measurement/*/*', function (req, res) {
  // eslint-disable-next-line max-len
  res.json({ 'test_keys': { 'accessible': true, 'control': { 'tcp_connect': { '66.254.117.154:80': { 'status': true, 'failure': null } }, 'http_request': { 'body_length': 16167, 'failure': null, 'status_code': 200, 'headers': { 'X-Varnish': '897946656 896981080', 'X-Cache': 'HIT', 'content-encoding': '', 'Set-Cookie': 'id=nd5000; expires=Wed, 21-Dec-2016 23:35:45 GMT; Max-Age=86400; path=/; domain=8thstreetlatinas.com', 'Age': '1393', 'Charset': 'UTF-8', 'Vary': 'Accept-Encoding', 'asisCache': '1', 'Via': '1.1 varnish-v4', 'Cache-control': 'max-age=3600, public, private', 'Date': 'Tue, 20 Dec 2016 23:35:45 GMT', 'Server': 'Apache/2.2.22 (Debian)', 'Content-Type': 'text/html;charset=UTF-8', 'Accept-Ranges': 'bytes' }, 'title': '8thStreetLatinas Official Porn Website' }, 'dns': { 'failure': null, 'addrs': ['66.254.117.154'] } }, 'control_failure': null, 'socksproxy': null, 'headers_match': true, 'http_experiment_failure': null, 'agent': 'redirect', 'title_match': true, 'client_resolver': '193.92.3.5', 'retries': 1, 'dns_consistency': 'consistent', 'dns_experiment_failure': null, 'body_proportion': 1.0, 'queries': [{ 'resolver_hostname': null, 'query_type': 'A', 'hostname': '8thstreetlatinas.com', 'answers': [{ 'ipv4': '66.254.117.154', 'answer_type': 'A' }], 'failure': null, 'resolver_port': null }], 'body_length_match': true, 'requests': [{ 'failure': null, 'request': { 'body': null, 'headers': { 'Accept-Language': 'en-US;q=0.8,en;q=0.5', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36' }, 'url': 'http://www.8thstreetlatinas.com/', 'method': 'GET', 'tor': { 'is_tor': false, 'exit_name': null, 'exit_ip': null } }, 'response': { 'body': '<BODY></BODY>', 'headers': { 'X-Varnish': '651136891 649776740', 'X-Cache': 'HIT', 'content-encoding': '', 'Set-Cookie': 'id=nd5000; expires=Wed, 21-Dec-2016 23:37:29 GMT; Max-Age=86400; path=/; domain=8thstreetlatinas.com', 'Age': '1370', 'Charset': 'UTF-8', 'Vary': 'Accept-Encoding', 'asisCache': '1', 'Via': '1.1 varnish-v4', 'Cache-control': 'max-age=3600, public, private', 'Date': 'Tue, 20 Dec 2016 23:37:29 GMT', 'Server': 'Apache/2.2.22 (Debian)', 'Content-Type': 'text/html;charset=UTF-8', 'Accept-Ranges': 'bytes' }, 'code': 200 } }, { 'failure': null, 'request': { 'body': null, 'headers': { 'Accept-Language': 'en-US;q=0.8,en;q=0.5', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36' }, 'url': 'http://8thstreetlatinas.com', 'method': 'GET', 'tor': { 'is_tor': false, 'exit_name': null, 'exit_ip': null } }, 'response': { 'body': null, 'headers': { 'X-Varnish': '893843918 897946249', 'X-Cache': 'HIT', 'Set-Cookie': 'RNLBSERVERID=rk_v1; path=/', 'Age': '139', 'Vary': 'Accept-Encoding', 'Server': 'Apache/2.2.22 (Debian)', 'Via': '1.1 varnish-v4', 'Location': 'http://www.8thstreetlatinas.com/', 'Cache-control': 'private', 'Date': 'Tue, 20 Dec 2016 23:57:59 GMT', 'Content-Type': 'text/html; charset=iso-8859-1' }, 'code': 301 } }], 'tcp_connect': [{ 'status': { 'failure': null, 'success': true, 'blocked': false }, 'ip': '66.254.117.154', 'port': 80 }], 'blocking': 'dns', 'status_code_match': true }, 'software_version': '2.1.0', 'test_runtime': 2.7851650714874268, 'test_start_time': '2016-12-21 00:00:17', 'input_hashes': [], 'software_name': 'ooniprobe', 'options': ['--file', '$citizenlab_global_urls'], 'data_format_version': '0.2.0', 'measurement_start_time': '2016-12-21 00:00:17', 'test_version': '0.1.0', 'probe_city': null, 'test_name': 'web_connectivity', 'id': 'ea0234fe-c846-4bb3-ac8e-84e5d262fb59', 'input': 'http://8thstreetlatinas.com', 'probe_ip': '127.0.0.1', 'probe_cc': 'GR', 'probe_asn': 'AS1241', 'annotations': { 'platform': 'macos' }, 'test_helpers': { 'backend': { 'type': 'https', 'address': 'https://a.web-connectivity.th.ooni.io:4442' } }, 'report_id': '20161220T235951Z_AS1241_BRmSgeOEw83exlPlVbcI5Fz2IjnP7fFCrtma6iteTcFlyDOyeJ' })
})

app.get('/measurement/*', function (req, res) {
  // eslint-disable-next-line max-len
  res.json({ 'test_start_time': '2016-12-23 10:57:08', 'test_name': 'tcp_connect', 'results': [{ 'url': 'obfs4 109.105.109.165:24215', 'anomaly': false, 'idx': 0 }, { 'url': 'obfs4 109.105.109.146:27668', 'anomaly': false, 'idx': 1 }, { 'url': 'obfs4 109.105.109.165:10527', 'anomaly': false, 'idx': 2 }, { 'url': 'obfs4 109.105.109.147:13764', 'anomaly': false, 'idx': 3 }, { 'url': 'obfs4 178.209.52.110:443', 'anomaly': true, 'idx': 4 }, { 'url': 'obfs4 83.212.101.3:41213', 'anomaly': false, 'idx': 5 }, { 'url': 'obfs4 83.212.101.3:50000', 'anomaly': false, 'idx': 6 }, { 'url': 'obfs4 83.212.101.3:50001', 'anomaly': false, 'idx': 7 }, { 'url': 'obfs4 83.212.101.3:50002', 'anomaly': false, 'idx': 8 }, { 'url': 'obfs4 83.212.101.3:50003', 'anomaly': false, 'idx': 9 }, { 'url': 'obfs4 83.212.101.3:50004', 'anomaly': false, 'idx': 10 }, { 'url': 'obfs4 83.212.101.3:50005', 'anomaly': false, 'idx': 11 }, { 'url': 'obfs4 83.212.101.3:50006', 'anomaly': false, 'idx': 12 }, { 'url': 'obfs4 83.212.101.3:50007', 'anomaly': false, 'idx': 13 }, { 'url': 'obfs4 83.212.101.3:50008', 'anomaly': false, 'idx': 14 }, { 'url': 'obfs4 83.212.101.3:50009', 'anomaly': false, 'idx': 15 }, { 'url': 'obfs3 83.212.101.3:80', 'anomaly': false, 'idx': 16 }, { 'url': '83.212.101.3:22', 'anomaly': false, 'idx': 17 }, { 'url': 'scramblesuit 83.212.101.3:443', 'anomaly': true, 'idx': 18 }, { 'url': '109.105.109.165:22', 'anomaly': true, 'idx': 19 }, { 'url': '109.105.109.146:22', 'anomaly': true, 'idx': 20 }, { 'url': '178.209.52.110:22', 'anomaly': true, 'idx': 21 }, { 'url': 'obfs4 198.245.60.50:443', 'anomaly': false, 'idx': 22 }, { 'url': '198.245.60.50:22', 'anomaly': false, 'idx': 23 }, { 'url': 'obfs4 192.99.11.54:443', 'anomaly': false, 'idx': 24 }, { 'url': '192.99.11.54:22', 'anomaly': false, 'idx': 25 }, { 'url': 'obfs4 104.131.108.182:56880', 'anomaly': true, 'idx': 26 }, { 'url': 'fte 192.240.101.106:80', 'anomaly': true, 'idx': 27 }, { 'url': 'obfs4 154.35.22.9:60873', 'anomaly': true, 'idx': 28 }, { 'url': 'obfs4 154.35.22.9:1984', 'anomaly': true, 'idx': 29 }, { 'url': 'obfs4 154.35.22.9:443', 'anomaly': true, 'idx': 30 }, { 'url': 'obfs4 154.35.22.9:80', 'anomaly': true, 'idx': 31 }, { 'url': 'obfs4 154.35.22.9:5881', 'anomaly': true, 'idx': 32 }, { 'url': 'obfs4 154.35.22.9:7013', 'anomaly': true, 'idx': 33 }, { 'url': 'obfs4 154.35.22.9:12166', 'anomaly': true, 'idx': 34 }, { 'url': 'obfs4 154.35.22.9:14303', 'anomaly': true, 'idx': 35 }, { 'url': 'obfs4 154.35.22.9:25427', 'anomaly': true, 'idx': 36 }, { 'url': 'obfs4 154.35.22.9:29733', 'anomaly': true, 'idx': 37 }, { 'url': 'obfs4 154.35.22.9:40782', 'anomaly': true, 'idx': 38 }, { 'url': 'obfs4 154.35.22.10:41835', 'anomaly': false, 'idx': 39 }, { 'url': 'obfs4 154.35.22.10:1984', 'anomaly': false, 'idx': 40 }, { 'url': 'obfs4 154.35.22.10:443', 'anomaly': false, 'idx': 41 }, { 'url': 'obfs4 154.35.22.10:80', 'anomaly': false, 'idx': 42 }, { 'url': 'obfs4 154.35.22.10:2934', 'anomaly': false, 'idx': 43 }, { 'url': 'obfs4 154.35.22.10:9332', 'anomaly': false, 'idx': 44 }, { 'url': 'obfs4 154.35.22.10:15937', 'anomaly': false, 'idx': 45 }, { 'url': 'obfs4 154.35.22.10:24338', 'anomaly': false, 'idx': 46 }, { 'url': 'obfs4 154.35.22.10:26336', 'anomaly': false, 'idx': 47 }, { 'url': 'obfs4 154.35.22.10:26703', 'anomaly': false, 'idx': 48 }, { 'url': 'obfs4 154.35.22.10:40348', 'anomaly': false, 'idx': 49 }, { 'url': 'obfs4 154.35.22.10:46345', 'anomaly': false, 'idx': 50 }, { 'url': 'obfs4 154.35.22.10:55622', 'anomaly': false, 'idx': 51 }, { 'url': 'obfs4 154.35.22.10:56472', 'anomaly': false, 'idx': 52 }, { 'url': '154.35.22.10:22', 'anomaly': false, 'idx': 53 }, { 'url': 'obfs4 154.35.22.11:49868', 'anomaly': false, 'idx': 54 }, { 'url': 'obfs4 154.35.22.11:1984', 'anomaly': false, 'idx': 55 }, { 'url': 'obfs4 154.35.22.11:443', 'anomaly': false, 'idx': 56 }, { 'url': 'obfs4 154.35.22.11:80', 'anomaly': false, 'idx': 57 }, { 'url': 'obfs4 154.35.22.9:42487', 'anomaly': true, 'idx': 58 }, { 'url': 'obfs4 154.35.22.9:48869', 'anomaly': true, 'idx': 59 }, { 'url': 'obfs4 154.35.22.9:50819', 'anomaly': true, 'idx': 60 }, { 'url': 'obfs4 154.35.22.11:2413', 'anomaly': true, 'idx': 61 }, { 'url': 'obfs4 154.35.22.11:7920', 'anomaly': true, 'idx': 62 }, { 'url': 'obfs4 154.35.22.11:16488', 'anomaly': true, 'idx': 63 }, { 'url': 'obfs4 154.35.22.11:17613', 'anomaly': true, 'idx': 64 }, { 'url': 'obfs4 154.35.22.11:36652', 'anomaly': true, 'idx': 65 }, { 'url': 'obfs4 154.35.22.11:44594', 'anomaly': true, 'idx': 66 }, { 'url': 'obfs4 154.35.22.11:54823', 'anomaly': true, 'idx': 67 }, { 'url': 'obfs4 154.35.22.11:58028', 'anomaly': true, 'idx': 68 }, { 'url': '154.35.22.11:22', 'anomaly': false, 'idx': 69 }, { 'url': 'obfs4 154.35.22.12:80', 'anomaly': false, 'idx': 70 }, { 'url': 'obfs4 154.35.22.12:443', 'anomaly': false, 'idx': 71 }, { 'url': 'obfs4 154.35.22.12:1984', 'anomaly': false, 'idx': 72 }, { 'url': 'obfs4 154.35.22.12:1894', 'anomaly': false, 'idx': 73 }, { 'url': 'obfs4 154.35.22.12:4148', 'anomaly': false, 'idx': 74 }, { 'url': 'obfs4 154.35.22.12:4304', 'anomaly': false, 'idx': 75 }, { 'url': 'obfs4 154.35.22.12:13023', 'anomaly': false, 'idx': 76 }, { 'url': 'obfs4 154.35.22.12:26715', 'anomaly': false, 'idx': 77 }, { 'url': 'obfs4 154.35.22.12:26919', 'anomaly': false, 'idx': 78 }, { 'url': 'obfs4 154.35.22.12:34939', 'anomaly': false, 'idx': 79 }, { 'url': 'obfs4 154.35.22.12:36882', 'anomaly': false, 'idx': 80 }, { 'url': 'obfs4 154.35.22.12:40033', 'anomaly': false, 'idx': 81 }, { 'url': 'obfs4 154.35.22.12:44899', 'anomaly': false, 'idx': 82 }, { 'url': '154.35.22.12:22', 'anomaly': false, 'idx': 83 }, { 'url': 'obfs4 154.35.22.11:60166', 'anomaly': true, 'idx': 84 }, { 'url': 'obfs4 154.35.22.11:64841', 'anomaly': true, 'idx': 85 }, { 'url': 'obfs4 154.35.22.13:80', 'anomaly': true, 'idx': 86 }, { 'url': 'obfs4 154.35.22.13:443', 'anomaly': true, 'idx': 87 }, { 'url': 'obfs4 154.35.22.13:1984', 'anomaly': true, 'idx': 88 }, { 'url': 'obfs4 154.35.22.13:4319', 'anomaly': true, 'idx': 89 }, { 'url': 'obfs4 154.35.22.13:6041', 'anomaly': true, 'idx': 90 }, { 'url': 'obfs4 154.35.22.13:16815', 'anomaly': true, 'idx': 91 }, { 'url': 'obfs4 154.35.22.13:17878', 'anomaly': true, 'idx': 92 }, { 'url': 'obfs4 154.35.22.13:29243', 'anomaly': true, 'idx': 93 }, { 'url': 'obfs4 154.35.22.13:30956', 'anomaly': true, 'idx': 94 }, { 'url': 'obfs4 154.35.22.13:39004', 'anomaly': true, 'idx': 95 }, { 'url': 'obfs4 154.35.22.13:50681', 'anomaly': true, 'idx': 96 }, { 'url': 'obfs4 192.95.36.142:443', 'anomaly': false, 'idx': 97 }, { 'url': '192.95.36.142:2200', 'anomaly': false, 'idx': 98 }, { 'url': '85.17.30.79:22', 'anomaly': false, 'idx': 99 }, { 'url': 'obfs4 85.17.30.79:443', 'anomaly': false, 'idx': 100 }, { 'url': 'obfs3 169.229.59.74:31493', 'anomaly': false, 'idx': 101 }, { 'url': 'obfs3 169.229.59.75:46328', 'anomaly': false, 'idx': 102 }, { 'url': 'obfs3 109.105.109.163:38980', 'anomaly': false, 'idx': 103 }, { 'url': 'obfs3 109.105.109.163:47779', 'anomaly': false, 'idx': 104 }, { 'url': 'fte 131.252.210.150:8080', 'anomaly': false, 'idx': 105 }, { 'url': 'fte 128.105.214.161:8080', 'anomaly': false, 'idx': 106 }, { 'url': '128.105.214.162:8080', 'anomaly': false, 'idx': 107 }, { 'url': 'fte 128.105.214.163:8080', 'anomaly': false, 'idx': 108 }, { 'url': '128.31.0.39:9101', 'anomaly': false, 'idx': 109 }, { 'url': '128.31.0.39:9131', 'anomaly': false, 'idx': 110 }, { 'url': '86.59.21.38:443', 'anomaly': false, 'idx': 111 }, { 'url': '86.59.21.38:80', 'anomaly': false, 'idx': 112 }, { 'url': '194.109.206.212:443', 'anomaly': false, 'idx': 113 }, { 'url': '194.109.206.212:80', 'anomaly': false, 'idx': 114 }, { 'url': '37.218.247.217:443', 'anomaly': false, 'idx': 115 }, { 'url': '37.218.247.217:80', 'anomaly': false, 'idx': 116 }, { 'url': '131.188.40.189:443', 'anomaly': false, 'idx': 117 }, { 'url': '131.188.40.189:80', 'anomaly': false, 'idx': 118 }, { 'url': '193.23.244.244:443', 'anomaly': false, 'idx': 119 }, { 'url': '193.23.244.244:80', 'anomaly': false, 'idx': 120 }, { 'url': '171.25.193.9:80', 'anomaly': false, 'idx': 121 }, { 'url': '171.25.193.9:443', 'anomaly': false, 'idx': 122 }, { 'url': '154.35.175.225:443', 'anomaly': false, 'idx': 123 }, { 'url': '154.35.175.225:80', 'anomaly': false, 'idx': 124 }, { 'url': '199.254.238.52:443', 'anomaly': false, 'idx': 125 }, { 'url': '199.254.238.52:80', 'anomaly': false, 'idx': 126 }, { 'url': 'obfs4 154.35.22.13:59765', 'anomaly': true, 'idx': 127 }, { 'url': 'obfs4 154.35.22.13:62623', 'anomaly': true, 'idx': 128 }, { 'url': '154.35.22.13:22', 'anomaly': true, 'idx': 129 }], 'country_code': 'GR', 'asn': 'AS1241' })
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
