import json
import os
from google import genai
from google.genai import types

# IMPORTANT: KEEP THIS COMMENT
# Follow these instructions when using this blueprint:
# - Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"
#   - do not change this unless explicitly requested by the user

# This API key is from Gemini Developer API Key, not vertex AI API Key
# Try GEMINI_API_KEY first, fall back to GOOGLE_API_KEY
def get_gemini_client():
    """Get or create Gemini client instance"""
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY or GOOGLE_API_KEY environment variable is required")
    return genai.Client(api_key=api_key)


def analyze_symptoms_with_ai(description, health_params, affected_regions):
    """
    Analyze symptoms using OpenAI's GPT-5 model.
    
    Args:
        description: Patient's description of symptoms
        health_params: Dictionary containing temperature, BP, heart rate, oxygen level
        affected_regions: List of body regions marked as painful/affected
    
    Returns:
        Dictionary containing AI-generated analysis with conditions, urgency, and summary
    """
    
    temperature = health_params.get("temperature")
    systolic_bp = health_params.get("systolicBP")
    diastolic_bp = health_params.get("diastolicBP")
    heart_rate = health_params.get("heartRate")
    oxygen_level = health_params.get("oxygenLevel")
    
    vital_signs_text = []
    if temperature:
        vital_signs_text.append(f"Temperature: {temperature}°C")
    if systolic_bp and diastolic_bp:
        vital_signs_text.append(f"Blood Pressure: {systolic_bp}/{diastolic_bp} mmHg")
    if heart_rate:
        vital_signs_text.append(f"Heart Rate: {heart_rate} bpm")
    if oxygen_level:
        vital_signs_text.append(f"Oxygen Saturation: {oxygen_level}%")
    
    affected_regions_text = ", ".join(affected_regions) if affected_regions else "None specified"
    vital_signs_str = ", ".join(vital_signs_text) if vital_signs_text else "None provided"
    
    prompt = f"""You are a medical AI assistant helping to analyze patient symptoms. Based on the information provided, generate a preliminary health assessment.

Patient Information:
- Symptom Description: {description if description else "Not provided"}
- Affected Body Regions: {affected_regions_text}
- Vital Signs: {vital_signs_str}

Please analyze this information and provide:
1. Possible conditions (list of 2-4 potential diagnoses based on symptoms and vital signs)
2. Urgency level (choose from: "Non-urgent - Self-care recommended", "Monitor closely - See doctor if worsens", "Seek medical attention within 24-48 hours", "Seek medical attention promptly within 24 hours", "Seek immediate medical attention - Emergency")
3. Region-specific analysis (for each affected body region, provide brief analysis with possible causes)
4. Symptom explanations (explain what each symptom might indicate)
5. Possible solutions (actionable self-care recommendations and treatments for each condition)
6. Related condition symptoms (what other symptoms might appear if the condition worsens or if it's a related problem)
7. Doctor visit recommendation (clearly explain WHY and WHEN to see a doctor based on vital signs and symptoms)
8. A comprehensive summary of the patient's condition

IMPORTANT: Consider the vital signs carefully:
- Temperature >38°C (100.4°F) or <36°C (96.8°F) suggests fever or hypothermia
- BP >140/90 is high, <90/60 is low
- Heart rate >100 is high (tachycardia), <60 is low (bradycardia)
- Oxygen <95% is concerning, <90% is critical

Respond in JSON format with this structure:
{{
    "conditions": ["condition1", "condition2", "condition3"],
    "urgency": "urgency level with specific timeframe",
    "regionAnalysis": {{"region_name": "analysis with possible causes"}},
    "symptomExplanations": ["symptom 1: what it indicates", "symptom 2: what it indicates"],
    "possibleSolutions": ["self-care recommendation 1", "treatment option 2", "lifestyle modification 3"],
    "relatedSymptoms": ["additional symptom to watch for 1", "potential complication symptom 2"],
    "doctorRecommendation": {{
        "shouldSeeDoctorFor": ["reason 1", "reason 2"],
        "urgencyReason": "explanation based on vital signs and symptoms",
        "redFlags": ["warning sign 1", "warning sign 2"]
    }},
    "summary": "comprehensive summary text explaining the condition and next steps"
}}"""

    response = None
    try:
        client = get_gemini_client()
        system_instruction = "You are a knowledgeable medical AI assistant. Provide accurate, helpful preliminary health assessments while always emphasizing the importance of consulting healthcare professionals. Respond ONLY with valid JSON, no markdown formatting or code blocks."
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Content(role="user", parts=[types.Part(text=prompt)])
            ],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json"
            )
        )
        
        if not response.text:
            raise ValueError("Empty response from Gemini")
        
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        response_text = response_text.strip()
        
        result = json.loads(response_text)
        
        return {
            "conditions": result.get("conditions", ["General health assessment needed"]),
            "urgency": result.get("urgency", "Consult a healthcare professional"),
            "regionAnalysis": result.get("regionAnalysis", {}),
            "symptomExplanations": result.get("symptomExplanations", []),
            "possibleSolutions": result.get("possibleSolutions", []),
            "relatedSymptoms": result.get("relatedSymptoms", []),
            "doctorRecommendation": result.get("doctorRecommendation", {
                "shouldSeeDoctorFor": ["General health assessment"],
                "urgencyReason": "Professional medical evaluation recommended",
                "redFlags": []
            }),
            "summary": result.get("summary", "Please consult a healthcare professional for proper evaluation.")
        }
        
    except json.JSONDecodeError as e:
        print(f"AI Analysis JSON Error: {str(e)}")
        try:
            response_text_for_log = response.text if hasattr(response, 'text') else 'No response'
            print(f"Response was: {response_text_for_log}")
        except:
            print("Response was: Unable to retrieve response text")
        return {
            "conditions": ["AI analysis unavailable - please consult a doctor"],
            "urgency": "Consult a healthcare professional",
            "regionAnalysis": {},
            "symptomExplanations": [],
            "possibleSolutions": [],
            "relatedSymptoms": [],
            "doctorRecommendation": {
                "shouldSeeDoctorFor": ["Unable to perform analysis"],
                "urgencyReason": "Please consult a healthcare professional for proper evaluation",
                "redFlags": []
            },
            "summary": "Unable to parse AI analysis. Please consult a healthcare professional for evaluation."
        }
    except Exception as e:
        print(f"AI Analysis Error: {str(e)}")
        return {
            "conditions": ["AI analysis unavailable - please consult a doctor"],
            "urgency": "Consult a healthcare professional",
            "regionAnalysis": {},
            "symptomExplanations": [],
            "possibleSolutions": [],
            "relatedSymptoms": [],
            "doctorRecommendation": {
                "shouldSeeDoctorFor": ["System error - manual assessment needed"],
                "urgencyReason": "Please consult a healthcare professional for proper evaluation",
                "redFlags": []
            },
            "summary": f"Unable to perform AI analysis. Please consult a healthcare professional for evaluation."
        }


