import { supabase, Appointment, isSupabaseConfigured } from '../lib/supabase';

/**
 * Service for handling appointment submissions
 * SUBMITS DIRECTLY TO SUPABASE - No backend needed!
 * Email notifications handled by Make.com/Zapier webhook
 */
export class AppointmentService {
  /**
   * Submit appointment request directly to Supabase
   * Make.com/Zapier will automatically send email when new record is added
   * @param appointment - Appointment data
   * @returns Promise with success status and message
   */
  static async submitAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; message: string }> {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured) {
        return {
          success: false,
          message: 'Database not configured. Please contact support.'
        };
      }

      // Validate required fields
      if (!appointment.name || !appointment.phone || !appointment.age) {
        return {
          success: false,
          message: 'Please fill in all required fields'
        };
      }

      // Sanitize and prepare data
      const appointmentData: Omit<Appointment, 'id' | 'created_at'> = {
        name: appointment.name.trim().substring(0, 100),
        phone: appointment.phone.replace(/\D/g, ''), // Keep only digits
        email: appointment.email ? appointment.email.trim().substring(0, 100) : null,
        age: appointment.age,
        problem: appointment.problem ? appointment.problem.trim().substring(0, 500) : null,
        preferred_date: appointment.preferred_date || null,
        preferred_time: appointment.preferred_time || null,
        status: 'pending'
      };

      // Insert directly into Supabase
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        
        // Handle duplicate submission
        if (error.code === '23505') {
          return {
            success: false,
            message: 'An appointment with this phone number already exists. Please contact us directly.'
          };
        }

        return {
          success: false,
          message: 'Failed to submit appointment. Please try again or contact us directly.'
        };
      }

      // Success! Make.com/Zapier webhook will automatically send email
      return {
        success: true,
        message: 'Appointment request submitted successfully! We will contact you within 24 hours.'
      };

    } catch (error) {
      console.error('Appointment submission error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      };
    }
  }

}

