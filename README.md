# PPCU Testimonial Collection System

A modern, automated testimonial collection system for Postpartum Care USA featuring video testimonials, automated rewards, and comprehensive analytics.

## Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 📝 **Smart Forms** - Progressive testimonial collection with validation
- 🎥 **Video Integration** - Seamless Vocal Video integration with UTM tracking
- 🎁 **Automated Rewards** - Instant gift card distribution via Giftogram
- 📊 **Analytics Dashboard** - Real-time testimonial tracking and insights
- 🔒 **HIPAA Compliant** - Secure data handling and consent management
- 📧 **Monthly Reports** - Automated email summaries for owners

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Framer Motion, Lucide Icons
- **Forms**: React Hook Form, Zod validation
- **Backend**: Next.js API Routes
- **Integrations**: Vocal Video, Giftogram, Google Sheets

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- API keys for Vocal Video, Giftogram, and Google Sheets

### Installation

1. Clone the repository:
```bash
cd ppcu-testimonials
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API credentials.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the testimonial form.

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the admin dashboard.

### Production

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
ppcu-testimonials/
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── dashboard/      # Admin dashboard
│   │   └── page.tsx        # Main testimonial form
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   └── testimonial-form.tsx
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities
├── public/                # Static assets
└── package.json
```

## Configuration

### Vocal Video Setup

1. Create a collector in Vocal Video
2. Configure webhook to point to `/api/video-callback`
3. Add collector ID to environment variables

### Giftogram Setup

1. Create a campaign in Giftogram
2. Set up API credentials
3. Configure gift card amount ($50)

### Google Sheets Setup

1. Create a service account in Google Cloud Console
2. Share spreadsheet with service account email
3. Add credentials to environment variables

## API Endpoints

- `POST /api/testimonials` - Submit testimonial form
- `GET /api/testimonials` - Fetch all testimonials (dashboard)
- `POST /api/video-callback` - Vocal Video webhook handler

## Security

- All data transmission is encrypted
- HIPAA-compliant data handling
- Consent management built-in
- Dashboard access protection

## Deployment

The application can be deployed to:

- Vercel (recommended)
- AWS Amplify
- Netlify
- Any Node.js hosting platform

## Support

For issues or questions, please contact the development team.
