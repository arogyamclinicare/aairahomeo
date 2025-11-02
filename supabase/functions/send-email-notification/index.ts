// Supabase Edge Function: Send Email Notification
// FREE: Uses Resend (3000 emails/month free) or Gmail (completely free)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const EMAIL_SERVICE = Deno.env.get('EMAIL_SERVICE') || 'resend'; // 'resend', 'gmail', or 'sendgrid'
    const DOCTOR_EMAIL = Deno.env.get('DOCTOR_EMAIL') || 'aairahomeobihar@gmail.com';
    
    const { record } = await req.json();

    if (!record) {
      return new Response(
        JSON.stringify({ error: 'No appointment data provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format email content
    const { subject, html, text } = formatEmailContent(record);

    let result;

    switch (EMAIL_SERVICE.toLowerCase()) {
      case 'resend':
        result = await sendViaResend(DOCTOR_EMAIL, subject, html, text);
        break;
      case 'gmail':
        result = await sendViaGmail(DOCTOR_EMAIL, subject, html, text);
        break;
      case 'sendgrid':
        result = await sendViaSendGrid(DOCTOR_EMAIL, subject, html, text);
        break;
      default:
        throw new Error(`Unknown email service: ${EMAIL_SERVICE}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email notification sent successfully', result }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error sending email notification:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Failed to send email notification' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function formatEmailContent(appointment: any) {
  const name = appointment.name || 'N/A';
  const phone = appointment.phone || 'N/A';
  const age = appointment.age || 'N/A';
  const email = appointment.email || 'Not provided';
  const problem = appointment.problem || 'Not specified';
  const preferredDate = appointment.preferred_date || 'Not specified';
  const preferredTime = appointment.preferred_time || 'Not specified';
  const status = appointment.status || 'pending';
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const subject = `🩺 New Appointment Booking - ${name}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .info-row { padding: 15px; background: white; margin: 10px 0; border-radius: 8px; border-left: 4px solid #10b981; }
    .label { font-weight: bold; color: #059669; display: inline-block; min-width: 150px; }
    .value { color: #1f2937; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
    .button { display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🩺 New Appointment Booking</h1>
      <p>A new patient has requested an appointment</p>
    </div>
    
    <div class="content">
      <div class="info-row">
        <span class="label">Patient Name:</span>
        <span class="value">${name}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Phone Number:</span>
        <span class="value"><a href="tel:${phone}">${phone}</a> | <a href="https://wa.me/${phone.replace(/\D/g, '')}">WhatsApp</a></span>
      </div>
      
      <div class="info-row">
        <span class="label">Email:</span>
        <span class="value">${email}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Age:</span>
        <span class="value">${age} years</span>
      </div>
      
      <div class="info-row">
        <span class="label">Problem/Concern:</span>
        <span class="value">${problem}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Preferred Date:</span>
        <span class="value">${preferredDate}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Preferred Time:</span>
        <span class="value">${preferredTime}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Status:</span>
        <span class="value"><strong>${status.toUpperCase()}</strong></span>
      </div>
      
      <div class="info-row">
        <span class="label">Submitted At:</span>
        <span class="value">${submittedAt}</span>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://wa.me/${phone.replace(/\D/g, '')}" class="button">Contact via WhatsApp</a>
      </div>
    </div>
    
    <div class="footer">
      <p>This is an automated notification from Aaira Homeo Clinic</p>
      <p>Please review and confirm the appointment at your earliest convenience.</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
🩺 NEW APPOINTMENT BOOKING

Patient Name: ${name}
Phone: ${phone}
Email: ${email}
Age: ${age} years
Problem: ${problem}
Preferred Date: ${preferredDate}
Preferred Time: ${preferredTime}
Status: ${status}

Submitted: ${submittedAt}

Please contact the patient to confirm the appointment.
WhatsApp: https://wa.me/${phone.replace(/\D/g, '')}
  `;

  return { subject, html, text };
}

// Option 1: Resend (FREE - 3000 emails/month) ⭐ RECOMMENDED
async function sendViaResend(to: string, subject: string, html: string, text: string) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }

  const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'notifications@resend.dev'; // Must be verified domain or use resend.dev

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Aaira Homeo Clinic <${FROM_EMAIL}>`,
      to: [to],
      subject: subject,
      html: html,
      text: text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

// Option 2: Gmail SMTP (COMPLETELY FREE - Unlimited) ⭐ FREE FOREVER
async function sendViaGmail(to: string, subject: string, html: string, text: string) {
  // Note: Gmail SMTP requires app password (not regular password)
  // Setup: Google Account → Security → 2-Step Verification → App Passwords
  
  const GMAIL_USER = Deno.env.get('GMAIL_USER');
  const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD');
  
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error('Gmail credentials not configured');
  }

  // Using Deno's built-in SMTP (or use external service)
  // For Edge Functions, better to use Resend or SendGrid
  // Gmail SMTP is better for traditional server setup
  
  throw new Error('Gmail SMTP not directly supported in Edge Functions. Use Resend or configure SendGrid instead.');
}

// Option 3: SendGrid (FREE - 100 emails/day)
async function sendViaSendGrid(to: string, subject: string, html: string, text: string) {
  const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
  
  if (!SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY not configured');
  }

  const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@aairahomeo.com';

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: to }],
      }],
      from: { email: FROM_EMAIL, name: 'Aaira Homeo Clinic' },
      subject: subject,
      content: [
        { type: 'text/plain', value: text },
        { type: 'text/html', value: html },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid API error: ${response.status} - ${errorText}`);
  }

  return { success: true, message: 'Email sent via SendGrid' };
}

