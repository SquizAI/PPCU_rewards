# Netlify Deployment Checklist

## Pre-Deployment
- [x] Code committed to git
- [x] All sensitive data in .env.local (not committed)
- [x] netlify.toml configuration file created
- [x] Build tested locally with `npm run build`

## Environment Variables to Add in Netlify Dashboard

```bash
# Required
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
GOOGLE_SHEETS_SPREADSHEET_ID=1cVxfG-VuYzZK6vIydl5cqftRzhpMTH7b9T2nNV-RacY
GOOGLE_SHEETS_PRIVATE_KEY=AIzaSyBT8ElQIyL6w79BM4tQ4ZfTB-X3-KbYmGc

# Optional (add when ready)
NEXT_PUBLIC_VOCAL_VIDEO_COLLECTOR_ID=your_collector_id
VOCAL_VIDEO_WEBHOOK_SECRET=your_webhook_secret
GIFTOGRAM_API_KEY=your_api_key
GIFTOGRAM_CAMPAIGN_ID=your_campaign_id
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
OWNER_EMAIL=owner@postpartumcareusa.com
DASHBOARD_PASSWORD=your_secure_password
CRON_SECRET=your_cron_secret
```

## Quick Deploy Commands

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Post-Deployment
1. Update NEXT_PUBLIC_APP_URL to your Netlify URL
2. Test the form submission
3. Verify Google Sheets connection at `/api/test-sheets`
4. Set up custom domain if needed

## Google Sheets Note
Currently, the Google Sheets integration is READ-ONLY. To enable writing:
1. Follow the instructions in GOOGLE_SHEETS_SETUP.md
2. Create a service account
3. Update environment variables with service account credentials