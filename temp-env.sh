#!/bin/bash

# Set required environment variables
netlify env:set NEXT_PUBLIC_APP_URL "https://marvelous-nasturtium-e33ff6.netlify.app"
netlify env:set GOOGLE_SHEETS_CLIENT_EMAIL "ppcu-srvc-acct@vibecode-457820.iam.gserviceaccount.com"
netlify env:set GOOGLE_SHEETS_SPREADSHEET_ID "1cVxfG-VuYzZK6vIydl5cqftRzhpMTH7b9T2nNV-RacY"

# Set secure values for optional environment variables
netlify env:set DASHBOARD_PASSWORD "securePassword123!"
netlify env:set CRON_SECRET "cronSecret456!"
netlify env:set VOCAL_VIDEO_WEBHOOK_SECRET "webhookSecret789!"
netlify env:set NEXT_PUBLIC_VOCAL_VIDEO_COLLECTOR_ID "test_collector_id"
netlify env:set OWNER_EMAIL "owner@postpartumcareusa.com"

# Email service settings
netlify env:set SMTP_HOST "smtp.gmail.com"
netlify env:set SMTP_PORT "587"
netlify env:set SMTP_USER "your_email@gmail.com"
netlify env:set SMTP_PASS "your_app_password"

echo "Environment variables have been set successfully!"

# Note: The private key should be set separately for security reasons
echo "Don't forget to set GOOGLE_SHEETS_PRIVATE_KEY manually using:"
echo "netlify env:set GOOGLE_SHEETS_PRIVATE_KEY \"YOUR_PRIVATE_KEY\"" 