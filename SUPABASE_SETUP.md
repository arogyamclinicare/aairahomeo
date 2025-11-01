# Supabase Setup Guide

This guide will help you set up Supabase for the Aaira Homeo Clinic appointment form.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: aaira-homeo-clinic (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - Click "Create new project"

## Step 2: Get API Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys" > "anon public")

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Important**: Never commit `.env` file to git! It's already in `.gitignore`

## Step 4: Run Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase/migrations/001_create_appointments_table.sql`
4. Click "Run" or press `Ctrl/Cmd + Enter`
5. Verify the table was created by checking **Table Editor** > `appointments` table

## Step 5: Test the Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the website and click "Book Appointment"
3. Fill out the form and submit
4. Check Supabase dashboard **Table Editor** > `appointments` to see the new entry

## Security Features

✅ **Row Level Security (RLS)**: Enabled on appointments table
✅ **Input Validation**: All inputs are validated and sanitized
✅ **SQL Injection Protection**: Using Supabase client (parameterized queries)
✅ **XSS Protection**: Input sanitization in place
✅ **CSP Headers**: Content Security Policy configured

## Production Checklist

Before deploying to production:

- [ ] Verify environment variables are set in production environment (Vercel, Netlify, etc.)
- [ ] Test form submission works
- [ ] Verify RLS policies are active
- [ ] Set up email notifications (optional - can use Supabase Edge Functions)
- [ ] Monitor Supabase dashboard for any errors
- [ ] Review and adjust RLS policies as needed for your admin access

## Troubleshooting

### Error: "relation 'appointments' does not exist"
- Make sure you ran the SQL migration in Step 4

### Error: "new row violates row-level security policy"
- Check that RLS policies are correctly set up
- Verify the anon key is correct

### Error: "Invalid API key"
- Double-check your `.env` file has correct values
- Make sure there are no extra spaces or quotes

## Next Steps (Optional)

1. **Admin Dashboard**: Create a simple admin interface to view appointments
2. **Email Notifications**: Set up Supabase Edge Functions to send email on new appointments
3. **SMS Notifications**: Integrate Twilio for SMS notifications
4. **Calendar Integration**: Sync appointments with Google Calendar

For support, visit [Supabase Documentation](https://supabase.com/docs)



