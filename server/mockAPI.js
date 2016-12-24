const express = require('express');

const app = express();
let initialized = false;

const newDecksSchema = [
  {
    "id": "tor",
    "icon": "fa-wrench",
    "schedule": "@daily",
    "enabled": true,
    "running": false,
    "name": "Tor test deck",
    "nettests": [
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
    "nettests": [
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
    "nettests": [
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
    "nettests": [
      "http_invalid_request_line"
    ],
    "description": "This deck runs HTTP Invalid Request Line test"
  }
];

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

app.post('/nettest/*/start', function(req, res) {
  res.json({});
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

app.get('/initialize', function(req, res) {
  res.json({
    'available_decks': newDecksSchema
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
    "decks": newDecksSchema
  };
  res.json(newSchema);
});

app.post('/deck/*/enable', function(req, res) {
  res.json({});
});
app.post('/deck/*/disable', function(req, res) {
  res.json({});
});
app.post('/deck/*/run', function(req, res) {
  res.json({});
});
app.post('/deck/*/start', function(req, res) {
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
      // These are added
      "result": "ok",
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
      "result": "ok",
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
      "result": "ok",
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
      "result": "error",
      "deck_id": "web"
    },
    {
      "size": -1,
      "running": false,
      "country_code": "GR",
      "test_name": "web_connectivity",
      "test_start_time": "20161213T080502Z",
      "completed": true,
      "keep": true,
      "asn": "AS1241",
      "stale": false,
      "id": "20161213T080502Z-GR-AS1241-web_connectivity",
      "result": "ok",
      "deck_id": "web"
    }
  ]
 });

});

app.get('/measurement/*/*', function(req, res){
  res.json({"test_keys": {"accessible": true, "control": {"tcp_connect": {"66.254.117.154:80": {"status": true, "failure": null}}, "http_request": {"body_length": 16167, "failure": null, "status_code": 200, "headers": {"X-Varnish": "897946656 896981080", "X-Cache": "HIT", "content-encoding": "", "Set-Cookie": "id=nd5000; expires=Wed, 21-Dec-2016 23:35:45 GMT; Max-Age=86400; path=/; domain=8thstreetlatinas.com", "Age": "1393", "Charset": "UTF-8", "Vary": "Accept-Encoding", "asisCache": "1", "Via": "1.1 varnish-v4", "Cache-control": "max-age=3600, public, private", "Date": "Tue, 20 Dec 2016 23:35:45 GMT", "Server": "Apache/2.2.22 (Debian)", "Content-Type": "text/html;charset=UTF-8", "Accept-Ranges": "bytes"}, "title": "8thStreetLatinas Official Porn Website"}, "dns": {"failure": null, "addrs": ["66.254.117.154"]}}, "control_failure": null, "socksproxy": null, "headers_match": true, "http_experiment_failure": null, "agent": "redirect", "title_match": true, "client_resolver": "193.92.3.5", "retries": 1, "dns_consistency": "consistent", "dns_experiment_failure": null, "body_proportion": 1.0, "queries": [{"resolver_hostname": null, "query_type": "A", "hostname": "8thstreetlatinas.com", "answers": [{"ipv4": "66.254.117.154", "answer_type": "A"}], "failure": null, "resolver_port": null}], "body_length_match": true, "requests": [{"failure": null, "request": {"body": null, "headers": {"Accept-Language": "en-US;q=0.8,en;q=0.5", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"}, "url": "http://www.8thstreetlatinas.com/", "method": "GET", "tor": {"is_tor": false, "exit_name": null, "exit_ip": null}}, "response": {"body": "<html>\r\n<head>\r\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\" >\n<meta name=\"RATING\" content=\"RTA-5042-1996-1400-1577-RTA\" >\n<meta http-equiv=\"content-language\" content=\"en\" >\n<meta name=\"google-site-verification\" content=\"sLloVn5RsimdrkA4dSkLB2W4mAa4Y6mkoIbUMFswEBY\" >\n<meta name=\"description\" content=\"Check out 8thStreetLatinas  official pornsite featuring top rated pornstars and XXX videos.\" >\n<meta name=\"keywords\" content=\"8thStreetLatinas,8th Street Latinas,8thStreetLatinas pornsite,8th Street Latinas pornsite, porn website,8thStreetLatinas.com\" >\n<meta name=\"robots\" content=\"index, follow\" >    <link rel=\"canonical\" href=\"http://www.8thstreetlatinas.com\" />\n<title>8thStreetLatinas Official Porn Website</title>\r\n<script src=\"http://cdn.hw.assets.realitykings.com/Rk/RKSubsite/Tour/assets/js/common.header.6720979d.js\"></script>\n<script src=\"http://cdn.hw.assets.realitykings.com/Rk/RKSubsite/Tour/assets/js/css_browser_selector.9f1c9186.js\"></script>\n\n\n<link rel=\"stylesheet\" href=\"http://cdn.hw.assets.realitykings.com/Rk/RKSubsite/Tour/assets/css/video-js.55e3ba69.css\"><link rel=\"stylesheet\" href=\"http://cdn.hw.assets.realitykings.com/Rk/8thStreetLatinasCom/Tour/assets/css/main.603a73ac.css\"><!-- Google Analytics -->\n<script>\n(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\nm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n})(window,document,'script','//www.google-analytics.com/analytics.js','_gaTracker');\n_gaTracker(\"create\",JSON.parse('{\"trackingId\":\"UA-4504753-4\"}'));\n_gaTracker(\"require\",\"linker\");\n_gaTracker(\"linker:autoLink\",JSON.parse('[\"probiller.com\"]'));\n_gaTracker(\"require\",\"displayfeatures\");\n</script>\n<!-- End Google Analytics --><!-- Google Analytics -->\n<script>\n_gaTracker(\"send\",\"pageview\");\n</script>\n<!-- End Google Analytics --> </head>\r\n<body>\r\n<div class=\"site-container disclaimer\">\r\n    <div class=\"site-pusher\">\r\n    \r\n    \t<div id=\"very-top-header\">\r\n\t\t\t<img src=\"http://cdn.hw.assets.realitykings.com/Rk/RKSubsite/Tour/assets/img/rk_logo.png\" alt=\"Reality Kings\" class=\"full-w full-t\"/>\r\n    \t</div>\r\n\r\n        <div id=\"top-header\" class=\"clearfix\">\r\n            <a href=\"#\" class=\"header-icon\" id=\"header-icon\"></a>\r\n            <div class=\"network\">\r\n                <img src=\"http://cdn.hw.assets.realitykings.com/Rk/RKSubsite/Tour/assets/img/rk_logo.png\"  alt=\"RealityKings\"/>\r\n                <span>presents</span>\r\n            </div>\r\n            <div id=\"top-join\">\r\n            \t<a href=\"http://www.8thstreetlatinas.com/tour/join/\" class=\"btn\" rel=\"nofollow\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:PAGETOP:LINK:join\">Join Now!</a>\r\n            </div>\r\n            <ul class=\"member-links\">\r\n                <li><a href=\"http://new.members.8thstreetlatinas.com\" class=\"s\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:ACCESS:PAGETOP:LINK:members\">Members</a></li>\r\n                <li ><a href=\"http://www.8thstreetlatinas.com/tour/join/\" class=\"btn\" rel=\"nofollow\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:ACCESS:PAGETOP:LINK:join\">Join Now!</a></li>\r\n            </ul>\r\n        </div>\r\n\r\n        <div class=\"container\">\r\n            <div id=\"header-ill\">\r\n                <div class=\"bg hd0-disclaimer\">\r\n                    <div class=\"lgo\"><img src=\"/assets/Rk/8thStreetLatinasCom/Tour/assets/img/logo.png\" alt=\"8th Street Latinas\"/></a></div>\r\n                </div>\r\n            </div>\r\n            <header class=\"header mob-only\">\r\n               <nav class=\"menu clearfix\">\r\n                <a href=\"/tour/home/\" class=\"logo\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:LINK:enter\"><img src=\"/assets/Rk/8thStreetLatinasCom/Tour/assets/img/logo.png\" alt=\"\" class=\"full-w\"></a> \r\n                <a href=\"http://www.8thstreetlatinas.com/tour/join/\" class=\"btn bld\" rel=\"nofollow\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:ACCESS:PAGETOP:LINK:join\">Get instant access</a> \r\n                <hr/>\r\n                <a href=\"http://new.members.8thstreetlatinas.com\" class=\"s\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:ACCESS:PAGETOP:LINK:members\">Members</a></li>\r\n              </nav>\r\n            </header>\r\n        </div>\r\n\r\n        <div class=\"site-content\">\r\n            <div class=\"container clearfix\">\r\n                <div class=\"in\">\r\n                    <h1>8th Street Latinas</h1>\r\n                    \r\n<p>This website contains information, links,images and videos of the RealityKings explicit material. If you are under the age of 21, if such material offends you or if it's illegal to view such material in your community please do not continue.</p>\r\n\r\n<div class=\"clearfix\">\r\n    <div class=\"col-lg\">\r\n        <div class=\"col-lg-ins\">\r\n            <p class=\"tp\"><strong>Please read and comply with the following conditions before you continue: </strong></p>\r\n            <div class=\"terms small\">\r\n                <p>I am at least 21 years of age.</p>\r\n                <p>The sexually explicit material I am viewing is for my own personal use and I will not expose minors to the material.</p>\r\n                <p>I desire to receive/view sexually explicit material.</p>\r\n                <p>I believe that as an adult it is my inalienable right to receive/view sexually explicit material. Whether it be a school girl having sex, big boobs being exposed or school girls with big tits</p>\r\n                <p>I believe that sexual acts between consenting adults are neither offensive nor obscene.</p>\r\n                <p>The viewing, reading and downloading of sexually explicit materials does not violate the standards of my community, town, city, state or country.</p>\r\n                <p>I am solely responsible for any false disclosures or legal ramifications of viewing, reading or downloading any material in this site including school girl content. Furthermore this website nor its affiliates will be held responsible for any legal ramifications arising from fraudulent entry into or use of this website.</p>\r\n                <p>I agree that by entering this website, I am subjecting myself and any business entity of which I have any legal or equitable interest to the personal jurisdiction of the State of Florida should any dispute arise at any time between this website and myself and/or such business entity.</p>\r\n                <p>This warning page constitutes a legal agreement between this website and you and/or any business in which you have any legal or equitable interest. If any portion of this agreement is deemed unenforceable by a court of competent jurisdiction it shall not affect the enforceability of the other portions of the agreement.</p>\r\n                <p>All performers and school girls on this site are over the age of 18, have consented being photographed and/or filmed, have signed model release and provided proof of age, believe it is their right to engage in consensual sexual acts and exposing their boobs for the entertainment and education of other adults and believe it is your right as an adult to watch them doing what adults do, such as playing with big boobs and school girls having sex.</p>\r\n                <p>All girls appearing on this website are 18 years or older. <a href=\"http://service.adultprovide.com/docs/records.htm\" rel=\"nofollow\" data-trackname=\"disc-click-here\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:LINK:disclaimer box\">Click here</a> for records required pursuant to 18 U.S.C. - 2257 Statement. By entering this site you swear that you are of legal age in your area to view adult material and that you wish to view such material.</p>\r\n                <p>The videos and images in this <a href=\"http://www.realitykings.com\" class=\"text\" data-trackname=\"disc-bz-link\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:LINK:disclaimer box - realitykings\">realitykings</a> site are intended to be used by responsible adults as sexual aids, to provide sexual education and to provide sexual entertainment for any type of porn including school girls and pornstars.</p>\r\n                <p>All performers are given the opportunity to be tested for sexually transmitted diseases at no charge to themselves within a reasonable amount of time before their performance. All activity is arranged and discussed in advance of filming and every effort is made to insure the health and safety of the performers and to ensure that their performance is a pleasant and enjoyable experience.</p>\r\n                <p>So, without too much further ado, if you've read and fully understand the above agreement, and you affirm and swear that viewing/downloading/receiving sexually explicit materials of school girls or any other pornstars on realitykings sites, does not violate the standards of your community, that you won't make any of the materials available to minors in any form, that you believe it is your constitutional right to view these materials, that you are wholly liable for any legal ramifications that may arise for your receiving or viewing of these materials and that you are over the age of 21...</p>\r\n            </div>\r\n           \r\n \r\n         \r\n        </div>\r\n    </div>\r\n    \r\n\r\n    <div class=\"col-sm\">\r\n    \t<p class=\"agree top\">I AGREE:</p>\r\n        <h2 class=\"agree\"> \r\n            <a id=\"enter-mic-button\" class=\"bld\" rel=\"nofollow\" href=\"/tour/home/\" data-trackname=\"disc-agree\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:LINK:enter-button\">\r\n                ENTER <span class=\"bld\">8TH STREET LATINAS</span>\r\n            </a>\r\n        </h2>\r\n        <p class=\"agree not\">\r\n            I DISAGREE: <a href=\"http://www.google.com\" data-trackname=\"disc-exit\" rel=\"nofollow\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:LINK:exit here\">EXIT HERE</a>\r\n        </p>\r\n    </div>\r\n</div>    \r\n    \r\n<p class=\"lght\">Reality Kings presents MILF Hunter the ORIGINAL reality porn site dedicated to MILFs and mature sex content. If you don't know what a MILF is, allow us to explain... we're talking about sex starved, smokin' hot moms that are in need of a little attention--a MILF, a Mother I'd Like to Fuck! We've all seen these moms at the mall, the beach, and around town. Watch every week as the Hunter captures another hottie on film and gives them what they've been craving... some dick! These moms are seriously hot MILFs and they appear in the most incredible high quality pics and movies! We have hundreds of mature porn videos available for you to download. Or if you're looking for photos we have thousands of high resolution MILF porn pics directly from the MILF Hunter! Reality Kings brings you the best mature sex scenes around so why not join the MILF Hunter hunt down mature moms across America...</p>\r\n\r\n <a href=\"http://www.8thstreetlatinas.com/tour/join/\"\r\n       rel=\"nofollow\"\r\n       data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:JOIN get\"\r\n       class=\"btn btn-big\">\r\n           <span class=\"bld\">GET INSTANT ACCESS</span> The #1 Adult Network in the World\r\n</a>                </div>\r\n            </div>\r\n             \n\n<div id=\"footer\">\n    <div class=\"container clearfix\">\n        <div class=\"col-ft-lg\">\n          <div class=\"ins\">\n            <ul class=\"footer-menu\">\n                <li>\n                    <a href=\"/tour/sitemap/\" \n                       data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:porn directory\">\n                       Porn Directory\n                    </a> |\n                </li>\n                <li>\n                    <a href=\"mailto:ndcompliance@gmail.com?subject=REPORT+SPAM+\" rel=\"nofollow\" target=\"_blank\"\n                       data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:EMAIL:report spam\">\n                       Report Spam\n                    </a> |\n                </li>\n                <li>\n                    <a href=\"http://www.nastydollars.com\" rel=\"nofollow\" target=\"_blank\"\n                       data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:webmasters\">\n                        Webmasters\n                    </a> |\n                </li>\n                <li>\n                    <a href=\"http://support.realitykings.com/\" rel=\"nofollow\" target=\"_blank\"\n                       data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:customer support\">\n                        Customer Support\n                    </a> |\n                </li>\n                <li>\n                    <a href=\"http://www.bigdickstudsearch.com/\" rel=\"nofollow\" target=\"_blank\"\n                       data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:stud search\">\n                       Stud Search\n                    </a>\n                </li>\n            </ul>\n        <div class=\"footer-notice\">\n            <p>\n                All models appearing on this website are 18 years or older.\n                <a href=\"http://service.adultprovide.com/docs/records.htm\" rel=\"nofollow\" data-trackname=\"foot-click-here\"\n                   data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:footer click here\">\n                    Click here\n                </a>\n                for records required pursuant to 18 U.S.C. 2257 Record Keeping Requirements Compliance Statement. By entering this site you swear that you are of legal age in your area to view adult material and that you wish to view such material.\n            </p>\n        </div>\n        <div class=\"footer-biller-section\" id=\"offerinfo\"></div>\n        <div class=\"footer-biller-section\">\n            <p>Please visit <a href=\"http://www.achdebit.com/membership.php\" rel=\"nofollow\" target=\"_blank\">WTS</a> | <a href=\"https://epoch.com/en/index.html\" rel=\"nofollow\" target=\"_blank\">Epoch</a> | <a href=\"https://support.ccbill.com/\" rel=\"nofollow\" target=\"_blank\">CCbill</a> | <a href=\"http://www.gxbill.com/customer_service/\" rel=\"nofollow\" target=\"_blank\">GXB</a> our authorized sales agents.</p>\n            <p>Please visit <a href=\"http://vendosupport.com/\" rel=\"nofollow\" target=\"blank\" title=\"Vendo\" data-trackname=\"foot-vendo\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:vendo\">Vendo</a>, our authorized sales agents.</p>\n            <ul class=\"footer-menu small\">\n                <li><a href=\"http://service.adultprovide.com/docs/privacy.htm\" rel=\"nofollow\" target=\"_blank\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:privacy policy\">Privacy Policy</a></li>\n                <li><a href=\"http://service.adultprovide.com/docs/terms.htm\" rel=\"nofollow\" target=\"_blank\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:terms\">Terms</a></li>\n                <li><a href=\"http://service.adultprovide.com/docs/records.htm\" rel=\"nofollow\" target=\"_blank\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:dmca agent\">DMCA Agent</a></li>\n            </ul>\n            <p>\n                <img src=\"http://cache.rk.com/rk/paysites-billers-wh.png\" class=\"full-w billing\" alt=\"Billers\"/>\n            </p>\n            <a href=\"http://www.safelabeling.org\" rel=\"nofollow\" target=\"_blank\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:safe labeling\"><img src=\"http://cache.rk.com/zexit/images/labeled.gif\" alt=\"Safe Labeling\"/></a>\n            <a href=\"http://www.asacp.org\" rel=\"nofollow\" target=\"_blank\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:asacp\" ><img src=\"http://cache.rk.com/zexit/images/asacp.gif\" alt=\"ASACP\"/></a>\n            <a href=\"http://www.rtalabel.org\" rel=\"nofollow\" target=\"_blank\" data-trackid=\"SL:TOUR:ACCESS:DISCLAIMER:FOOTER:LINK:rta label\"><img src=\"http://cache.rk.com/zexit/images/rta.jpg\" alt=\"RTA\"/></a>\n        </div>\n           </div>\n        </div>\n        <div class=\"col-ft-sm\">\n            <div class=\"ins\">\n                <img src=\"/assets/Rk/8thStreetLatinasCom/Tour/assets/img/logo.png\" alt=\"www.8thStreetLatinas.com\" class=\"full-w full-t\"/>\n            \t<p>Copyright 2016 - RK Premium Limited<br> Trademarks - Licensing IP International S.\u00e0.r.l</p>\n            </div>\n        </div>\n    </div>\n</div>            <div class=\"site-cache\" id=\"site-cache\"></div>\r\n        </div>\r\n\r\n  </div>\r\n</div>\r\n<script src=\"http://cdn.hw.assets.realitykings.com/Rk/RKSubsite/Tour/assets/js/common.footer.92c663e1.js\"></script>\n\n</body>\r\n</html>", "headers": {"X-Varnish": "651136891 649776740", "X-Cache": "HIT", "content-encoding": "", "Set-Cookie": "id=nd5000; expires=Wed, 21-Dec-2016 23:37:29 GMT; Max-Age=86400; path=/; domain=8thstreetlatinas.com", "Age": "1370", "Charset": "UTF-8", "Vary": "Accept-Encoding", "asisCache": "1", "Via": "1.1 varnish-v4", "Cache-control": "max-age=3600, public, private", "Date": "Tue, 20 Dec 2016 23:37:29 GMT", "Server": "Apache/2.2.22 (Debian)", "Content-Type": "text/html;charset=UTF-8", "Accept-Ranges": "bytes"}, "code": 200}}, {"failure": null, "request": {"body": null, "headers": {"Accept-Language": "en-US;q=0.8,en;q=0.5", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"}, "url": "http://8thstreetlatinas.com", "method": "GET", "tor": {"is_tor": false, "exit_name": null, "exit_ip": null}}, "response": {"body": null, "headers": {"X-Varnish": "893843918 897946249", "X-Cache": "HIT", "Set-Cookie": "RNLBSERVERID=rk_v1; path=/", "Age": "139", "Vary": "Accept-Encoding", "Server": "Apache/2.2.22 (Debian)", "Via": "1.1 varnish-v4", "Location": "http://www.8thstreetlatinas.com/", "Cache-control": "private", "Date": "Tue, 20 Dec 2016 23:57:59 GMT", "Content-Type": "text/html; charset=iso-8859-1"}, "code": 301}}], "tcp_connect": [{"status": {"failure": null, "success": true, "blocked": false}, "ip": "66.254.117.154", "port": 80}], "blocking": false, "status_code_match": true}, "software_version": "2.1.0", "test_runtime": 2.7851650714874268, "test_start_time": "2016-12-21 00:00:17", "input_hashes": [], "software_name": "ooniprobe", "options": ["--file", "$citizenlab_global_urls"], "data_format_version": "0.2.0", "measurement_start_time": "2016-12-21 00:00:17", "test_version": "0.1.0", "probe_city": null, "test_name": "web_connectivity", "id": "ea0234fe-c846-4bb3-ac8e-84e5d262fb59", "input": "http://8thstreetlatinas.com", "probe_ip": "127.0.0.1", "probe_cc": "GR", "probe_asn": "AS1241", "annotations": {"platform": "macos"}, "test_helpers": {"backend": {"type": "https", "address": "https://a.web-connectivity.th.ooni.io:4442"}}, "report_id": "20161220T235951Z_AS1241_BRmSgeOEw83exlPlVbcI5Fz2IjnP7fFCrtma6iteTcFlyDOyeJ"});
});

app.get('/measurement/*', function(req, res){
  res.json({"test_start_time": "2016-12-23 10:57:08", "test_name": "tcp_connect", "results": [{"url": "obfs4 109.105.109.165:24215", "anomaly": false, "idx": 0}, {"url": "obfs4 109.105.109.146:27668", "anomaly": false, "idx": 1}, {"url": "obfs4 109.105.109.165:10527", "anomaly": false, "idx": 2}, {"url": "obfs4 109.105.109.147:13764", "anomaly": false, "idx": 3}, {"url": "obfs4 178.209.52.110:443", "anomaly": true, "idx": 4}, {"url": "obfs4 83.212.101.3:41213", "anomaly": false, "idx": 5}, {"url": "obfs4 83.212.101.3:50000", "anomaly": false, "idx": 6}, {"url": "obfs4 83.212.101.3:50001", "anomaly": false, "idx": 7}, {"url": "obfs4 83.212.101.3:50002", "anomaly": false, "idx": 8}, {"url": "obfs4 83.212.101.3:50003", "anomaly": false, "idx": 9}, {"url": "obfs4 83.212.101.3:50004", "anomaly": false, "idx": 10}, {"url": "obfs4 83.212.101.3:50005", "anomaly": false, "idx": 11}, {"url": "obfs4 83.212.101.3:50006", "anomaly": false, "idx": 12}, {"url": "obfs4 83.212.101.3:50007", "anomaly": false, "idx": 13}, {"url": "obfs4 83.212.101.3:50008", "anomaly": false, "idx": 14}, {"url": "obfs4 83.212.101.3:50009", "anomaly": false, "idx": 15}, {"url": "obfs3 83.212.101.3:80", "anomaly": false, "idx": 16}, {"url": "83.212.101.3:22", "anomaly": false, "idx": 17}, {"url": "scramblesuit 83.212.101.3:443", "anomaly": true, "idx": 18}, {"url": "109.105.109.165:22", "anomaly": true, "idx": 19}, {"url": "109.105.109.146:22", "anomaly": true, "idx": 20}, {"url": "178.209.52.110:22", "anomaly": true, "idx": 21}, {"url": "obfs4 198.245.60.50:443", "anomaly": false, "idx": 22}, {"url": "198.245.60.50:22", "anomaly": false, "idx": 23}, {"url": "obfs4 192.99.11.54:443", "anomaly": false, "idx": 24}, {"url": "192.99.11.54:22", "anomaly": false, "idx": 25}, {"url": "obfs4 104.131.108.182:56880", "anomaly": true, "idx": 26}, {"url": "fte 192.240.101.106:80", "anomaly": true, "idx": 27}, {"url": "obfs4 154.35.22.9:60873", "anomaly": true, "idx": 28}, {"url": "obfs4 154.35.22.9:1984", "anomaly": true, "idx": 29}, {"url": "obfs4 154.35.22.9:443", "anomaly": true, "idx": 30}, {"url": "obfs4 154.35.22.9:80", "anomaly": true, "idx": 31}, {"url": "obfs4 154.35.22.9:5881", "anomaly": true, "idx": 32}, {"url": "obfs4 154.35.22.9:7013", "anomaly": true, "idx": 33}, {"url": "obfs4 154.35.22.9:12166", "anomaly": true, "idx": 34}, {"url": "obfs4 154.35.22.9:14303", "anomaly": true, "idx": 35}, {"url": "obfs4 154.35.22.9:25427", "anomaly": true, "idx": 36}, {"url": "obfs4 154.35.22.9:29733", "anomaly": true, "idx": 37}, {"url": "obfs4 154.35.22.9:40782", "anomaly": true, "idx": 38}, {"url": "obfs4 154.35.22.10:41835", "anomaly": false, "idx": 39}, {"url": "obfs4 154.35.22.10:1984", "anomaly": false, "idx": 40}, {"url": "obfs4 154.35.22.10:443", "anomaly": false, "idx": 41}, {"url": "obfs4 154.35.22.10:80", "anomaly": false, "idx": 42}, {"url": "obfs4 154.35.22.10:2934", "anomaly": false, "idx": 43}, {"url": "obfs4 154.35.22.10:9332", "anomaly": false, "idx": 44}, {"url": "obfs4 154.35.22.10:15937", "anomaly": false, "idx": 45}, {"url": "obfs4 154.35.22.10:24338", "anomaly": false, "idx": 46}, {"url": "obfs4 154.35.22.10:26336", "anomaly": false, "idx": 47}, {"url": "obfs4 154.35.22.10:26703", "anomaly": false, "idx": 48}, {"url": "obfs4 154.35.22.10:40348", "anomaly": false, "idx": 49}, {"url": "obfs4 154.35.22.10:46345", "anomaly": false, "idx": 50}, {"url": "obfs4 154.35.22.10:55622", "anomaly": false, "idx": 51}, {"url": "obfs4 154.35.22.10:56472", "anomaly": false, "idx": 52}, {"url": "154.35.22.10:22", "anomaly": false, "idx": 53}, {"url": "obfs4 154.35.22.11:49868", "anomaly": false, "idx": 54}, {"url": "obfs4 154.35.22.11:1984", "anomaly": false, "idx": 55}, {"url": "obfs4 154.35.22.11:443", "anomaly": false, "idx": 56}, {"url": "obfs4 154.35.22.11:80", "anomaly": false, "idx": 57}, {"url": "obfs4 154.35.22.9:42487", "anomaly": true, "idx": 58}, {"url": "obfs4 154.35.22.9:48869", "anomaly": true, "idx": 59}, {"url": "obfs4 154.35.22.9:50819", "anomaly": true, "idx": 60}, {"url": "obfs4 154.35.22.11:2413", "anomaly": true, "idx": 61}, {"url": "obfs4 154.35.22.11:7920", "anomaly": true, "idx": 62}, {"url": "obfs4 154.35.22.11:16488", "anomaly": true, "idx": 63}, {"url": "obfs4 154.35.22.11:17613", "anomaly": true, "idx": 64}, {"url": "obfs4 154.35.22.11:36652", "anomaly": true, "idx": 65}, {"url": "obfs4 154.35.22.11:44594", "anomaly": true, "idx": 66}, {"url": "obfs4 154.35.22.11:54823", "anomaly": true, "idx": 67}, {"url": "obfs4 154.35.22.11:58028", "anomaly": true, "idx": 68}, {"url": "154.35.22.11:22", "anomaly": false, "idx": 69}, {"url": "obfs4 154.35.22.12:80", "anomaly": false, "idx": 70}, {"url": "obfs4 154.35.22.12:443", "anomaly": false, "idx": 71}, {"url": "obfs4 154.35.22.12:1984", "anomaly": false, "idx": 72}, {"url": "obfs4 154.35.22.12:1894", "anomaly": false, "idx": 73}, {"url": "obfs4 154.35.22.12:4148", "anomaly": false, "idx": 74}, {"url": "obfs4 154.35.22.12:4304", "anomaly": false, "idx": 75}, {"url": "obfs4 154.35.22.12:13023", "anomaly": false, "idx": 76}, {"url": "obfs4 154.35.22.12:26715", "anomaly": false, "idx": 77}, {"url": "obfs4 154.35.22.12:26919", "anomaly": false, "idx": 78}, {"url": "obfs4 154.35.22.12:34939", "anomaly": false, "idx": 79}, {"url": "obfs4 154.35.22.12:36882", "anomaly": false, "idx": 80}, {"url": "obfs4 154.35.22.12:40033", "anomaly": false, "idx": 81}, {"url": "obfs4 154.35.22.12:44899", "anomaly": false, "idx": 82}, {"url": "154.35.22.12:22", "anomaly": false, "idx": 83}, {"url": "obfs4 154.35.22.11:60166", "anomaly": true, "idx": 84}, {"url": "obfs4 154.35.22.11:64841", "anomaly": true, "idx": 85}, {"url": "obfs4 154.35.22.13:80", "anomaly": true, "idx": 86}, {"url": "obfs4 154.35.22.13:443", "anomaly": true, "idx": 87}, {"url": "obfs4 154.35.22.13:1984", "anomaly": true, "idx": 88}, {"url": "obfs4 154.35.22.13:4319", "anomaly": true, "idx": 89}, {"url": "obfs4 154.35.22.13:6041", "anomaly": true, "idx": 90}, {"url": "obfs4 154.35.22.13:16815", "anomaly": true, "idx": 91}, {"url": "obfs4 154.35.22.13:17878", "anomaly": true, "idx": 92}, {"url": "obfs4 154.35.22.13:29243", "anomaly": true, "idx": 93}, {"url": "obfs4 154.35.22.13:30956", "anomaly": true, "idx": 94}, {"url": "obfs4 154.35.22.13:39004", "anomaly": true, "idx": 95}, {"url": "obfs4 154.35.22.13:50681", "anomaly": true, "idx": 96}, {"url": "obfs4 192.95.36.142:443", "anomaly": false, "idx": 97}, {"url": "192.95.36.142:2200", "anomaly": false, "idx": 98}, {"url": "85.17.30.79:22", "anomaly": false, "idx": 99}, {"url": "obfs4 85.17.30.79:443", "anomaly": false, "idx": 100}, {"url": "obfs3 169.229.59.74:31493", "anomaly": false, "idx": 101}, {"url": "obfs3 169.229.59.75:46328", "anomaly": false, "idx": 102}, {"url": "obfs3 109.105.109.163:38980", "anomaly": false, "idx": 103}, {"url": "obfs3 109.105.109.163:47779", "anomaly": false, "idx": 104}, {"url": "fte 131.252.210.150:8080", "anomaly": false, "idx": 105}, {"url": "fte 128.105.214.161:8080", "anomaly": false, "idx": 106}, {"url": "128.105.214.162:8080", "anomaly": false, "idx": 107}, {"url": "fte 128.105.214.163:8080", "anomaly": false, "idx": 108}, {"url": "128.31.0.39:9101", "anomaly": false, "idx": 109}, {"url": "128.31.0.39:9131", "anomaly": false, "idx": 110}, {"url": "86.59.21.38:443", "anomaly": false, "idx": 111}, {"url": "86.59.21.38:80", "anomaly": false, "idx": 112}, {"url": "194.109.206.212:443", "anomaly": false, "idx": 113}, {"url": "194.109.206.212:80", "anomaly": false, "idx": 114}, {"url": "37.218.247.217:443", "anomaly": false, "idx": 115}, {"url": "37.218.247.217:80", "anomaly": false, "idx": 116}, {"url": "131.188.40.189:443", "anomaly": false, "idx": 117}, {"url": "131.188.40.189:80", "anomaly": false, "idx": 118}, {"url": "193.23.244.244:443", "anomaly": false, "idx": 119}, {"url": "193.23.244.244:80", "anomaly": false, "idx": 120}, {"url": "171.25.193.9:80", "anomaly": false, "idx": 121}, {"url": "171.25.193.9:443", "anomaly": false, "idx": 122}, {"url": "154.35.175.225:443", "anomaly": false, "idx": 123}, {"url": "154.35.175.225:80", "anomaly": false, "idx": 124}, {"url": "199.254.238.52:443", "anomaly": false, "idx": 125}, {"url": "199.254.238.52:80", "anomaly": false, "idx": 126}, {"url": "obfs4 154.35.22.13:59765", "anomaly": true, "idx": 127}, {"url": "obfs4 154.35.22.13:62623", "anomaly": true, "idx": 128}, {"url": "154.35.22.13:22", "anomaly": true, "idx": 129}], "country_code": "GR", "asn": "AS1241"})
});


app.delete('/measurement/*', function(req, res) {
  res.json({});
});

app.post('/measurement/*/keep', function(req, res) {
  res.json({});
});

module.exports = app;
