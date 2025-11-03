// Node.js Backend Server
// Handles appointment submissions and sends email notifications

// Load environment variables FIRST before importing anything
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { newAppointment } from './controller.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint - friendly API info page
app.get('/', (req, res) => {
  res.json({
    service: 'Aaira Homeo Clinic - Appointment API',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      submitAppointment: '/newAppointment (POST)'
    },
    timestamp: new Date().toISOString()
  });
});

// Appointment submission endpoint
app.post('/newAppointment', newAppointment);

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
  console.log(`📧 Email notifications: ${process.env.RESEND_API_KEY ? 'Configured (Resend)' : 'Not configured'}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/newAppointment`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
