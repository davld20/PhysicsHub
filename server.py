from http.server import HTTPServer, SimpleHTTPRequestHandler
from functools import partial
<<<<<<< HEAD
from pathlib import Path

DIRECTORY = Path(__file__).resolve().parent
=======

DIRECTORY = r"C:\Users\progold\Desktop\PH"
>>>>>>> 0975bce7c7d3dcd8fd0a3bb583aa8465bd000181

Handler = partial(SimpleHTTPRequestHandler, directory=DIRECTORY)

server = HTTPServer(("localhost", 8067), Handler)

print("Serving:", DIRECTORY)
print("Open: http://localhost:8067")

server.serve_forever()