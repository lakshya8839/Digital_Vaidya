from app import create_app
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = create_app()

if __name__ == "__main__":
    debug = os.environ.get("FLASK_ENV") == "development"
    port = int(os.environ.get("PORT", 8000))
    print(f"\n{'='*50}")
    print(f"🚀 Digital Vaidya Backend Server")
    print(f"{'='*50}")
    print(f"📍 Running on: http://localhost:{port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"🌐 CORS enabled for: {os.environ.get('FRONTEND_ORIGIN', 'http://localhost:5000')}")
    print(f"{'='*50}\n")
    app.run(host="0.0.0.0", port=port, debug=debug)


