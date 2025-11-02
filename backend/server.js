// Node.js Backend Server
// Handles appointment submissions and sends email notifications

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for backend
);

// Initialize Nodemailer transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL, // Your Gmail address
    pass: process.env.ADMIN_APP_PASSWORD // Gmail App Password (not regular password!)
  }
});

// Test email connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service not configured properly:', error.message);
    console.log('⚠️  Emails will not be sent until Gmail credentials are configured.');
  } else {
    console.log('✅ Email service ready!');
  }
});

// Appointment submission endpoint
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, phone, email, age, problem, preferred_date, preferred_time } = req.body;

    // Validate required fields
    if (!name || !phone || !age) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, and age are required fields'
      });
    }

    // Validate phone number format
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format'
      });
    }

    // Validate age
    const ageNum = parseInt(age);
    if (isNaN(ageNum) {
      return res.status(400).json({
        success: false,
        message: 'Age must be a valid number'
      });
    }
    if (ageNum < 1 || ageNum > 120) {
      return res.status(400).json({
        success: false,
        message: 'Age must be between 1 and 120'
      });
    }

    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim().substring(0, 100).replace(/[<>]/g, ''),
      phone: phone.replace(/\D/g, ''), // Keep only digits
      email: email ? email.trim().substring(0, 100).replace(/[<>]/g, '') : null,
      age: ageNum.toString(),
      problem: problem ? problem.trim().substring(0, 500).replace(/[<>]/g, '') : null,
      preferred_date: preferred_date || null,
      preferred_time: preferred_time || null,
      status: 'pending'
    };

    // Insert into Supabase
    const { data: appointmentData, error: supabaseError } = await supabase
      .from('appointments')
      .insert([sanitizedData])
      .select()
      .single();

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      
      // Handle duplicate submission
      if (supabaseError.code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'An appointment with this phone number already exists. Please contact us directly.'
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Failed to save appointment. Please try again later.'
      });
    }

    // Send email notification (don't wait for it - fire and forget)
    sendEmailNotification(sanitizedData).catch(error => {
      console.error('Failed to send email notification:', error);
      // Don't fail the request if email fails
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Appointment request submitted successfully! We will contact you within 24 hours.',
      data: {
        id: appointmentData.id,
        name: appointmentData.name,
        status: appointmentData.status
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
});

// Send email notification
async function sendEmailNotification(appointment) {
  // Skip if email not configured
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_APP_PASSWORD) {
    console.log('⚠️  Email not configured - skipping notification');
    return;
  }

  const {
    name,
    phone,
    email,
    age,
    problem,
    preferred_date,
    preferred_time,
    status
  } = appointment;

  // Format WhatsApp link
  const whatsappNumber = phone.startsWith('+') ? phone : `+91${phone}`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;

  // Format email HTML
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border: 1px solid #e5e7eb;
    }
    .info-row {
      padding: 15px;
      background: white;
      margin: 10px 0;
      border-radius: 8px;
      border-left: 4px solid #10b981;
    }
    .label {
      font-weight: bold;
      color: #059669;
      display: inline-block;
      min-width: 150px;
    }
    .value {
      color: #1f2937;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: #10b981;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 14px;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
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
      <span class="value">
        <a href="tel:${phone}">${phone}</a> | 
        <a href="${whatsappLink}" target="_blank">WhatsApp</a>
      </span>
    </div>
    
    <div class="info-row">
      <span class="label">Email:</span>
      <span class="value">${email || 'Not provided'}</span>
    </div>
    
    <div class="info-row">
      <span class="label">Age:</span>
      <span class="value">${age} years</span>
    </div>
    
    <div class="info-row">
      <span class="label">Problem/Concern:</span>
      <span class="value">${problem || 'Not specified'}</span>
    </div>
    
    <div class="info-row">
      <span class="label">Preferred Date:</span>
      <span class="value">${preferred_date || 'Not specified'}</span>
    </div>
    
    <div class="info-row">
      <span class="label">Preferred Time:</span>
      <span class="value">${preferred_time || 'Not specified'}</span>
    </div>
    
    <div class="info-row">
      <span class="label">Status:</span>
      <span class="value"><strong>${status.toUpperCase()}</strong></span>
    </div>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="${whatsappLink}" class="button" target="_blank">Contact via WhatsApp</a>
    </div>
  </div>
  
  <div class="footer">
    <p>This is an automated notification from Aaira Homeo Clinic</p>
    <p>Please review and confirm the appointment at your earliest convenience.</p>
    <p><small>Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
  </div>
</body>
</html>
  `;

  // Plain text version
  const emailText = `
🩺 NEW APPOINTMENT BOOKING

Patient Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Age: ${age} years
Problem: ${problem || 'Not specified'}
Preferred Date: ${preferred_date || 'Not specified'}
Preferred Time: ${preferred_time || 'Not specified'}
Status: ${status}

Please contact the patient to confirm the appointment.
WhatsApp: ${whatsappLink}

Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
  `;

  // Send email
  const mailOptions = {
    from: `"Aaira Homeo Clinic" <${process.env.ADMIN_EMAIL}>`,
    to: process.env.ADMIN_EMAIL, // Send to yourself
    subject: `🩺 New Appointment Booking - ${name}`,
    text: emailText,
    html: emailHtml
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Email notification sent:', info.messageId);
  return info;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Appointment API is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Appointment API server running on port ${PORT}`);
  console.log(`📧 Email notifications: ${process.env.ADMIN_EMAIL ? 'Configured' : 'Not configured'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

