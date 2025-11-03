import { Appointment } from '../lib/supabase';

// Backend API URL - points to Node.js server with Resend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Service for handling appointment submissions
 * Uses Node.js backend which saves to Supabase AND sends email via Resend
 */
export class AppointmentService {
  /**
   * Submit appointment request via Node.js backend
   * Backend will: 1) Save to Supabase, 2) Send email via Resend
   * @param appointment - Appointment data
   * @returns Promise with success status and message
   */
  static async submitAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; message: string }> {
    try {
      // Validate required fields
      if (!appointment.name || !appointment.phone || !appointment.age) {
        return {
          success: false,
          message: 'Please fill in all required fields'
        };
      }

      // Send to Node.js backend API
      const response = await fetch(`${API_BASE_URL}/newAppointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: appointment.name,
          phone: appointment.phone,
          email: appointment.email || null,
          age: appointment.age,
          problem: appointment.problem || null,
          message: appointment.problem || null, // Support 'message' field too
          preferred_date: appointment.preferred_date || null,
          preferred_time: appointment.preferred_time || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.error || result.message || 'Failed to submit appointment. Please try again.'
        };
      }

      return {
        success: result.success !== false,
        message: result.message || 'Appointment request submitted successfully! We will contact you within 24 hours.'
      };

    } catch (error) {
      console.error('Appointment submission error:', error);
      
      // Fallback: Check if backend is available
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          message: 'Unable to connect to server. Please check your internet connection and try again.'
        };
      }

      return {
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      };
    }
  }

}

