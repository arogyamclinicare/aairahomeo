// Web3Forms API endpoint
const WEB3FORMS_API_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'aairahomeobihar@gmail.com';

// Appointment data type
interface AppointmentData {
  name: string;
  phone: string;
  email?: string;
  age: number;
  problem?: string;
  preferred_date?: string;
  preferred_time?: string;
}

/**
 * Service for handling appointment submissions
 * Uses Web3Forms for email notifications (free, no backend needed)
 */
export class AppointmentService {
  /**
   * Submit appointment request via Web3Forms
   * Web3Forms will send email notification automatically
   * @param appointment - Appointment data
   * @returns Promise with success status and message
   */
  static async submitAppointment(appointment: AppointmentData): Promise<{ success: boolean; message: string }> {
    try {
      // Validate required fields
      if (!appointment.name || !appointment.phone || !appointment.age) {
        return {
          success: false,
          message: 'Please fill in all required fields'
        };
      }

      // Check if Web3Forms access key is configured
      if (!WEB3FORMS_ACCESS_KEY) {
        console.error('Web3Forms access key is missing. Please set VITE_WEB3FORMS_ACCESS_KEY in your .env file.');
        return {
          success: false,
          message: 'Email service is not configured. Please contact the administrator.'
        };
      }

      // Format email message with all appointment details
      const emailMessage = this.formatAppointmentEmail(appointment);

      // Submit to Web3Forms
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', 'New Appointment Request - Aaira Homeo Clinic');
      formData.append('from_name', 'Aaira Homeo Clinic Website');
      formData.append('email', ADMIN_EMAIL); // Recipient email
      formData.append('message', emailMessage);
      formData.append('redirect', 'false'); // Don't redirect, we'll handle response

      // Add form fields for better email formatting
      formData.append('name', appointment.name);
      formData.append('phone', appointment.phone);
      formData.append('age', appointment.age.toString());
      if (appointment.email) {
        formData.append('email_contact', appointment.email);
      }
      if (appointment.problem) {
        formData.append('problem', appointment.problem);
      }
      if (appointment.preferred_date) {
        formData.append('preferred_date', appointment.preferred_date);
      }
      if (appointment.preferred_time) {
        formData.append('preferred_time', appointment.preferred_time);
      }

      const response = await fetch(WEB3FORMS_API_URL, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error('Web3Forms error:', result);
        return {
          success: false,
          message: result.message || 'Failed to submit appointment. Please try again.'
        };
      }

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

  /**
   * Format appointment data into a readable email message
   */
  private static formatAppointmentEmail(appointment: AppointmentData): string {
    let message = '🎯 New Appointment Request\n\n';
    message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    message += `👤 Name: ${appointment.name}\n`;
    message += `📞 Phone: ${appointment.phone}\n`;
    message += `🎂 Age: ${appointment.age}\n`;
    
    if (appointment.email) {
      message += `📧 Email: ${appointment.email}\n`;
    }
    
    if (appointment.preferred_date) {
      message += `📅 Preferred Date: ${appointment.preferred_date}\n`;
    }
    
    if (appointment.preferred_time) {
      message += `⏰ Preferred Time: ${appointment.preferred_time}\n`;
    }
    
    if (appointment.problem) {
      message += `\n📋 Problem/Message:\n${appointment.problem}\n`;
    }
    
    message += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    message += `⏰ Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n`;
    
    return message;
  }
}

