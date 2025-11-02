// Appointment Controller - Handles form submissions and sends email

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Appointment submission endpoint
export const newAppointment = async (req, res) => {
  try {
    const { name, email, phone, message, age, problem, preferred_date, preferred_time } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({ 
        success: false,
        error: "Name and phone are required" 
      });
    }

    // Prepare data for Supabase
    const appointmentData = {
      name: name.trim(),
      phone: phone.replace(/\D/g, ''), // Keep only digits
      email: email ? email.trim() : null,
      age: age || null,
      problem: problem || message || null, // Support both 'problem' and 'message' fields
      preferred_date: preferred_date || null,
      preferred_time: preferred_time || null,
      status: 'pending'
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("appointments")
      .insert([appointmentData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ 
        success: false,
        error: error.message || "Failed to save appointment" 
      });
    }

    // Send email notification
    try {
      await resend.emails.send({
        from: "Aaira Homeo Clinic <onboarding@resend.dev>", // Resend default domain
        to: [process.env.ADMIN_EMAIL], // You receive email here
        subject: "🩺 New Appointment Enquiry",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">🩺 New Appointment Booking</h2>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> ${phone} | <a href="https://wa.me/${phone.replace(/\D/g, '')}">WhatsApp</a></p>
              ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
              ${age ? `<p><strong>Age:</strong> ${age} years</p>` : ''}
              ${problem || message ? `<p><strong>Problem/Message:</strong> ${problem || message}</p>` : ''}
              ${preferred_date ? `<p><strong>Preferred Date:</strong> ${preferred_date}</p>` : ''}
              ${preferred_time ? `<p><strong>Preferred Time:</strong> ${preferred_time}</p>` : ''}
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
              Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        `
      });
      console.log("✅ Email sent successfully");
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Don't fail the request if email fails
    }

    return res.json({ 
      success: true,
      status: "ok",
      message: "Appointment submitted successfully",
      data: {
        id: data?.id
      }
    });

  } catch (error) {
    console.error("Controller error:", error);
    return res.status(500).json({ 
      success: false,
      error: "An unexpected error occurred" 
    });
  }
};


