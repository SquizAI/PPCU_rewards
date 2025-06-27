# Create PPCU Testimonials Site on Netlify

## Method 1: Web Interface (Recommended due to CLI issues)

1. **Go to Netlify Dashboard**: https://app.netlify.com/
2. **Click "Add new site"** → **"Deploy manually"**
3. **Build the project first**:
   ```bash
   npm run build
   ```
4. **Drag and drop the `.next` folder** to the deploy area
5. **After deployment, go to Site settings**:
   - Change site name to `ppcu-testimonials`
   - Add all environment variables from `NETLIFY_ENV_VARS.txt`

## Method 2: Manual CLI Deploy (if CLI works)

```bash
# Build first
npm run build

# Create site manually on web, then get site ID and run:
netlify link --id YOUR_SITE_ID
netlify deploy --prod --dir=.next
```

## Method 3: GitHub Integration (Best for continuous deployment)

1. **Create GitHub repository**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ppcu-testimonials.git
   git push -u origin main
   ```

2. **In Netlify**:
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select the repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variables

## Environment Variables to Add

Copy exactly from `NETLIFY_ENV_VARS.txt`:
- `NEXT_PUBLIC_APP_URL`
- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_PRIVATE_KEY` (with quotes!)
- `GOOGLE_SHEETS_SPREADSHEET_ID`

Your site should be named something like: `ppcu-testimonials.netlify.app`