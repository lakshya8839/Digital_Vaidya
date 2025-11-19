#!/usr/bin/env python3
"""
Setup script to create .env file for local development
"""
import os

def create_backend_env():
    """Create .env file in backend directory"""
    backend_env_path = os.path.join('backend', '.env')
    
    if os.path.exists(backend_env_path):
        print(f"✓ {backend_env_path} already exists")
        return
    
    env_content = """# Gemini API Configuration
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM

# Flask Configuration
SECRET_KEY=dev-secret-key-local-development
FLASK_ENV=development

# Frontend Origin (for CORS)
FRONTEND_ORIGIN=http://localhost:5000
"""
    
    with open(backend_env_path, 'w') as f:
        f.write(env_content)
    
    print(f"✓ Created {backend_env_path}")
    print("  - Gemini API key configured")
    print("  - Development mode enabled")

if __name__ == "__main__":
    print("Setting up local development environment...")
    print()
    create_backend_env()
    print()
    print("✓ Setup complete!")
    print()
    print("Next steps:")
    print("1. Install backend dependencies: cd backend && pip install -r requirements.txt")
    print("2. Run backend: cd backend && python wsgi.py")
    print("3. In another terminal, run frontend: npm run dev")
    print("4. Open http://localhost:5000 in your browser")

