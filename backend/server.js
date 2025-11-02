// Node.js Backend Server
// Handles appointment submissions and sends email notifications

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { newAppointment } from './controller.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
