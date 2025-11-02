// Supabase Edge Function: Send WhatsApp Notification
// This function sends a WhatsApp message when a new appointment is booked

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const WHATSAPP_API_KEY = Deno.env.get('WHATSAPP_API_KEY');
    const WHATSAPP_API_URL = Deno.env.get('WHATSAPP_API_URL') || 'https://api.twilio.com/2010-04-01/Accounts';
    const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
    const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
    const DOCTOR_PHONE = Deno.env.get('DOCTOR_PHONE') || '+917488467727'; // Your WhatsApp number
    const WHATSAPP_SERVICE = Deno.env.get('WHATSAPP_SERVICE') || 'twilio'; // twilio, messagebird, or whatsapp-api

    // Get the appointment data from the request
    const { record } = await req.json();

    if (!record) {
      return new Response(
        JSON.stringify({ error: 'No appointment data provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Format the appointment message
    const message = formatAppointmentMessage(record);

    let result;

    // Send WhatsApp message based on service
    switch (WHATSAPP_SERVICE.toLowerCase()) {
      case 'twilio':
        if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
          throw new Error('Twilio credentials not configured');
        }
        result = await sendViaTwilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, DOCTOR_PHONE, message);
        break;
      
      case 'messagebird':
        if (!WHATSAPP_API_KEY || !WHATSAPP_API_URL) {
          throw new Error('MessageBird credentials not configured');
        }
        result = await sendViaMessageBird(WHATSAPP_API_KEY, WHATSAPP_API_URL, DOCTOR_PHONE, message);
        break;
      
      case 'whatsapp-api':
        // For WhatsApp Business API (requires Meta Business verification)
        if (!WHATSAPP_API_KEY || !WHATSAPP_API_URL) {
          throw new Error('WhatsApp API credentials not configured');
        }
        result = await sendViaWhatsAppAPI(WHATSAPP_API_KEY, WHATSAPP_API_URL, DOCTOR_PHONE, message);
        break;
      
      default:
        throw new Error(`Unknown WhatsApp service: ${WHATSAPP_SERVICE}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'WhatsApp notification sent successfully',
        result 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send WhatsApp notification' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Format appointment message
function formatAppointmentMessage(appointment: any): string {
  const name = appointment.name || 'N/A';
  const phone = appointment.phone || 'N/A';
  const age = appointment.age || 'N/A';
  const email = appointment.email || 'Not provided';
  const problem = appointment.problem || 'Not specified';
  const preferredDate = appointment.preferred_date || 'Not specified';
  const preferredTime = appointment.preferred_time || 'Not specified';
  const status = appointment.status || 'pending';

  return `🩺 *New Appointment Booking*\n\n` +
    `*Patient Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Age:* ${age}\n` +
    `*Email:* ${email}\n` +
    `*Problem:* ${problem}\n` +
    `*Preferred Date:* ${preferredDate}\n` +
    `*Preferred Time:* ${preferredTime}\n` +
    `*Status:* ${status}\n\n` +
    `📅 *Submitted:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
    `Please review and confirm the appointment.`;
}

// Send via Twilio WhatsApp API
async function sendViaTwilio(accountSid: string, authToken: string, to: string, message: string) {
  const from = Deno.env.get('TWILIO_WHATSAPP_FROM') || 'whatsapp:+14155238886'; // Twilio Sandbox number
  
  // Format phone number (Twilio format)
  const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  
  const body = new URLSearchParams({
    From: from,
    To: formattedTo,
    Body: message,
  });

  const credentials = btoa(`${accountSid}:${authToken}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

// Send via MessageBird WhatsApp API
async function sendViaMessageBird(apiKey: string, apiUrl: string, to: string, message: string) {
  const from = Deno.env.get('MESSAGEBIRD_WHATSAPP_CHANNEL_ID') || '';
  
  const url = `${apiUrl}/messages`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `AccessKey ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: to,
      from: from,
      type: 'text',
      content: {
        text: message,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`MessageBird API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

// Send via WhatsApp Business API (Meta)
async function sendViaWhatsAppAPI(apiKey: string, apiUrl: string, to: string, message: string) {
  const phoneNumberId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID') || '';
  
  const url = `${apiUrl}/${phoneNumberId}/messages`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to.replace(/\D/g, ''), // Remove non-digits
      type: 'text',
      text: {
        body: message,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`WhatsApp API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