def chatbot_response(user_message, affected_regions=None, conversation_history=None):
    """
    Generate chatbot response for health-related questions.
    
    Args:
        user_message: User's question or message
        affected_regions: List of body regions marked as painful/affected (optional)
        conversation_history: Previous messages in the conversation (optional)
    
    Returns:
        String containing the AI chatbot response
    """
    
    affected_regions_text = ""
    if affected_regions and len(affected_regions) > 0:
        affected_regions_text = f"\n\nContext: The user has marked the following body areas: {', '.join(affected_regions)}"
    
    conversation_context = ""
    if conversation_history and len(conversation_history) > 0:
        recent_history = conversation_history[-6:]
        conversation_context = "\n\nPrevious conversation:\n"
        for msg in recent_history:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            conversation_context += f"{role.capitalize()}: {content}\n"
    
    prompt = f"""You are a helpful medical AI assistant chatbot for DigitalVaidya, an AI symptom analysis tool.

User's message: {user_message}{affected_regions_text}{conversation_context}

Important guidelines:
- Keep responses VERY SHORT and concise (1-3 bullet points maximum)
- Use bullet points (• symbol) for clarity
- Each point should be 1-2 short sentences max
- Focus on the most important information only
- If serious, recommend seeing a doctor as one of the points
- Use simple, easy-to-understand language
- Be warm and empathetic but brief

Provide a helpful response in bullet point format."""

    try:
        client = get_gemini_client()
        system_instruction = """You are a compassionate medical AI chatbot. Give VERY SHORT responses using 1-3 bullet points (• symbol). Each bullet should be 1-2 sentences max. Be helpful but concise. Always recommend consulting healthcare professionals for serious concerns."""
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Content(role="user", parts=[types.Part(text=prompt)])
            ],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7
            )
        )
        
        if not response.text:
            raise ValueError("Empty response from Gemini")
        
        return response.text.strip()
        
    except Exception as e:
        print(f"Chatbot Error: {str(e)}")
        return "I'm having trouble processing your request right now. Please try again or consult with a healthcare professional for medical advice."


