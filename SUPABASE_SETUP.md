# Supabase Setup Guide for PPCU Testimonial System

## Quick Start

### 1. Create a Supabase Account
- Go to https://supabase.com/
- Click "Start your project"
- Sign up with GitHub or email

### 2. Create a New Project
- Click "New project" at https://app.supabase.com/
- Fill in:
  - **Project name**: `ppcu-testimonials`
  - **Database password**: (save this securely)
  - **Region**: Choose closest to your users
- Click "Create new project"

### 3. Set Up the Database

#### Option A: Using Supabase Dashboard (Recommended)
1. Go to **SQL Editor** in your project
2. Copy the entire contents of `/supabase/schema.sql`
3. Paste and click "Run"

#### Option B: Using Table Editor
1. Go to **Table Editor**
2. Click "Create a new table"
3. Name it `testimonials`
4. Add columns as defined in schema.sql

### 4. Get Your API Keys
1. Go to **Settings** → **API**
2. Copy these values to your `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### 5. Update Your .env.local
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 6. Enable Authentication (Optional)
For dashboard access control:
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Create a user for dashboard access

## Testing Your Setup

### 1. Test Database Connection
```bash
npm run dev
```
Visit http://localhost:3000 and submit a test testimonial.

### 2. Check Supabase Dashboard
1. Go to **Table Editor** → `testimonials`
2. You should see your test submission

### 3. Test Dashboard Access
Visit http://localhost:3000/dashboard

## Production Deployment

### 1. Enable Row Level Security (RLS)
- Already configured in schema.sql
- Ensures data security

### 2. Set up Realtime (Optional)
For live dashboard updates:
1. Go to **Database** → **Replication**
2. Enable replication for `testimonials` table

### 3. Configure Backup
1. Go to **Settings** → **Backups**
2. Supabase automatically backs up your data

## Migrating from Google Sheets

If you have existing data in Google Sheets:

### 1. Export from Google Sheets
- File → Download → CSV

### 2. Import to Supabase
1. Go to **Table Editor** → `testimonials`
2. Click "Import data from CSV"
3. Map columns appropriately

## Troubleshooting

### Connection Issues
- Verify API keys are correct
- Check if project is paused (free tier pauses after 1 week of inactivity)
- Ensure RLS policies allow your operations

### Data Not Showing
- Check browser console for errors
- Verify RLS policies in SQL Editor
- Test with service role key (bypasses RLS)

### Performance
- Add indexes for frequently queried columns (already in schema)
- Enable connection pooling for production

## Monitoring

### 1. Database Stats
- Go to **Reports** → **Database**
- Monitor query performance
- Track storage usage

### 2. API Usage
- Go to **Reports** → **API**
- Monitor request counts
- Check for rate limiting

## Support

- Supabase Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com/
- GitHub Discussions: https://github.com/supabase/supabase/discussions