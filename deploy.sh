#!/bin/bash

echo "🚀 PPCU Testimonials - Netlify Deployment Script"
echo "================================================"
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
else
    echo "✅ Netlify CLI is installed"
fi

# Check if we're logged in
echo ""
echo "Checking Netlify authentication..."
netlify status || netlify login

# Build the project
echo ""
echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

# Deploy to Netlify
echo ""
echo "🌐 Deploying to Netlify..."
echo ""

# Check if site is already linked
if [ -f ".netlify/state.json" ]; then
    echo "Site is already linked. Deploying..."
    netlify deploy --prod --dir=.next
else
    echo "First time deployment. Let's set up your site..."
    netlify init
    echo ""
    echo "Now deploying to production..."
    netlify deploy --prod --dir=.next
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Don't forget to add environment variables in Netlify dashboard:"
echo "- GOOGLE_SHEETS_CLIENT_EMAIL"
echo "- GOOGLE_SHEETS_PRIVATE_KEY"
echo "- GOOGLE_SHEETS_SPREADSHEET_ID"
echo "- And others from NETLIFY_ENV_VARS.txt"
echo ""
echo "Your site will be available at the URL shown above."