def generate_health_summary(description, affected_regions, health_params):
    """
    Generate a comprehensive health summary report based on symptoms, affected body regions, and health parameters.
    
    Args:
        description: User's symptom description (from text or audio-to-text)
        affected_regions: List of detected body regions from the 3D model
        health_params: Dictionary containing vital signs (temperature, BP, heart rate, oxygen level)
    
    Returns:
        String containing a comprehensive formatted health summary report
    """
    
    affected_regions_text = ""
    if affected_regions and len(affected_regions) > 0:
        affected_regions_text = f"\n\nAffected Body Regions: {', '.join(affected_regions)}"
    
    vital_signs_text = []
    if health_params.get("temperature"):
        vital_signs_text.append(f"Temperature: {health_params['temperature']}°C")
    if health_params.get("systolicBP") and health_params.get("diastolicBP"):
        vital_signs_text.append(f"Blood Pressure: {health_params['systolicBP']}/{health_params['diastolicBP']} mmHg")
    if health_params.get("heartRate"):
        vital_signs_text.append(f"Heart Rate: {health_params['heartRate']} bpm")
    if health_params.get("oxygenLevel"):
        vital_signs_text.append(f"Oxygen Saturation: {health_params['oxygenLevel']}%")
    
    vital_signs_str = ""
    if vital_signs_text:
        vital_signs_str = "\n\nVital Signs:\n" + "\n".join(f"- {sign}" for sign in vital_signs_text)
    
    prompt = f"""You are a medical AI assistant generating a comprehensive health summary report.

Patient Information:
- Symptom Description: {description if description else "Not provided"}
{affected_regions_text}{vital_signs_str}

Generate a detailed, professional health summary report that includes:

1. CHIEF COMPLAINTS: Summarize the main symptoms and affected areas
2. VITAL SIGNS ASSESSMENT: Evaluate the vital signs (if provided) and note any concerns
3. PRELIMINARY ASSESSMENT: Based on the symptoms and affected regions, provide possible conditions
4. RECOMMENDATIONS: Suggest immediate actions or when to seek medical care
5. IMPORTANT NOTE: Emphasize this is preliminary guidance and professional medical evaluation is necessary

Format the report in clear sections with bullet points for readability. Be professional, thorough, and empathetic."""

    try:
        client = get_gemini_client()
        system_instruction = """You are a medical AI assistant creating professional health summary reports. Generate comprehensive, well-structured reports with clear sections and bullet points. Be thorough yet concise. Always emphasize the importance of professional medical consultation."""
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Content(role="user", parts=[types.Part(text=prompt)])
            ],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.5
            )
        )
        
        if not response.text:
            raise ValueError("Empty response from Gemini")
        
        return response.text.strip()
        
    except Exception as e:
        print(f"Summary Generation Error: {str(e)}")
        return f"""HEALTH SUMMARY REPORT

CHIEF COMPLAINTS:
{description if description else 'No description provided'}

AFFECTED AREAS:
{', '.join(affected_regions) if affected_regions else 'None marked'}

VITAL SIGNS:
{chr(10).join(vital_signs_text) if vital_signs_text else 'Not provided'}

IMPORTANT NOTE:
This is a preliminary report. Please consult with a healthcare professional for proper medical evaluation and diagnosis.
"""

