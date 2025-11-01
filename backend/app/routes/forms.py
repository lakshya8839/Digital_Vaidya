from flask import Blueprint, request
from ..firebase_auth import optional_auth

bp = Blueprint("forms", __name__)


@bp.post("/feedback")
@optional_auth
def feedback():
    data = request.get_json(silent=True) or {}
    user_info = None
    if hasattr(request, 'user') and request.user:
        user_info = {
            "uid": request.user.get("uid"),
            "email": request.user.get("email")
        }
    return {"ok": True, "received": data, "user": user_info}


@bp.post("/contact")
@optional_auth
def contact():
    data = request.get_json(silent=True) or {}
    user_info = None
    if hasattr(request, 'user') and request.user:
        user_info = {
            "uid": request.user.get("uid"),
            "email": request.user.get("email")
        }
    return {"ok": True, "received": data, "user": user_info}


