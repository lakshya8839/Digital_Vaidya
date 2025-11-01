from flask import Blueprint, request
import json
import os
from datetime import datetime

bp = Blueprint("auth", __name__)

USERS_FILE = os.path.join(os.path.dirname(__file__), '..', '..', 'users_data.json')


def load_users():
    if os.path.exists(USERS_FILE):
        try:
            with open(USERS_FILE, 'r') as f:
                return json.load(f)
        except:
            return {}
    return {}


def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)


@bp.post("/save-user")
def save_user():
    data = request.get_json(silent=True) or {}
    uid = data.get("uid")
    email = data.get("email")
    display_name = data.get("displayName")
    photo_url = data.get("photoURL")
    provider = data.get("provider", "email")
    
    if not uid or not email:
        return {"ok": False, "error": "Missing required fields"}, 400
    
    users = load_users()
    
    now = datetime.utcnow().isoformat()
    
    if uid in users:
        users[uid]["lastLogin"] = now
        users[uid]["displayName"] = display_name or users[uid].get("displayName")
        users[uid]["photoURL"] = photo_url or users[uid].get("photoURL")
    else:
        users[uid] = {
            "uid": uid,
            "email": email,
            "displayName": display_name,
            "photoURL": photo_url,
            "provider": provider,
            "createdAt": now,
            "lastLogin": now
        }
    
    save_users(users)
    
    return {"ok": True, "user": users[uid]}


@bp.get("/users")
def get_users():
    users = load_users()
    return {"ok": True, "users": list(users.values())}


@bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    name = (email.split("@")[0] if email else "User").title()
    return {"ok": True, "user": {"name": name, "email": email}}


@bp.post("/signup")
def signup():
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    name = (email.split("@")[0] if email else "User").title()
    return {"ok": True, "user": {"name": name, "email": email}}


@bp.post("/face-login")
def face_login():
    return {"ok": True, "user": {"name": "Returning User"}}


