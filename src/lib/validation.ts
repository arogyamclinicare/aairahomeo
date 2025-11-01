import { z } from 'zod';

/**
 * Appointment form validation schema using Zod
 */
export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  
  age: z
    .string()
    .refine((val) => {
      const age = Number.parseInt(val, 10);
      return !Number.isNaN(age) && age >= 1 && age <= 120;
    }, 'Please enter a valid age between 1 and 120'),
  
  problem: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
  
  date: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, 'Date must be today or in the future'),
  
  time: z
    .enum(['morning', 'evening', ''], {
      errorMap: () => ({ message: 'Please select a valid time slot' }),
    })
    .optional()
    .or(z.literal('')),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

/**
 * Format phone number for display
 */
export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters except +
  const phoneNumber = value.replace(/[^\d+]/g, '');
  
  // Format Indian phone numbers (10 digits)
  if (phoneNumber.length <= 10) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  
  // Format with country code
  if (phoneNumber.startsWith('91') && phoneNumber.length === 12) {
    const withoutCountry = phoneNumber.slice(2);
    return `+91 ${withoutCountry.slice(0, 5)} ${withoutCountry.slice(5)}`;
  }
  
  return phoneNumber;
}

/**
 * Remove formatting from phone number
 */
export function unformatPhoneNumber(value: string): string {
  return value.replace(/\D/g, '');
}

