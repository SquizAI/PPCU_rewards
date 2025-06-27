# PPCU Testimonials - Manual Netlify Deployment

## Quick Deployment Steps

### Option 1: Netlify Drop (Easiest)
1. Build the project:
   ```bash
   npm run build
   ```

2. Go to https://app.netlify.com/drop

3. Drag and drop the `.next` folder to deploy

4. Once deployed, go to Site settings → Environment variables and add all variables from `NETLIFY_ENV_VARS.txt`

### Option 2: Connect GitHub Repository
1. Create a new GitHub repository for this project
2. Push the code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ppcu-testimonials.git
   git push -u origin main
   ```

3. In Netlify dashboard:
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

### Option 3: Netlify CLI (if working)
```bash
# Try creating a new site
netlify sites:create --name ppcu-testimonials

# Then deploy
netlify deploy --prod --dir=.next
```

## Critical Environment Variables

Add these to your Netlify site (Site settings → Environment variables):

```
NEXT_PUBLIC_APP_URL=https://YOUR-SITE-NAME.netlify.app
GOOGLE_SHEETS_CLIENT_EMAIL=ppcu-srvc-acct@vibecode-457820.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDwcvU655iOb7Mo\nfPd8LhrAYgdndGESTL1JMtKNjbFdhUQh8a3/ePInC6oSOcl93J0EdzOF4ybfKtLd\nzhQjSlNy1xpIpU+VcvlCHKQg5pxQSeeKbL07eeXBwkUprCq/lESxNMmRkwSIE82y\nGKtv5406t6t0jpxmLivrKVOmfGPtODcovXUdk+88iHPvReIPxTeL5CsTTDioj8BJ\n/FwtERsWA5JJ8rgvfhXOP4XGv9OzXIsgbT/qhHkz6GvbBNXNtQyGnPCQNBiZLOuN\neUu91JBKMHYxDGfwm7MZey/aMVlR2CGpJvRVBEv7AX2ChihECzGWUbWJyYIvsCQF\nu4AY8Qh3AgMBAAECggEAGUfU7ckM2qj22sJs2OMWD/Uelyt+y0hDPI954MUtiUoq\nNDFvXGVwfFd3HaxyuWd5IM+RnLmZzCv5+LUim+VEKdZg3pN27x0kBOXzAbyNYcmr\nbPvq13aFCB6vW+bMpdDmegU1Tjd5af8/CMMcP0tGp45JGhumaP3gwzxYnbAFZ5rl\nzQSGDMWti6vWvGTgRbciU3IKbBe/T97rOGLaLhZAXMp0Z1y21TIqKaTKgbVqpHim\ncSj/i7HDMOkh/NAEzyqfGI10PHyT/Kx9fRcvvfFfJhTVN7WzGSKaAdIsbByaeOxo\nOKZM+EImXC8DbtiDuNk947Dh8iBM7erBdz+sr7ihKQKBgQD+5dtbzXAmugBmu/4u\n/MYoaqgOOwvhldi82r1Bkf++syZLWpuHnT5n4wegMzyvxQhNsp8Xzmohxuvr47eO\n+iGCD52ouFYIo6EPdNdZZaNFrJ44sXfH+zMjkGKVrHl7+9uSu+2z2uhz/yYfgPUC\ngo5g7J5+zzXYh8ytzkAvfCUQrwKBgQDxfRubzPIK7P8cS1BLTbgwYOHWNnIJB5kC\nYgk67kYLjyNzfNm32OT+wF1Si3i5fjEPRhwmopV4MBmJ1QKApcnPovJlgwSNrJkZ\nPxQ7+eUgDxd6F7k6L2owq1NU3ByQR8e40Gk2ILcU2JEOw81/1l5g1ggVdVVy2P9U\noW+KOLImuQKBgQCkBM5pPUGsecWmVdPS8m6kNTVcqtwTVbP4mhxsJAFX+blrhatM\n0X8FpE4U5MNpKzUTohvDWtxqTbEjwg0soIGNSnUdyzf5KSmLY5jq+n7cZ54MRw4X\njemzOcZmH2ywvjjlK65iLDul4InsfbOq4M2zSq8WVEmGwqOPN4ePxqenGwKBgQC0\nlyy4XJF9XjKBhEjtp5dghnMc8OZink3snEfuzBWRu191lB51ADxvzod7nVWQ0i/6\nDiIrOlaw5LeUfbk7X8AGCQNgqpQTJsnvOV72YzDXwrF52pfoTWEKOHU+9sRdmXBg\nY2rq0ZhYfIQuGHtraHJ31FeDRJW8J076iSeSpEeF8QKBgDB9o2jrU0F5sHyd0cY3\n5BVFoTTokAnRbK9suSK1b8FWeYA8BGbGL5yIidwBQqkv7p6LmkHjSkjyhmYh24FM\nD41BvETcWGWfb6UnuNBW3OhHQcX2w6rqsGLNszZQcVhVKgY/vrOTw8trHFlbDTUt\n5A529b6MjhYK/7/OAgmIDl56\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=1cVxfG-VuYzZK6vIydl5cqftRzhpMTH7b9T2nNV-RacY
```

## After Deployment

1. Update `NEXT_PUBLIC_APP_URL` with your actual Netlify URL
2. Test the form submission
3. Verify testimonials appear in your Google Sheet
4. Test the dashboard redirect

## Troubleshooting

- If forms don't submit: Check environment variables
- If Google Sheets don't update: Verify service account email in sheet sharing
- If styling is broken: Check build logs for errors

## Google Sheet Access
View testimonials: https://docs.google.com/spreadsheets/d/1cVxfG-VuYzZK6vIydl5cqftRzhpMTH7b9T2nNV-RacY/