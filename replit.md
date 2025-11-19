# DigitalVaidya - AI Symptom Sketcher

## Overview
DigitalVaidya is an AI-powered web application for symptom analysis, featuring secure multi-modal authentication and an interactive 3D body model. The application leverages AI to provide detailed health summaries and real-time assistance, aiming to streamline initial health assessments.

## User Preferences
- Face detection setup should be optional for all users after login, not just new accounts
- Team members: Tanishka, Navita, Lakshaya, Bhavik, Angel (all 3rd Year)
- Team page layout: 3 members in first row, 2 members centered in second row
- Logo: Using custom DigitalVaidya logo throughout the application

## System Architecture

### Frontend (React + Vite)
The frontend is built with React and Vite, serving as the user interface for interaction. It runs on port 5000 and is responsible for:
- **Interactive 3D Body Model**: 
  - Integration with Clara.io embedded 3D model for enhanced visualization
  - **Dual Mode System**:
    - **Marking Mode**: Click on body parts to mark pain points with visible labels showing body region names
    - **Interaction Mode**: Fully functional zoom and rotate controls for detailed model exploration
  - Real-time visual feedback with animated markers and labels
  - Marked regions display with red pulsing indicators and body part name labels
- **Authentication UI**: Integrates Firebase Authentication for email/password and Google Sign-In. Includes UI for face capture and login via OpenCV.
- **Chatbot Interface**: A popup component for the AI Health Assistant, supporting voice and text input, and displaying conversation history.
- **Health Parameter Inputs**: Forms for entering vital signs such as temperature, blood pressure, heart rate, and oxygen saturation.
- **Enhanced Analysis Results Display**: 
  - Symptom explanations showing what each symptom may indicate
  - Possible solutions with practical self-care recommendations
  - Related symptoms to monitor for condition progression
  - Doctor visit recommendations with specific reasons and timeframes
  - Warning signs highlighting critical health indicators
  - Urgency levels based on vital signs and symptoms
- **PDF Report Generation**: Interface to trigger and download professionally formatted PDF health summary reports with comprehensive analysis.
- **Design**: Utilizes Tailwind CSS for responsive design and Framer Motion for smooth animations. Supports dark mode.

### Backend (Flask)
The Flask backend, running on port 8000, provides the core API services and integrations:
- **Enhanced AI Service**: Integrates Google Gemini 2.5 Flash for comprehensive health analysis:
  - **Symptom Analysis**: Processes symptom descriptions, vital signs (temperature, blood pressure, heart rate, oxygen saturation), and affected body regions
  - **Condition Assessment**: Identifies 2-4 potential diagnoses based on symptoms and health parameters
  - **Vital Signs Evaluation**: Analyzes health parameters against normal ranges (fever detection, blood pressure assessment, heart rate analysis, oxygen level monitoring)
  - **Symptom Explanations**: Provides detailed explanations of what each symptom may indicate
  - **Possible Solutions**: Recommends practical self-care measures and treatment approaches
  - **Related Symptoms**: Identifies additional symptoms to monitor that may indicate condition progression
  - **Doctor Visit Recommendations**: Generates specific guidance on when and why to seek medical attention, including:
    - Urgency timeframes (self-care, monitor, 24-48 hours, immediate)
    - Specific reasons for doctor consultation
    - Red flag warnings for critical conditions
  - **Professional PDF Report Generation**: Creates comprehensive health summary reports in PDF format using ReportLab with:
    - Structured sections for symptoms, vital signs, and analysis
    - Predicted conditions and urgency assessments
    - Symptom explanations and possible solutions
    - Related symptoms to watch for
    - Doctor visit recommendations with warning signs
    - Professional formatting with headers, footers, and proper spacing
- **Chatbot API**: Powers the AI Health Assistant using Gemini 2.5 Flash, providing conversational health guidance and maintaining context-aware responses.
- **Face Recognition API**: Uses OpenCV Haar Cascade for face detection and color histogram matching for face recognition, handling registration and login.
- **Firebase Authentication Integration**: Verifies Firebase ID tokens for protected routes and tracks authenticated users across API endpoints.
- **Database Service**: Manages interactions with Firebase Firestore for persistent data storage.
- **API Endpoints**:
    - `/api/health`: Public health check.
    - `/api/auth/login`, `/api/auth/signup`, `/api/auth/face-login`: Authentication endpoints.
    - `/api/forms/feedback`, `/api/forms/contact`: Form submission endpoints.
    - `/api/analyze`: Endpoint for AI-powered symptom and health parameter analysis.
    - `/api/chatbot`: Endpoint for the AI health assistant chatbot.
    - `/api/generate-summary`: Endpoint to generate and download health summary reports.

### Data Storage
- **Firebase Firestore**: Used for persistent storage of:
    - `analyses`: Complete symptom analysis records including:
      - User information and timestamps
      - Symptom descriptions and health parameters (temperature, BP, heart rate, oxygen levels)
      - Marked body regions with timestamps
      - AI analysis results (predicted conditions, urgency levels, summary)
      - **Symptom explanations** - detailed interpretations of symptoms
      - **Possible solutions** - practical self-care recommendations and treatment approaches
      - **Related symptoms** - additional symptoms to monitor for condition progression
      - **Doctor recommendations** - urgency reasons, when to see a doctor, and critical warning signs (red flags)
    - `contacts`: Contact form submissions.
    - `feedback`: User feedback with ratings and messages.
- **Local JSON Files**: Used for storing face data (histogram features) for the OpenCV face recognition system.

### Key Features
- **Firebase Authentication**: Supports Google Sign-In and Email/Password with backend token verification.
- **Advanced AI-Powered Health Analysis**: 
  - Multi-factor symptom analysis combining descriptions, vital signs, and affected body regions
  - Intelligent vital signs interpretation with threshold-based alerts
  - Symptom-to-disease correlation with detailed explanations
  - Personalized doctor visit recommendations with urgency classification
  - Red flag detection for critical health conditions
- **Interactive 3D Body Model with Dual Modes**: 
  - Clara.io embedded model with high-quality visualization
  - Marking Mode for clicking and labeling affected body regions
  - Interaction Mode with functional zoom and rotate controls
  - Real-time visual feedback with labeled markers
- **AI Health Assistant Chatbot**: Provides real-time, context-aware health guidance via a conversational interface.
- **Professional PDF Health Reports**: Generates comprehensive, downloadable PDF reports with:
  - Complete symptom and vital signs analysis
  - Predicted conditions with urgency assessments
  - Symptom explanations and possible solutions
  - Related symptoms to watch for
  - Doctor visit recommendations with red flags
  - Professional formatting suitable for sharing with healthcare providers
- **OpenCV Face Recognition**: Enables secure, password-less login and optional face registration.

## External Dependencies
- **Google Gemini 2.5 Flash**: AI model for symptom analysis, chatbot, and summary generation.
- **ReportLab**: Python library for professional PDF generation with formatted health reports.
- **Firebase**:
    - **Firebase Authentication**: For user authentication (email/password, Google Sign-In).
    - **Firebase Firestore**: For persistent data storage (analyses, contacts, feedback).
    - **Firebase Admin SDK**: For backend token verification and interaction with Firebase services.
- **OpenCV Python**: For real-time face detection and recognition.
- **Clara.io**: Embedded 3D human body model for interactive visualization.