import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { AppointmentService } from '../services/appointmentService';
import { appointmentSchema, type AppointmentFormData, formatPhoneNumber, unformatPhoneNumber } from '../lib/validation';
import { rateLimiter, appointmentRateLimit } from '../lib/rateLimiter';
import { analytics } from '../lib/analytics';
import { errorTracking } from '../lib/errorTracking';

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
}

export function AppointmentDialog({ open, onOpenChange }: AppointmentDialogProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      age: '',
      problem: '',
      date: '',
      time: '',
    },
    mode: 'onBlur', // Validate on blur for better UX
  });

  const handleSubmit = async (data: AppointmentFormData) => {
    // Check rate limit
    const rateLimitCheck = rateLimiter.check(appointmentRateLimit);
    
    if (!rateLimitCheck.allowed) {
      const minutesLeft = Math.ceil((rateLimitCheck.resetTime - Date.now()) / 60000);
      toast.error(`Too many requests. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`);
      
      analytics.trackEvent('rate_limit_exceeded', {
        form: 'appointment',
        reset_time: rateLimitCheck.resetTime,
      });
      
      return;
    }

    setIsSubmitting(true);
    
    // Track form submission attempt
    analytics.trackEvent('appointment_form_submit_attempt', {
      has_email: !!data.email,
      has_problem: !!data.problem,
      has_date: !!data.date,
    });

    const loadingToast = toast.loading('Submitting your appointment request...');

    try {
      // Submit to Supabase
      const result = await AppointmentService.submitAppointment({
        name: data.name,
        phone: unformatPhoneNumber(data.phone),
        email: data.email || undefined,
        age: data.age,
        problem: data.problem || undefined,
        preferred_date: data.date || undefined,
        preferred_time: data.time || undefined,
      });

      toast.dismiss(loadingToast);

      if (result.success) {
        setIsSubmitted(true);
        toast.success(result.message);
        
        // Track successful submission
        analytics.trackAppointmentSubmit(true);
        errorTracking.addBreadcrumb('Appointment submitted successfully', 'form');
        
        // Reset form and close dialog after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          form.reset();
          onOpenChange(false);
          rateLimiter.reset(appointmentRateLimit.key);
        }, 3000);
      } else {
        toast.error(result.message);
        analytics.trackAppointmentSubmit(false, result.message);
        errorTracking.captureMessage(`Appointment submission failed: ${result.message}`, 'error', {
          form: 'appointment',
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      errorTracking.captureException(error instanceof Error ? error : new Error(errorMessage), {
        form: 'appointment',
        formData: { ...data, phone: '[REDACTED]' }, // Don't log full phone number
      });
      
      analytics.trackFormError('appointment', errorMessage);
      analytics.trackAppointmentSubmit(false, errorMessage);
      
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format phone number as user types
  const handlePhoneChange = (value: string, onChange: (value: string) => void) => {
    const unformatted = unformatPhoneNumber(value);
    // Limit to 15 digits
    if (unformatted.length <= 15) {
      const formatted = unformatted.length > 0 ? formatPhoneNumber(unformatted) : '';
      onChange(formatted);
    }
  };

  // Get remaining attempts for display
  const remainingAttempts = rateLimiter.getRemaining(
    appointmentRateLimit.key,
    appointmentRateLimit.maxAttempts,
    appointmentRateLimit.windowMs
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-gray-900">Book an Appointment</DialogTitle>
              <DialogDescription className="text-gray-600">
                Fill in your details and we&apos;ll contact you to confirm your appointment.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 mt-4">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="Enter your full name"
                            className="pl-10"
                            autoComplete="name"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone and Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Phone Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input
                              {...field}
                              type="tel"
                              placeholder="(123) 456-7890"
                              className="pl-10"
                              autoComplete="tel"
                              onChange={(e) => handlePhoneChange(e.target.value, field.onChange)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Age <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Your age"
                            autoComplete="bday-year"
                            min="1"
                            max="120"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Email <span className="text-gray-500 text-sm">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="your.email@example.com"
                            className="pl-10"
                            autoComplete="email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Preferred Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                            <Input
                              {...field}
                              type="date"
                              className="pl-10"
                              min={new Date().toISOString().split('T')[0]}
                              autoComplete="bday"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Preferred Time</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <SelectValue placeholder="Select time" />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9 AM - 1 PM)</SelectItem>
                              <SelectItem value="evening">Evening (5 PM - 8:30 PM)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Problem Description */}
                <FormField
                  control={form.control}
                  name="problem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Brief Description of Problem</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Textarea
                            {...field}
                            placeholder="Please describe your health concern..."
                            className="pl-10 min-h-[100px]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Info Note */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-sm text-emerald-800">
                    <strong>Note:</strong> This is an appointment request. Our staff will call you 
                    within 24 hours to confirm your appointment timing.
                  </p>
                  {remainingAttempts < appointmentRateLimit.maxAttempts && (
                    <p className="text-xs text-emerald-700 mt-2">
                      Remaining attempts: {remainingAttempts} of {appointmentRateLimit.maxAttempts}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Appointment Request'}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <h3 className="text-gray-900 mb-3">Thank You!</h3>
            <p className="text-gray-600 mb-2">
              Your appointment request has been received successfully.
            </p>
            <p className="text-gray-600">
              We&apos;ll contact you soon to confirm your appointment.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
