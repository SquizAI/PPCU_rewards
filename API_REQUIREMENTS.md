# API Requirements for PPCU Testimonial System

## 1. Giftogram API
**What you need:**
- Sign up at: https://www.giftogram.com/
- Get API Key from your dashboard
- Create a campaign for $50 gift cards
- Documentation: https://api.giftogram.com/docs

**Required info:**
- API Key
- Campaign ID
- Organization ID

## 2. Google Sheets API
**What you need:**
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create a Service Account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Create new service account
   - Download JSON key file
5. Create a Google Sheet and share it with the service account email

**Required info:**
- Service Account Email (from JSON key)
- Private Key (from JSON key)
- Spreadsheet ID (from Google Sheets URL)

## 3. Vocal Video
**What you need:**
- Sign up at: https://vocalvideo.com/
- Create a video collector
- Set up webhook in collector settings

**Required info:**
- Collector ID (from your Vocal Video dashboard)
- Webhook Secret (for security)

## 4. Email Service (for monthly reports)
**Options:**
1. **SendGrid** (Recommended)
   - Sign up at: https://sendgrid.com/
   - Get API Key
   - Verify sender domain

2. **Resend**
   - Sign up at: https://resend.com/
   - Get API Key
   - Simple and developer-friendly

3. **SMTP (Gmail, etc.)**
   - Can use Gmail with app password
   - Less reliable for production

## 5. Hosting (Vercel - Recommended)
**What you need:**
- GitHub account
- Vercel account: https://vercel.com/
- Connect GitHub repo to Vercel
- Add environment variables in Vercel dashboard

## Quick Start Instructions

1. **For testing locally**, create a `.env.local` file:
```
VOCAL_VIDEO_COLLECTOR_ID=test_collector_id
GIFTOGRAM_API_KEY=test_api_key
GOOGLE_SHEETS_CLIENT_EMAIL=test@example.com
GOOGLE_SHEETS_PRIVATE_KEY=test_key
GOOGLE_SHEETS_SPREADSHEET_ID=test_spreadsheet_id
```

2. **For production**, you'll need real API keys from each service above.