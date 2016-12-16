const express = require('express');

const app = express();
let initialized = false;

app.get('/status', function(req, res) {
  res.json({
    "software_name": "ooniprobe",
    "software_version": "2.1.0",
    "director_started": true,
    "country_code": "GR",
    "quota_warning": false,
    "initialized": initialized,
    "asn": "AS1241"
  });
});


app.get('/nettest', function(req, res) {
  res.json({
    "tcp_connect": {
      "category": "blocking",
      "description": "Performs a TCP connect scan of all the host port combinations given as input.",
      "simple_options": {},
      "version": "0.2.0",
      "arguments": {
        "file": {
          "required": true,
          "type": "file",
          "description": "File containing the IP:PORT combinations to be tested, one per line.",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/blocking/tcp_connect.py",
      "id": "tcp_connect",
      "name": "TCP Connect"
    },
    "traceroute": {
      "category": "manipulation",
      "description": "Performs a UDP, TCP, ICMP traceroute with destination port number set to 0, 22, 23, 53, 80, 123, 443, 8080 and 65535.",
      "simple_options": {},
      "version": "0.3",
      "arguments": {
        "interval": {
          "required": false,
          "type": "text",
          "description": "Specify the inter-packet delay in seconds.",
          "value": null
        },
        "numPackets": {
          "required": false,
          "type": "text",
          "description": "Specify the number of packets to send per hop.",
          "value": null
        },
        "maxttl": {
          "required": false,
          "type": "text",
          "description": "The maximum value of ttl to set on packets.",
          "value": 30
        },
        "timeout": {
          "required": false,
          "type": "text",
          "description": "The timeout for the traceroute test.",
          "value": 5
        },
        "dstport": {
          "required": false,
          "type": "text",
          "description": "Specify a single destination port. May be repeated.",
          "value": null
        },
        "backend": {
          "required": true,
          "type": "text",
          "description": "Test backend to use.",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/manipulation/traceroute.py",
      "id": "traceroute",
      "name": "Traceroute"
    },
    "bridge_reachability": {
      "category": "blocking",
      "description": "A test for checking if bridges are reachable from a given location.",
      "simple_options": {},
      "version": "0.1.2",
      "arguments": {
        "timeout": {
          "required": false,
          "type": "text",
          "description": "Specify the timeout after which to consider the Tor bootstrapping process to have failed.",
          "value": 120
        },
        "file": {
          "required": true,
          "type": "file",
          "description": "File containing bridges to test reachability for. They should be one per line IP:ORPort or TransportType IP:ORPort (ex. obfs2 127.0.0.1:443).",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/blocking/bridge_reachability.py",
      "id": "bridge_reachability",
      "name": "Bridge Reachability"
    },
    "facebook_messenger": {
      "category": "blocking",
      "description": "This test checks to see if the servers used by Facebook messenger are reachable",
      "simple_options": {},
      "version": "0.4.0",
      "arguments": {},
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/blocking/facebook_messenger.py",
      "id": "facebook_messenger",
      "name": "Facebook Messenger"
    },
    "http_header_field_manipulation": {
      "category": "manipulation",
      "description": "Checks if the HTTP request the server sees is the same as the one that the client has created.",
      "simple_options": {},
      "version": "0.1.5",
      "arguments": {
        "headers": {
          "required": false,
          "type": "text",
          "description": "Specify a yaml formatted file from which to read the request headers to send.",
          "value": null
        },
        "backend": {
          "required": true,
          "type": "text",
          "description": "URL of the backend to use for sending the requests.",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/manipulation/http_header_field_manipulation.py",
      "id": "http_header_field_manipulation",
      "name": "HTTP Header Field Manipulation"
    },
    "meek_fronted_requests": {
      "category": "blocking",
      "description": "This tests for the Meek Tor pluggable transport frontend reachability.",
      "simple_options": {},
      "version": "0.0.1",
      "arguments": {
        "expectedBody": {
          "required": false,
          "type": "text",
          "description": "Expected body content from GET response.",
          "value": "I\u2019m just a happy little web server.\n"
        },
        "hostHeader": {
          "required": false,
          "type": "text",
          "description": "Specify \"inside\" Host Header to test.",
          "value": null
        },
        "file": {
          "required": false,
          "type": "file",
          "description": "File containing the domainName:hostHeader combinations to                  be tested, one per line.",
          "value": null
        },
        "domainName": {
          "required": false,
          "type": "text",
          "description": "Specify a single fronted domainName to test.",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/blocking/meek_fronted_requests.py",
      "id": "meek_fronted_requests",
      "name": "Meek fronted requests test"
    },
    "vanilla_tor": {
      "category": "blocking",
      "description": "A test for checking if vanilla Tor connections work.",
      "simple_options": {},
      "version": "0.1.0",
      "arguments": {
        "timeout": {
          "required": false,
          "type": "text",
          "description": "Specify the timeout after which to consider the Tor bootstrapping process to have failed.",
          "value": 300
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/blocking/vanilla_tor.py",
      "id": "vanilla_tor",
      "name": "Vanilla Tor"
    },
    "dns_consistency": {
      "category": "blocking",
      "description": "Checks to see if the DNS responses from a set of DNS resolvers are consistent.",
      "simple_options": {},
      "version": "0.7.0",
      "arguments": {
        "testresolvers": {
          "required": false,
          "type": "file",
          "description": "File containing list of DNS resolvers to test against.",
          "value": null
        },
        "testresolver": {
          "required": false,
          "type": "text",
          "description": "Specify a single test resolver to use for testing.",
          "value": null
        },
        "file": {
          "required": true,
          "type": "file",
          "description": "Input file of list of hostnames to attempt to resolve",
          "value": null
        },
        "backend": {
          "required": true,
          "type": "text",
          "description": "The OONI backend that runs the DNS resolver.",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/blocking/dns_consistency.py",
      "id": "dns_consistency",
      "name": "DNS Consistency"
    },
    "http_requests": {
      "category": "blocking",
      "description": "Performs a HTTP GET request over Tor and one over the local network and compares the two results.",
      "simple_options": {},
      "version": "0.2.5",
      "arguments": {
        "url": {
          "required": false,
          "type": "text",
          "description": "Specify a single URL to test.",
          "value": null
        },
        "file": {
          "required": false,
          "type": "file",
          "description": "List of URLS to perform GET and POST requests to",
          "value": null
        },
        "factor": {
          "required": false,
          "type": "text",
          "description": "What factor should be used for triggering censorship (0.8 == 80%).",
          "value": 0.8
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/blocking/http_requests.py",
      "id": "http_requests",
      "name": "HTTP Requests"
    },
    "captiveportal": {
      "category": "manipulation",
      "description": "Captive Portal Test.",
      "simple_options": {},
      "version": "0.3",
      "arguments": {
        "user-agent": {
          "required": false,
          "type": "text",
          "description": "User agent for HTTP requests.",
          "value": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2) Gecko/20100115 Firefox/3.6"
        },
        "asset": {"required": false, "type": "text", "description": "Asset file.", "value": null},
        "experiment-url": {
          "required": false,
          "type": "text",
          "description": "Experiment URL.",
          "value": "http://google.com/"
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/manipulation/captiveportal.py",
      "id": "captiveportal",
      "name": "captiveportal"
    },
    "dns_spoof": {
      "category": "manipulation",
      "description": "Used to validate if the type of censorship happening is DNS spoofing or not.",
      "simple_options": {},
      "version": "0.0.1",
      "arguments": {
        "hostname": {
          "required": true,
          "type": "text",
          "description": "Specify the hostname of a censored site.",
          "value": null
        },
        "resolver": {
          "required": true,
          "type": "text",
          "description": "Specify the resolver that should be used for DNS queries (ip:port).",
          "value": null
        },
        "backend": {
          "required": false,
          "type": "text",
          "description": "Specify the IP address of a good DNS resolver (ip:port).",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/manipulation/dns_spoof.py",
      "id": "dns_spoof",
      "name": "DNS Spoof"
    },
    "openvpn": {
      "category": "third_party",
      "description": "Connects to an OpenVPN server and does a HTTP GET for thespecified URL.",
      "simple_options": {},
      "version": "0.0.2",
      "arguments": {
        "url": {
          "required": true,
          "type": "text",
          "description": "Specify a single URL on the OpenVPN subnet to test.",
          "value": null
        },
        "openvpn-config": {
          "required": true,
          "type": "text",
          "description": "Specify an OpenVPN configuration file.",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/third_party/openvpn.py",
      "id": "openvpn",
      "name": "OpenVPN Client Test"
    },
    "web_connectivity": {
      "category": "blocking",
      "description": "Identifies the reason for blocking of a given URL by performing DNS resolution of the hostname, doing a TCP connect to the resolved IPs and then fetching the page and comparing all these results with those of a control.",
      "simple_options": [{"type": "text", "name": "url"}, {"type": "file/url", "name": "file"}],
      "version": "0.1.0",
      "arguments": {
        "retries": {
          "required": false,
          "type": "text",
          "description": "Number of retries for the HTTP request",
          "value": 1
        },
        "file": {
          "required": false,
          "type": "file",
          "description": "List of URLS to perform GET requests to",
          "value": null
        },
        "url": {"required": false, "type": "text", "description": "Specify a single URL to test", "value": null},
        "timeout": {"required": false, "type": "text", "description": "Total timeout for this test", "value": 240},
        "dns-discovery": {
          "required": true,
          "type": "text",
          "description": "Specify the dns discovery test helper",
          "value": "whoami.akamai.net"
        },
        "backend": {
          "required": true,
          "type": "text",
          "description": "The web_consistency backend test helper",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/blocking/web_connectivity.py",
      "id": "web_connectivity",
      "name": "Web connectivity"
    },
    "http_host": {
      "category": "manipulation",
      "description": "Tests a variety of different filter bypassing techniques based on the HTTP Host header field.",
      "simple_options": {},
      "version": "0.2.4",
      "arguments": {
        "content": {
          "required": false,
          "type": "text",
          "description": "The file to read from containing the content of a block page.",
          "value": null
        },
        "file": {
          "required": true,
          "type": "file",
          "description": "List of hostnames to test for censorship.",
          "value": null
        },
        "backend": {
          "required": true,
          "type": "text",
          "description": "URL of the test backend to use. Should be listening on port 80 and be a HTTPReturnJSONHeadersHelper (ex. http://1.1.1.1).",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/manipulation/http_host.py",
      "id": "http_host",
      "name": "HTTP Host"
    },
    "whatsapp": {
      "category": "blocking",
      "description": "This test checks to see if the servers used by whatsapp messenger are reachable",
      "simple_options": {},
      "version": "0.5.0",
      "arguments": {},
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/blocking/whatsapp.py",
      "id": "whatsapp",
      "name": "Whatsapp"
    },
    "netalyzr": {
      "category": "third_party",
      "description": "A wrapper around the Netalyzr java command line client.",
      "simple_options": {},
      "version": "0.1",
      "arguments": {
        "clipath": {
          "required": true,
          "type": "text",
          "description": "Specify the path to NetalyzrCLI.jar (can be downloaded from http://netalyzr.icsi.berkeley.edu/NetalyzrCLI.jar).",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/third_party/netalyzr.py",
      "id": "netalyzr",
      "name": "NetalyzrWrapper"
    },
    "psiphon": {
      "category": "third_party",
      "description": "Bootstraps Psiphon and does a HTTP GET for the specified URL.",
      "simple_options": {},
      "version": "0.1.0",
      "arguments": {
        "url": {
          "required": false,
          "type": "text",
          "description": "Specify the URL to fetch over psiphon (default: http://www.google.com/humans.txt).",
          "value": "http://www.google.com/humans.txt"
        },
        "expected-body": {
          "required": false,
          "type": "text",
          "description": "Specify the beginning of the expected body in the response (default: Google is built by a large).",
          "value": "Google is built by a large"
        },
        "psiphonpath": {
          "required": false,
          "type": "text",
          "description": "Specify psiphon python client path.",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/third_party/psiphon.py",
      "id": "psiphon",
      "name": "Psiphon Test"
    },
    "http_invalid_request_line": {
      "category": "manipulation",
      "description": "Performs out of spec HTTP requests in the attempt to trigger a proxy error message.",
      "simple_options": {},
      "version": "0.2",
      "arguments": {
        "backendport": {
          "required": false,
          "type": "text",
          "description": "Specify the port that the TCP echo server is running (should only be set for debugging).",
          "value": 80
        },
        "backend": {
          "required": true,
          "type": "text",
          "description": "The OONI backend that runs a TCP echo server.",
          "value": null
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/manipulation/http_invalid_request_line.py",
      "id": "http_invalid_request_line",
      "name": "HTTP Invalid Request Line"
    },
    "lantern": {
      "category": "third_party",
      "description": "Bootstraps Lantern, connects to a URL and verifies if it contains the expected input.",
      "simple_options": {},
      "version": "0.1.0",
      "arguments": {
        "url": {
          "required": false,
          "type": "text",
          "description": "Specify the URL to fetch over lantern (default: http://www.google.com/humans.txt).",
          "value": "http://www.google.com/humans.txt"
        },
        "expected-body": {
          "required": false,
          "type": "text",
          "description": "Specify the beginning of the expected body in the response (default: Google is built by a large).",
          "value": "Google is built by a large"
        }
      },
      "path": "/usr/local/Cellar/ooniprobe/2.1.0/libexec/lib/python2.7/site-packages/ooni/nettests/third_party/lantern.py",
      "id": "lantern",
      "name": "Lantern Circumvention Tool Test"
    }
  });
});

app.post('/initialize', function(req, res) {
  initialized = true;
  res.json({});
});

app.get('/deck', function(req, res) {
  const currentSchema = {
    "available": {
      "tor": {
        "schedule": "@daily",
        "enabled": true,
        "name": "Tor test deck",
        "description": "This deck runs test related to testing the reachability of the Tor network"
      },
      "web": {
        "schedule": "@daily",
        "enabled": true,
        "name": "Web test deck",
        "description": "This deck runs HTTP Header Field Manipulation and the Web Connectivity test"
      },
      "im": {
        "schedule": "@daily",
        "enabled": true,
        "name": "Instant Messaging deck",
        "description": "This test deck will check to see if instant messaging applications are working"
      },
      "http-invalid": {
        "schedule": "@daily",
        "enabled": true,
        "name": "HTTP Invalid Request Line",
        "description": "This deck runs HTTP Invalid Request Line test"
      }
    },
    "enabled": {
      "tor": {
        "schedule": "@daily",
        "enabled": true,
        "name": "Tor test deck",
        "description": "This deck runs test related to testing the reachability of the Tor network"
      },
      "web": {
        "schedule": "@daily",
        "enabled": true,
        "name": "Web test deck",
        "description": "This deck runs HTTP Header Field Manipulation and the Web Connectivity test"
      },
      "im": {
        "schedule": "@daily",
        "enabled": true,
        "name": "Instant Messaging deck",
        "description": "This test deck will check to see if instant messaging applications are working"
      },
      "http-invalid": {
        "schedule": "@daily",
        "enabled": true,
        "name": "HTTP Invalid Request Line",
        "description": "This deck runs HTTP Invalid Request Line test"
      }
    }
  };
  const newSchema = {
    "decks": [
      {
        "id": "tor",
        "icon": "fa-wrench",
        "schedule": "@daily",
        "enabled": true,
        "running": false,
        "name": "Tor test deck",
        "tests": [
          "vanilla_tor"
        ],
        "description": "This deck runs test related to testing the reachability of the Tor network"
      },
      {
        "id": "web",
        "icon": "fa-unlink",
        "schedule": "@daily",
        "enabled": true,
        "running": false,
        "name": "Web test deck",
        "tests": [
          "http_header_field_manipulation",
          "web_connectivity"
        ],
        "description": "This deck runs HTTP Header Field Manipulation and the Web Connectivity test"
      },
      {
        "id": "im",
        "icon": "fa-comment-o",
        "schedule": "@daily",
        "enabled": true,
        "running": false,
        "name": "Instant Messaging deck",
        "tests": [
          "http_header_field_manipulation",
          "web_connectivity"
        ],
        "description": "This test deck will check to see if instant messaging applications are working"
      },
      {
        "id": "http-invalid",
        "icon": "fa-eye",
        "schedule": "@daily",
        "enabled": true,
        "running": true,
        "name": "HTTP Invalid Request Line",
        "tests": [
          "http_invalid_request_line"
        ],
        "description": "This deck runs HTTP Invalid Request Line test"
      }
    ]
  };
  res.json(newSchema);
});

app.post('/deck/*/enable', function(req, res) {
  res.json({});
});
app.post('/deck/*/disable', function(req, res) {
  res.json({});
});

app.get('/measurement', function(req, res) {
 res.json({
  "measurements": [
    {
      "size": -1,
      "running": false,
      "country_code": "GR",
      "test_name": "tcp_connect",
      "test_start_time": "20161214T085527Z",
      "completed": true,
      "keep": false,
      "asn": "AS1241",
      "stale": false,
      "id": "20161214T085527Z-GR-AS1241-tcp_connect",
      "deck_id": "tor"
    },
    {
      "size": -1,
      "running": false,
      "country_code": "GR",
      "test_name": "meek_fronted_requests_test",
      "test_start_time": "20161214T080637Z",
      "completed": true,
      "keep": false,
      "asn": "AS1241",
      "stale": false,
      "id": "20161214T080637Z-GR-AS1241-meek_fronted_requests_test",
      "deck_id": "web"
    },
    {
      "size": -1,
      "running": true,
      "country_code": "GR",
      "test_name": "facebook_messenger",
      "test_start_time": "20161214T080551Z",
      "completed": true,
      "keep": false,
      "asn": "AS1241",
      "stale": false,
      "id": "20161214T080551Z-GR-AS1241-facebook_messenger",
      "deck_id": "web"
    },
    {
      "size": -1,
      "running": false,
      "country_code": "GR",
      "test_name": "web_connectivity",
      "test_start_time": "20161214T080502Z",
      "completed": true,
      "keep": true,
      "asn": "AS1241",
      "stale": false,
      "id": "20161214T080502Z-GR-AS1241-web_connectivity",
      "deck_id": "web"
    }
  ]
 });
});

app.delete('/measurement/*', function(req, res) {
  res.json({});
});

app.post('/measurement/*/keep', function(req, res) {
  res.json({});
});

module.exports = app;
