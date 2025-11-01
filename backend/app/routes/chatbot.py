from flask import Blueprint, request
from ..firebase_auth import optional_auth
from ..ai_service import chatbot_response

bp = Blueprint("chatbot", __name__)


@bp.post("/chatbot")
@optional_auth
def chat():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "")
    affected_regions = data.get("affectedRegions", [])
    conversation_history = data.get("history", [])
    
    if not message:
        return {"ok": False, "error": "Message is required"}, 400
    
    response = chatbot_response(message, affected_regions, conversation_history)
    
    return {"ok": True, "response": response}
