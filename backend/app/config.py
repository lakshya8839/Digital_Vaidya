import os


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB upload limit
    UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER", os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "uploads")))
    CORS_ORIGINS = [
        os.environ.get("FRONTEND_ORIGIN", "http://localhost:5000"),
        "*",
    ]
    
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_recycle": 300,
        "pool_pre_ping": True,
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)


