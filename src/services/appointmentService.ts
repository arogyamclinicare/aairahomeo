import { supabase, Appointment, isSupabaseConfigured } from '../lib/supabase';

/**
 * Service for handling appointment submissions
 * All data is validated and sanitized before submission
 */
export class AppointmentService {
  /**
   * Submit appointment request to Supabase
   * @param appointment - Appointment data
   * @returns Promise with success status and message
   */
  static async submitAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; message: string }> {
    try {
      // Check if Supabase is configured
      
      if (!isSupabaseConfigured) {
        // In development without Supabase, just log to console
        // eslint-disable-next-line no-console
        console.log('📝 Appointment Request (Supabase not configured):', appointment);
        return {
          success: true,
          message: 'Appointment logged successfully! For database storage, please configure Supabase. See SUPABASE_SETUP.md'
        };
      }

      // Validate required fields
      if (!appointment.name || !appointment.phone || !appointment.age) {
        return {
          success: false,
          message: 'Please fill in all required fields'
        };
      }

      // Validate phone number format (basic validation)
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(appointment.phone.replace(/\s/g, ''))) {
        return {
          success: false,
          message: 'Please enter a valid phone number'
        };
      }

      // Validate email if provided
      if (appointment.email && !this.isValidEmail(appointment.email)) {
        return {
          success: false,
          message: 'Please enter a valid email address'
        };
      }

      // Validate age
      const age = parseInt(appointment.age);
      if (isNaN(age) || age < 1 || age > 120) {
        return {
          success: false,
          message: 'Please enter a valid age'
        };
      }

      // Sanitize input data
      const sanitizedAppointment: Omit<Appointment, 'id' | 'created_at'> = {
        name: this.sanitizeString(appointment.name),
        phone: appointment.phone.replace(/\D/g, ''), // Keep only digits
        email: appointment.email ? this.sanitizeString(appointment.email) : null,
        age: appointment.age,
        problem: appointment.problem ? this.sanitizeString(appointment.problem) : null,
        preferred_date: appointment.preferred_date || null,
        preferred_time: appointment.preferred_time || null,
        status: 'pending'
      };

      // Insert into Supabase
      // Note: Using select() requires SELECT policy for anon role
      const { data, error } = await supabase
        .from('appointments')
        .insert([sanitizedAppointment])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        
        // Handle specific errors
        if (error.code === '23505') { // Unique constraint violation
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

      if (data) {
        return {
          success: true,
          message: 'Appointment request submitted successfully! We will contact you within 24 hours.'
        };
      }

      return {
        success: false,
        message: 'Unknown error occurred. Please try again.'
      };
    } catch (error) {
      console.error('Appointment submission error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      };
    }
  }

  /**
   * Validate email format
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Sanitize string input to prevent XSS
   */
  private static sanitizeString(str: string): string {
    return str
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .substring(0, 500); // Limit length
  }
}

