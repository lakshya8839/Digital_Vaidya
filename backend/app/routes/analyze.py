from flask import Blueprint, request, send_file
from ..firebase_auth import optional_auth
from ..ai_service import generate_health_summary, analyze_symptoms_with_ai
from ..pdf_service import generate_health_summary_pdf
from datetime import datetime

bp = Blueprint("analyze", __name__)


def simple_analyze(description, health_params, affected_regions):
    """Simple symptom analysis without AI"""
    
    conditions = []
    urgency = "Consult a healthcare professional"
    region_analysis = {}
    
    if affected_regions:
        for region in affected_regions:
            region_analysis[region] = f"Pain or discomfort reported in {region}"
        conditions.append(f"Discomfort in {len(affected_regions)} body region(s)")
    
    if description and len(description) > 10:
        conditions.append("Symptoms described")
    
    temp = health_params.get("temperature")
    if temp:
        try:
            temp_val = float(temp)
            if temp_val > 38.0:
                conditions.append("Elevated temperature")
                urgency = "Seek medical attention within 24 hours"
            elif temp_val < 36.0:
                conditions.append("Low temperature")
        except:
            pass
    
    if not conditions:
        conditions = ["General health assessment"]
    
    summary = f"You've reported symptoms including: {description[:100]}. " if description else ""
    summary += f"Please consult with a healthcare professional for proper medical evaluation and diagnosis."
    
    return {
        "conditions": conditions,
        "urgency": urgency,
        "regionAnalysis": region_analysis,
        "summary": summary
    }


@bp.post("/analyze")
@optional_auth
def analyze_symptoms():
    data = request.get_json(silent=True) or {}
    description = data.get("description", "")
    health_params = data.get("healthParams", {})
    spots = data.get("spots", [])
    
    affected_regions = spots if spots else []
    
    try:
        analysis = analyze_symptoms_with_ai(description, health_params, affected_regions)
    except Exception as e:
        print(f"AI analysis failed, falling back to simple analysis: {str(e)}")
        analysis = simple_analyze(description, health_params, affected_regions)
    
    conditions = analysis.get("conditions", ["General Checkup Recommended"])
    urgency_level = analysis.get("urgency", "Consult a healthcare professional")
    region_analysis = analysis.get("regionAnalysis", {})
    summary = analysis.get("summary", "Please consult a healthcare professional for proper evaluation.")
    symptom_explanations = analysis.get("symptomExplanations", [])
    possible_solutions = analysis.get("possibleSolutions", [])
    related_symptoms = analysis.get("relatedSymptoms", [])
    doctor_recommendation = analysis.get("doctorRecommendation", {})
    
    user_info = None
    if hasattr(request, 'user') and request.user:
        user_info = {
            "uid": request.user.get("uid"),
            "email": request.user.get("email")
        }
    
    result = {
        "condition": " & ".join(conditions) if conditions else "General Checkup Recommended",
        "urgency": urgency_level,
        "healthParams": health_params,
        "affectedRegions": affected_regions,
        "regionAnalysis": region_analysis,
        "summary": summary,
        "symptomExplanations": symptom_explanations,
        "possibleSolutions": possible_solutions,
        "relatedSymptoms": related_symptoms,
        "doctorRecommendation": doctor_recommendation,
        "user": user_info
    }
    
    return {"ok": True, "result": result}


@bp.post("/generate-summary")
@optional_auth
def generate_summary():
    """
    Generate a comprehensive health summary report in PDF format based on symptoms and affected regions.
    """
    data = request.get_json(silent=True) or {}
    description = data.get("description", "")
    affected_regions = data.get("affectedRegions", [])
    health_params = data.get("healthParams", {})
    
    if not description and not affected_regions:
        return {"ok": False, "error": "Please provide symptom description or mark affected areas"}, 400
    
    try:
        analysis = analyze_symptoms_with_ai(description, health_params, affected_regions)
    except Exception as e:
        print(f"AI analysis failed for PDF generation, falling back to simple analysis: {str(e)}")
        analysis = simple_analyze(description, health_params, affected_regions)
    
    user_info = None
    if hasattr(request, 'user') and request.user:
        user_info = {
            "uid": request.user.get("uid"),
            "email": request.user.get("email")
        }
    
    report_data = {
        "timestamp": datetime.utcnow().isoformat() + 'Z',
        "user": user_info,
        "affectedRegions": affected_regions,
        "symptoms": description,
        "healthParameters": health_params,
        "analysis": analysis
    }
    
    pdf_buffer = generate_health_summary_pdf(report_data)
    
    filename = f"DigitalVaidya-Health-Report-{datetime.utcnow().strftime('%Y-%m-%d')}.pdf"
    
    return send_file(
        pdf_buffer,
        mimetype='application/pdf',
        as_attachment=True,
        download_name=filename
    )


