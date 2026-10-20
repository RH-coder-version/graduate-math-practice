"""Serve the study app locally using Python's standard library."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser

ROOT = Path(__file__).resolve().parent / "practice"
URL = "http://127.0.0.1:8931/"

def main():
    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT))
    try:
        server = ThreadingHTTPServer(("127.0.0.1", 8931), handler)
    except OSError as exc:
        print(f"Cannot start {URL}: {exc}")
        print("Check whether the app is already running on port 8931.")
        return 1
    print(f"Study workspace: {URL}  (Ctrl+C to stop)")
    webbrowser.open(URL)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
