# Google Sheets Service Account Setup

## Why Service Account?
- OAuth2 Client (what you created) = for user login/authentication
- Service Account (what we need) = for server-to-server API access

## Step-by-Step Setup

### 1. Create Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (or create new one)
3. Go to **IAM & Admin** → **Service Accounts**
4. Click **CREATE SERVICE ACCOUNT**
5. Enter details:
   - Service account name: `ppcu-testimonials`
   - Service account ID: `ppcu-testimonials`
   - Description: `Service account for PPCU testimonial system`
6. Click **CREATE AND CONTINUE**
7. Skip the optional steps (roles and user access)
8. Click **DONE**

### 2. Create JSON Key
1. Click on the service account you just created
2. Go to **KEYS** tab
3. Click **ADD KEY** → **Create new key**
4. Select **JSON** format
5. Click **CREATE**
6. A JSON file will download - **SAVE THIS SECURELY**

### 3. Enable Google Sheets API
1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **ENABLE**

### 4. Share Your Google Sheet
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1cVxfG-VuYzZK6vIydl5cqftRzhpMTH7b9T2nNV-RacY/
2. Click **Share** button
3. Add the service account email (from the JSON file, looks like: `ppcu-testimonials@your-project.iam.gserviceaccount.com`)
4. Give it **Editor** access
5. Click **Send**

### 5. Update Environment Variables

From your downloaded JSON file, extract these values and add to `.env.local`:

```bash
# From the JSON file
GOOGLE_SHEETS_CLIENT_EMAIL="ppcu-testimonials@your-project.iam.gserviceaccount.com"
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Keep existing
GOOGLE_SHEETS_SPREADSHEET_ID="1cVxfG-VuYzZK6vIydl5cqftRzhpMTH7b9T2nNV-RacY"
```

**IMPORTANT**: 
- Keep the quotes around the private key
- Keep the \n characters in the private key
- Never commit this to git

### 6. For Netlify Deployment

In Netlify environment variables:
1. Copy the entire private key including BEGIN/END lines
2. Replace actual newlines with \n
3. Wrap in quotes

Example:
```
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkq...\n-----END PRIVATE KEY-----\n"
```

## Testing

After setup, test the connection:
```bash
curl http://localhost:3000/api/test-sheets
```

You should see your sheet details if successful.