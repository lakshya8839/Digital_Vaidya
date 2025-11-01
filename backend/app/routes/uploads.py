import os
from uuid import uuid4
from flask import Blueprint, current_app, request
from werkzeug.utils import secure_filename

bp = Blueprint("uploads", __name__)

ALLOWED = {"png", "jpg", "jpeg", "pdf"}


def allowed(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED


@bp.post("/aadhaar")
def upload_aadhaar():
    if "file" not in request.files:
        return {"ok": False, "error": "missing_file"}, 400
    file = request.files["file"]
    if file.filename == "":
        return {"ok": False, "error": "empty_filename"}, 400
    if not allowed(file.filename):
        return {"ok": False, "error": "unsupported_type"}, 400

    base = secure_filename(file.filename)
    ext = base.rsplit(".", 1)[1].lower()
    fname = f"aadhaar_{uuid4().hex}.{ext}"
    dest = os.path.join(current_app.config["UPLOAD_FOLDER"], fname)
    current_app.config_class.init_app(current_app)  # ensure folder
    file.save(dest)

    # Return mock parsed user data
    return {"ok": True, "file": fname, "user": {"name": "Aadhaar User"}}


