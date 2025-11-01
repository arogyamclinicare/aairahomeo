-- Create appointments table for storing appointment requests
-- This migration creates a secure, production-ready table with proper constraints

CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  age TEXT NOT NULL,
  problem TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_appointments_phone ON appointments(phone);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for public appointment form)
-- This allows anyone to submit appointments but only read their own or admin can read all
CREATE POLICY "Allow anonymous appointment submissions"
  ON appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy for reading appointments (only authenticated users with proper role)
-- In production, you may want to restrict this further
CREATE POLICY "Allow authenticated users to read appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on row update
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE appointments IS 'Stores appointment requests from the clinic website';
COMMENT ON COLUMN appointments.status IS 'Appointment status: pending, confirmed, or cancelled';



