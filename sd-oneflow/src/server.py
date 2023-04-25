#!/usr/bin/env -S accelerate launch --num_processes=12 --num_machines=1 --mixed_precision=no --dynamo_backend=no --
# -*- coding: UTF-8 -*-
import http.server
import socketserver
import json
import signal
import sys
from urllib.parse import urlparse, parse_qs

PORT = 7860


class JsonRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the query string
        query_string = urlparse(self.path).query
        query_params = parse_qs(query_string)

        # Process the request and generate a JSON response
        response = {
            'message': 'Hello, World!',
            'query_params': query_params
        }

        # Convert the response to a JSON string
        json_response = json.dumps(response)

        # Send the response headers
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', len(json_response))
        self.end_headers()

        # Send the JSON response
        self.wfile.write(json_response.encode())

    def txt2img(self):
        # Get the content length and read the request body
        content_length = int(self.headers.get('Content-Length', 0))
        raw_body = self.rfile.read(content_length)

        # Parse the JSON request body
        try:
            json_request = json.loads(raw_body)
        except json.JSONDecodeError:
            self.send_error(400, "Invalid JSON")
            return

        # Process the request and generate a JSON response
        response = {
            'message': 'Received JSON data',
            'data': json_request
        }

        # Convert the response to a JSON string
        json_response = json.dumps(response)

        # Send the response headers
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', len(json_response))
        self.end_headers()

        # Send the JSON response
        self.wfile.write(json_response.encode())
        self.wfile.close()

    def do_POST(self):
        request_path = urlparse(self.path).path
        if request_path == '/txt2img':
            self.txt2img()
        else:
            self.send_error(404, "Not Found")


def run_server(port):
    with socketserver.TCPServer(("", port), JsonRequestHandler) as httpd:
        try:
            print(f"Serving on port {port}")
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"Shutting down...")
            httpd.shutdown()


if __name__ == "__main__":
    run_server(PORT)
