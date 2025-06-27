# 🚀 Quick Start Guide - PPCU Testimonial System

## Overview
This system collects patient testimonials, offers video testimonials with automatic $50 gift card rewards, and provides an admin dashboard.

## Step-by-Step Setup

### 1️⃣ Get Your API Keys

#### Supabase (Database) - FREE
1. Sign up: https://supabase.com/
2. Create new project
3. Go to Settings → API
4. Copy: URL, anon key, service role key

#### Vocal Video (Video Testimonials) - PAID
1. Sign up: https://vocalvideo.com/
2. Create a collector/campaign
3. Get collector ID from dashboard
4. Set webhook to: `https://your-site.netlify.app/api/video-callback`

#### Giftogram (Gift Cards) - PAID
1. Sign up: https://www.giftogram.com/
2. Create business account
3. Get API key from Settings
4. Create $50 gift card campaign

#### Google Sheets (Backup Storage) - FREE
1. Go to: https://console.cloud.google.com/
2. Create project → Enable Sheets API
3. Create service account → Download JSON key
4. Create a Google Sheet → Share with service account email

#### Email Service - Choose One:
- **Gmail** (FREE for testing): Enable 2FA → Create app password
- **SendGrid** (FREE tier available): https://sendgrid.com/
- **Resend** (Developer-friendly): https://resend.com/

### 2️⃣ Local Development

1. Clone the repository
2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in your API keys in `.env.local`
4. Install and run:
   ```bash
   npm install
   npm run dev
   ```
5. Visit http://localhost:3000

### 3️⃣ Deploy to Netlify

1. Push to GitHub
2. Go to https://app.netlify.com/
3. Import from GitHub
4. Add environment variables
5. Deploy!

### 4️⃣ Post-Deployment

1. **Update Vocal Video webhook URL** to your Netlify URL
2. **Set up Supabase** using `/supabase/schema.sql`
3. **Configure monthly reports** using GitHub Actions
4. **Test everything** with a sample submission

## 📱 URLs After Deployment

- **Patient Form**: `https://your-site.netlify.app/`
- **Admin Dashboard**: `https://your-site.netlify.app/dashboard`
- **Video Webhook**: `https://your-site.netlify.app/api/video-callback`

## 🔧 Common Issues

### "Cannot connect to Supabase"
- Check API keys are correct
- Ensure project isn't paused (free tier)

### "Gift cards not sending"
- Verify Giftogram balance
- Check API key and campaign ID

### "Emails not working"
- For Gmail: Use app password, not regular password
- Check SMTP settings

## 📞 Need Help?

1. Check `/API_REQUIREMENTS.md` for detailed setup
2. Check `/DEPLOYMENT.md` for deployment guide
3. Check `/SUPABASE_SETUP.md` for database setup

## 🎯 Testing Checklist

- [ ] Submit test testimonial
- [ ] Check Supabase/Google Sheets for data
- [ ] Test video recording flow
- [ ] Verify gift card sends (check logs)
- [ ] Access dashboard
- [ ] Receive confirmation email