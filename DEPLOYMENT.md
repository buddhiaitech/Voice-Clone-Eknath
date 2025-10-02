# Voice Agency Website - Deployment Guide

This is a React-based voice agency website with Vapi.ai integration for outbound calling.

## Environment Variables Required

Set these in your Vercel dashboard:

```
VAPI_PRIVATE_API_KEY=your_private_api_key_here
ASSISTANT_ID=your_assistant_id_here
PHONE_NUMBER_ID=your_phone_number_id_here
```

## Features

- 📞 Outbound calling via Vapi.ai
- 🇮🇳 Indian phone number validation
- 📱 Responsive design with React + Vite
- 🚀 Serverless API routes for Vercel
- 🔒 Secure server-side API calls

## Local Development

1. Install dependencies: `npm install`
2. Set up environment variables in `.env.local`
3. Run development servers: `npm run dev:full`
4. Visit: http://localhost:8080

## Production Deployment

Deploy to Vercel with the environment variables configured in the dashboard.