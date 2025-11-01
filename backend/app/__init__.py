from flask import Flask
from flask_cors import CORS
from .config import Config
from .firebase_auth import initialize_firebase


def create_app(config_class: type = Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        supports_credentials=True,
    )

    initialize_firebase()

    from .routes.auth import bp as auth_bp
    from .routes.uploads import bp as uploads_bp
    from .routes.forms import bp as forms_bp
    from .routes.analyze import bp as analyze_bp
    from .routes.chatbot import bp as chatbot_bp
    from .routes.face_recognition import bp as face_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(uploads_bp, url_prefix="/api/uploads")
    app.register_blueprint(forms_bp, url_prefix="/api/forms")
    app.register_blueprint(analyze_bp, url_prefix="/api")
    app.register_blueprint(chatbot_bp, url_prefix="/api")
    app.register_blueprint(face_bp, url_prefix="/api")

    @app.get("/api/health")
    def health():
        return {"status": "ok"}

    return app


