# Deployment Guide for PPCU Testimonial System - Netlify

## Prerequisites

Before deploying, make sure you have:
1. All API keys and credentials (see API_REQUIREMENTS.md)
2. A GitHub account
3. A Netlify account (free tier works)

## Step 1: Prepare Your Repository

1. Create a new GitHub repository
2. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ppcu-testimonials.git
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy with Netlify CLI
```bash
npm i -g netlify-cli
netlify deploy
netlify deploy --prod
```

### Option B: Deploy via Netlify Dashboard
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Build settings will be auto-detected from `netlify.toml`
5. Click "Deploy site"

## Step 3: Configure Environment Variables

In Netlify Dashboard:
1. Go to Site settings → Environment variables
2. Click "Add a variable"
3. Add these environment variables:

```
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
NEXT_PUBLIC_VOCAL_VIDEO_COLLECTOR_ID=your_actual_collector_id
VOCAL_VIDEO_WEBHOOK_SECRET=generate_a_secure_secret
GIFTOGRAM_API_KEY=your_giftogram_api_key
GIFTOGRAM_CAMPAIGN_ID=your_campaign_id
GOOGLE_SHEETS_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
OWNER_EMAIL=owner@postpartumcareusa.com
DASHBOARD_PASSWORD=secure_password_here
CRON_SECRET=generate_another_secure_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Step 4: Configure Vocal Video Webhook

1. Log into Vocal Video
2. Go to your collector settings
3. Add webhook URL: `https://your-site-name.netlify.app/api/video-callback`
4. Copy the webhook secret and add it to your environment variables

## Step 5: Set Up Google Sheets

1. Create a new Google Sheet
2. Note the spreadsheet ID from the URL
3. Share the sheet with your service account email (view/edit permissions)
4. The system will automatically create headers on first run

## Step 6: Configure Monthly Reports with Netlify Functions

For scheduled monthly reports, you have two options:

### Option A: Use Netlify Scheduled Functions (Beta)
Create a scheduled function in `netlify/functions/monthly-report-scheduled.js`

### Option B: Use External Cron Service
1. Use a service like:
   - EasyCron: https://www.easycron.com/
   - Cron-job.org: https://cron-job.org/
   - GitHub Actions (free)
2. Set it to call: `https://your-site.netlify.app/api/cron/monthly-report`
3. Include header: `Authorization: Bearer YOUR_CRON_SECRET`

## Step 7: Test Your Deployment

1. Visit your deployed URL
2. Submit a test testimonial
3. Check Supabase/Google Sheets for the entry
4. Test video submission flow
5. Verify dashboard at `/dashboard`

## Custom Domain Setup

1. In Netlify Dashboard, go to Domain settings
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` environment variable
5. SSL certificate is automatic

## Build Settings

The `netlify.toml` file configures:
- Build command: `npm run build`
- Publish directory: `.next`
- Next.js plugin for optimal performance
- Security headers
- Function settings

## Security Checklist

- [ ] All environment variables are set
- [ ] Dashboard password is strong
- [ ] Webhook secrets are configured
- [ ] HTTPS is enabled (automatic on Netlify)
- [ ] Supabase RLS policies are active
- [ ] Google Sheets has correct permissions

## Monitoring

### Netlify Analytics
- Go to Analytics tab in Netlify dashboard
- Monitor page views and performance
- Check function logs for errors

### Function Logs
- Go to Functions tab → View logs
- Monitor API errors and performance
- Set up alerts for failures

## Troubleshooting

### Build Failures
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Testimonials not saving
- Check Function logs for errors
- Verify Supabase credentials
- Test Google Sheets permissions
- Check browser console for client-side errors

### Gift cards not sending
- Verify Giftogram API key and campaign ID
- Check Giftogram account balance
- Review webhook Function logs

### Emails not sending
- Verify SMTP credentials
- For Gmail, use app-specific password
- Check spam folder for test emails
- Consider using Netlify Email Integration

### 404 Errors on Routes
- Ensure `_redirects` file or `netlify.toml` has proper redirects
- Next.js routes should work automatically with the plugin

## Performance Optimization

1. **Enable Netlify Cache**
   - Already configured for Next.js

2. **Image Optimization**
   - Next.js Image component works with Netlify

3. **Edge Functions** (Optional)
   - Move authentication to edge for better performance

## Support

- Netlify Docs: https://docs.netlify.com/
- Netlify Support: https://www.netlify.com/support/
- Community Forum: https://community.netlify.com/
- Next.js on Netlify: https://docs.netlify.com/integrations/frameworks/next-js/