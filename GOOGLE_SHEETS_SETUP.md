# Google Sheets Setup Guide

## Current Issue
Your Google Sheet is not accessible with the API key. You have two options:

## Option 1: Quick Setup (Read-Only)
This allows the system to read from your sheet but not write to it.

1. **Open your Google Sheet**: https://docs.google.com/spreadsheets/d/1cVxfG-VuYzZK6vIydl5cqftRzhpMTH7b9T2nNV-RacY/edit
2. Click **Share** button (top right)
3. Click **Get link**
4. Change from "Restricted" to **"Anyone with the link"**
5. Set permission to **"Viewer"**
6. Click **Done**

## Option 2: Full Setup with Service Account (Recommended)
This allows the system to both read AND write to your sheet.

### Step 1: Create a Google Cloud Project
1. Go to https://console.cloud.google.com/
2. Click **Select a project** → **New Project**
3. Name it "PPCU Testimonials"
4. Click **Create**

### Step 2: Enable Google Sheets API
1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

### Step 3: Create Service Account
1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **Service account**
3. Fill in:
   - Service account name: `ppcu-testimonials`
   - Service account ID: (auto-fills)
4. Click **Create and Continue**
5. Skip the optional steps, click **Done**

### Step 4: Get the Credentials
1. Click on your new service account
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Click **Create** (downloads a JSON file)

### Step 5: Extract Required Info from JSON
Open the downloaded JSON file and find:
- `"client_email"`: This is your GOOGLE_SHEETS_CLIENT_EMAIL
- `"private_key"`: This is your GOOGLE_SHEETS_PRIVATE_KEY

### Step 6: Share Sheet with Service Account
1. Copy the `client_email` from the JSON (looks like: ppcu-testimonials@project-name.iam.gserviceaccount.com)
2. Go to your Google Sheet
3. Click **Share**
4. Paste the service account email
5. Give it **Editor** permission
6. Click **Send**

### Step 7: Update .env.local
```env
GOOGLE_SHEETS_CLIENT_EMAIL=ppcu-testimonials@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-very-long-private-key-here\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_SPREADSHEET_ID=1cVxfG-VuYzZK6vIydl5cqftRzhpMTH7b9T2nNV-RacY
```

## Testing Your Setup
Run this command to test:
```bash
node test-sheets.js
```

## Troubleshooting

### "The caller does not have permission"
- Make sure you've shared the sheet (Option 1 or Step 6 in Option 2)
- Check that the email/key are correct

### "Invalid private key"
- Make sure the private key includes the BEGIN/END lines
- Ensure newlines are preserved (\n)

### Still having issues?
The system will work without Google Sheets - data will be stored in Supabase. Google Sheets is just a backup!