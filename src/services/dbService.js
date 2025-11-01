import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const dbService = {
  saveAnalysis: async (userId, userEmail, description, healthParams, result, spots = []) => {
    try {
      const docRef = await addDoc(collection(db, 'analyses'), {
        userId,
        userEmail,
        description,
        healthParams: {
          temperature: healthParams.temperature || null,
          systolicBP: healthParams.systolicBP || null,
          diastolicBP: healthParams.diastolicBP || null,
          heartRate: healthParams.heartRate || null,
          oxygenLevel: healthParams.oxygenLevel || null
        },
        markedSpots: spots.map(spot => ({
          bodyRegion: spot.bodyRegion,
          timestamp: spot.timestamp
        })),
        result: {
          condition: result.condition,
          urgency: result.urgency,
          affectedRegions: result.affectedRegions || [],
          regionAnalysis: result.regionAnalysis || {},
          summary: result.summary || '',
          symptomExplanations: result.symptomExplanations || [],
          possibleSolutions: result.possibleSolutions || [],
          relatedSymptoms: result.relatedSymptoms || [],
          doctorRecommendation: result.doctorRecommendation || {
            urgencyReason: '',
            shouldSeeDoctorFor: [],
            redFlags: []
          }
        },
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error saving analysis:', error);
      return { success: false, error: error.message };
    }
  },

  saveContactForm: async (userId, userEmail, formData) => {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        userId: userId || null,
        userEmail: userEmail || null,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error saving contact form:', error);
      return { success: false, error: error.message };
    }
  },

  saveFeedback: async (userId, userEmail, feedbackData) => {
    try {
      const docRef = await addDoc(collection(db, 'feedback'), {
        userId: userId || null,
        userEmail: userEmail || null,
        rating: feedbackData.rating,
        message: feedbackData.message,
        category: feedbackData.category || 'general',
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error saving feedback:', error);
      return { success: false, error: error.message };
    }
  }
};
