# Bakame AI - Project Documentation

## Overview
Bakame AI is an AI-powered English learning platform for schools. This is a React-based single-page application built with Vite, TypeScript, and integrated with Supabase for backend services.

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Language**: TypeScript
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom theming
- **Routing**: React Router DOM v6
- **State Management**: TanStack Query (React Query) v5
- **Backend/Database**: Supabase
- **Icons**: Lucide React

### Project Structure
```
├── src/
│   ├── components/        # Reusable UI components
│   ├── data/             # Static data files
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # External service integrations (Supabase)
│   ├── lib/              # Utility functions
│   ├── pages/            # Route page components
│   ├── styles/           # Additional CSS files
│   ├── utils/            # Utility modules
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx          # Application entry point
├── supabase/             # Supabase configuration and migrations
└── public/               # Static assets
```

## Configuration

### Replit Environment Setup
- **Port**: 5000 (configured for Replit's webview)
- **Host**: 0.0.0.0 (allows all hosts for Replit proxy)
- **Workflow**: "Start application" runs `npm run dev`

### Environment Variables
The following environment variables are configured in `.env`:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Supabase public API key
- `VITE_SUPABASE_PROJECT_ID`: Supabase project identifier

### Vite Configuration
- Development server on port 5000 with 0.0.0.0 host
- Preview server on port 5000 with 0.0.0.0 host
- HMR (Hot Module Replacement) enabled
- Path alias `@` points to `./src`

## Available Routes
- `/` - Home page
- `/about` - About page
- `/team` - Team page
- `/contact` - Contact page
- `/government-solution` - Government solution page
- `/enterprise-solution` - Enterprise solution page
- `/education-solution` - Education solution page
- `/government-demo` - Government demo page
- `/blog` - Blog page
- `/support` - Support page
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/early-access` - Early access signup
- `/pricing` - Pricing page
- `/demo-scheduling` - Demo scheduling page

## Development

### Running the Application
```bash
npm run dev
```
The application will start on http://localhost:5000 (or the Replit webview URL).

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment
This project is configured for Replit's autoscale deployment:
- **Build command**: `npm run build`
- **Run command**: `npm run preview`
- **Port**: 5000

## Recent Changes (October 1, 2025)
1. Configured Vite to run on port 5000 with 0.0.0.0 host for Replit compatibility
2. Updated Supabase client to use environment variables instead of hardcoded credentials
3. Added preview server configuration for production deployment
4. Set up workflow for automatic development server startup
5. Configured deployment settings for Replit autoscale

## Features
- Dark theme by default with theme switching capability
- Responsive design with Tailwind CSS
- Analytics integration
- Toast notifications
- Form handling with React Hook Form
- Data fetching with TanStack Query
- Supabase authentication and database integration
