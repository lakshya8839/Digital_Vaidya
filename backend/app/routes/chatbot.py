from flask import Blueprint, request
from ..firebase_auth import optional_auth
from ..ai_service import chatbot_response

bp = Blueprint("chatbot", __name__)


@bp.post("/chatbot")
@optional_auth
def chat():
    try:
        data = request.get_json(silent=True) or {}
        message = data.get("message", "")
        affected_regions = data.get("affectedRegions", [])
        conversation_history = data.get("history", [])
        
        if not message:
            return {"ok": False, "error": "Message is required"}, 400
        
        try:
            response = chatbot_response(message, affected_regions, conversation_history)
            return {"ok": True, "response": response}
        except Exception as e:
            print(f"Chatbot API Error: {str(e)}")
            import traceback
            traceback.print_exc()
            return {
                "ok": False, 
                "error": f"AI service error: {str(e)}",
                "response": "I'm having trouble processing your request right now. Please try again or consult with a healthcare professional for medical advice."
            }, 500
    except Exception as e:
        print(f"Chatbot route error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {"ok": False, "error": f"Server error: {str(e)}"}, 500
