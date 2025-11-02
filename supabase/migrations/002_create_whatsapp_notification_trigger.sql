-- Migration: Create database trigger to send WhatsApp notification on new appointment
-- This trigger automatically calls the Edge Function when a new appointment is inserted

-- Create a function that will call the Edge Function
CREATE OR REPLACE FUNCTION notify_whatsapp_on_appointment()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'https://gzdnefbqxmgjdoztozov.supabase.co/functions/v1/send-whatsapp-notification';
  payload JSONB;
  response http_response;
BEGIN
  -- Build the payload with the new appointment record
  payload := jsonb_build_object(
    'record', row_to_json(NEW)
  );

  -- Call the Edge Function
  SELECT * INTO response FROM http_post(
    webhook_url,
    payload::text,
    'application/json'::text,
    ARRAY[
      http_header(
        'Authorization',
        'Bearer ' || current_setting('app.settings.service_role_key', true)
      )
    ]
  );

  -- Log the response (optional - for debugging)
  -- You can check Supabase logs to see if notifications are being sent

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the insert
    RAISE WARNING 'Failed to send WhatsApp notification: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_notify_whatsapp_on_appointment ON appointments;
CREATE TRIGGER trigger_notify_whatsapp_on_appointment
  AFTER INSERT ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION notify_whatsapp_on_appointment();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA http TO postgres;

-- Note: The http extension might need to be enabled
-- Run this if http extension is not available:
-- CREATE EXTENSION IF NOT EXISTS http;

