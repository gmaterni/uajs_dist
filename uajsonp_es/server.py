#!/usr/bin/env python

import SimpleHTTPServer
import SocketServer
import sys

if len(sys.argv) > 1:port = int(sys.argv[1])
else:port=8080
print "port:%s" % (port)
SocketServer.TCPServer(("", port), SimpleHTTPServer.SimpleHTTPRequestHandler).serve_forever()
