from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors
from io import BytesIO
from datetime import datetime


def generate_health_summary_pdf(report_data):
    """
    Generate a comprehensive health summary report in PDF format.
    
    Args:
        report_data: Dictionary containing report information including:
            - timestamp: Report generation timestamp
            - user: User information (email, uid)
            - symptoms: Symptom description
            - affectedRegions: List of affected body regions
            - healthParameters: Dictionary with vital signs
            - analysis: AI analysis results (conditions, urgency, summary, etc.)
    
    Returns:
        BytesIO object containing the PDF file
    """
    
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, topMargin=0.5*inch, bottomMargin=0.5*inch)
    
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#6366f1'),
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#4f46e5'),
        spaceBefore=15,
        spaceAfter=10,
        fontName='Helvetica-Bold'
    )
    
    subheading_style = ParagraphStyle(
        'CustomSubHeading',
        parent=styles['Heading3'],
        fontSize=12,
        textColor=colors.HexColor('#6366f1'),
        spaceBefore=10,
        spaceAfter=8,
        fontName='Helvetica-Bold'
    )
    
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=10,
        alignment=TA_JUSTIFY,
        spaceAfter=8
    )
    
    bullet_style = ParagraphStyle(
        'CustomBullet',
        parent=styles['Normal'],
        fontSize=10,
        leftIndent=20,
        spaceAfter=5
    )
    
    story = []
    
    story.append(Paragraph("DIGITALVAIDYA", title_style))
    story.append(Paragraph("AI-Powered Health Summary Report", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("Report Information", heading_style))
    story.append(Paragraph(f"<b>Generated:</b> {datetime.fromisoformat(report_data['timestamp'].replace('Z', '+00:00')).strftime('%B %d, %Y at %I:%M %p')}", normal_style))
    if report_data.get('user'):
        story.append(Paragraph(f"<b>Patient:</b> {report_data['user'].get('email', 'Anonymous')}", normal_style))
    else:
        story.append(Paragraph("<b>Patient:</b> Anonymous", normal_style))
    
    story.append(Spacer(1, 0.2*inch))
    
    analysis = report_data.get('analysis', {})
    
    story.append(Paragraph("Affected Body Regions", heading_style))
    affected_regions = report_data.get('affectedRegions', [])
    if affected_regions:
        for region in affected_regions:
            story.append(Paragraph(f"• {region}", bullet_style))
    else:
        story.append(Paragraph("No specific regions marked", normal_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Chief Complaints", heading_style))
    symptoms = report_data.get('symptoms', '')
    if symptoms:
        story.append(Paragraph(symptoms, normal_style))
    else:
        story.append(Paragraph("No symptoms described", normal_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Vital Signs", heading_style))
    health_params = report_data.get('healthParameters', {})
    vital_signs_data = [
        ['Parameter', 'Value', 'Status'],
        ['Temperature', f"{health_params.get('temperature', 'N/A')}°C" if health_params.get('temperature') else 'Not provided', get_temp_status(health_params.get('temperature'))],
        ['Blood Pressure', f"{health_params.get('systolicBP', '-')}/{health_params.get('diastolicBP', '-')} mmHg" if health_params.get('systolicBP') else 'Not provided', get_bp_status(health_params.get('systolicBP'), health_params.get('diastolicBP'))],
        ['Heart Rate', f"{health_params.get('heartRate', 'N/A')} bpm" if health_params.get('heartRate') else 'Not provided', get_hr_status(health_params.get('heartRate'))],
        ['Oxygen Saturation', f"{health_params.get('oxygenLevel', 'N/A')}%" if health_params.get('oxygenLevel') else 'Not provided', get_o2_status(health_params.get('oxygenLevel'))]
    ]
    
    vital_signs_table = Table(vital_signs_data, colWidths=[2.2*inch, 2*inch, 2*inch])
    vital_signs_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#6366f1')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f3f4f6')),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#d1d5db'))
    ]))
    story.append(vital_signs_table)
    story.append(Spacer(1, 0.2*inch))
    
    conditions = analysis.get('conditions', [])
    if conditions:
        story.append(Paragraph("Possible Conditions", heading_style))
        for i, condition in enumerate(conditions, 1):
            story.append(Paragraph(f"{i}. {condition}", bullet_style))
        story.append(Spacer(1, 0.1*inch))
    
    urgency = analysis.get('urgency', '')
    if urgency:
        story.append(Paragraph("Urgency Level", heading_style))
        story.append(Paragraph(urgency, normal_style))
        story.append(Spacer(1, 0.1*inch))
    
    symptom_explanations = analysis.get('symptomExplanations', [])
    if symptom_explanations:
        story.append(Paragraph("What Your Symptoms May Indicate", heading_style))
        for explanation in symptom_explanations:
            story.append(Paragraph(f"• {explanation}", bullet_style))
        story.append(Spacer(1, 0.1*inch))
    
    possible_solutions = analysis.get('possibleSolutions', [])
    if possible_solutions:
        story.append(Paragraph("Possible Solutions & Recommendations", heading_style))
        for solution in possible_solutions:
            story.append(Paragraph(f"• {solution}", bullet_style))
        story.append(Spacer(1, 0.1*inch))
    
    related_symptoms = analysis.get('relatedSymptoms', [])
    if related_symptoms:
        story.append(Paragraph("Related Symptoms to Watch For", heading_style))
        for symptom in related_symptoms:
            story.append(Paragraph(f"• {symptom}", bullet_style))
        story.append(Spacer(1, 0.1*inch))
    
    doctor_rec = analysis.get('doctorRecommendation', {})
    if doctor_rec:
        story.append(Paragraph("When to See a Doctor", heading_style))
        
        urgency_reason = doctor_rec.get('urgencyReason', '')
        if urgency_reason:
            story.append(Paragraph(f"<b>Why:</b> {urgency_reason}", normal_style))
        
        should_see_doctor = doctor_rec.get('shouldSeeDoctorFor', [])
        if should_see_doctor:
            story.append(Paragraph("<b>You should consult a doctor for:</b>", subheading_style))
            for reason in should_see_doctor:
                story.append(Paragraph(f"• {reason}", bullet_style))
        
        red_flags = doctor_rec.get('redFlags', [])
        if red_flags:
            story.append(Paragraph("<b>⚠️ Warning Signs (Seek Immediate Care):</b>", subheading_style))
            for flag in red_flags:
                story.append(Paragraph(f"<font color='red'>⚠</font> {flag}", bullet_style))
        
        story.append(Spacer(1, 0.1*inch))
    
    summary = analysis.get('summary', '')
    if summary:
        story.append(Paragraph("AI Analysis Summary", heading_style))
        story.append(Paragraph(summary, normal_style))
        story.append(Spacer(1, 0.2*inch))
    
    story.append(PageBreak())
    
    story.append(Paragraph("IMPORTANT DISCLAIMER", heading_style))
    disclaimer_text = """This is an AI-generated preliminary health assessment and should NOT be considered 
    a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified 
    healthcare professional for proper medical evaluation, diagnosis, and treatment. If you are experiencing 
    a medical emergency, call your local emergency services immediately."""
    story.append(Paragraph(disclaimer_text, normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    footer_text = "Generated by DigitalVaidya - AI-Powered Symptom Analysis"
    story.append(Paragraph(footer_text, ParagraphStyle('Footer', parent=styles['Normal'], fontSize=8, textColor=colors.grey, alignment=TA_CENTER)))
    
    doc.build(story)
    buffer.seek(0)
    return buffer


def get_temp_status(temp):
    """Get temperature status based on value"""
    if not temp:
        return 'N/A'
    temp = float(temp)
    if temp > 38:
        return 'High (Fever)'
    elif temp < 36:
        return 'Low'
    else:
        return 'Normal'


def get_bp_status(systolic, diastolic):
    """Get blood pressure status based on values"""
    if not systolic or not diastolic:
        return 'N/A'
    systolic = float(systolic)
    diastolic = float(diastolic)
    if systolic > 140 or diastolic > 90:
        return 'High'
    elif systolic < 90 or diastolic < 60:
        return 'Low'
    else:
        return 'Normal'


def get_hr_status(heart_rate):
    """Get heart rate status based on value"""
    if not heart_rate:
        return 'N/A'
    hr = float(heart_rate)
    if hr > 100:
        return 'High'
    elif hr < 60:
        return 'Low'
    else:
        return 'Normal'


def get_o2_status(oxygen_level):
    """Get oxygen saturation status based on value"""
    if not oxygen_level:
        return 'N/A'
    o2 = float(oxygen_level)
    if o2 < 90:
        return 'Critical'
    elif o2 < 95:
        return 'Concerning'
    else:
        return 'Normal'
