# Bakame AI - Project Documentation

## Overview
Bakame AI is an AI-powered English learning platform for schools with voice-first learning experiences, AI-generated flashcards, and pronunciation testing. The platform features a React frontend with a full Express backend API, PostgreSQL database, and OpenAI integration.

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 18.3.1
- **Backend Framework**: Express with TypeScript
- **Build Tool**: Vite 5.4.1
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: OpenAI API (GPT-4)
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with dark-only theme
- **Routing**: React Router DOM v6
- **State Management**: TanStack Query (React Query) v5
- **Icons**: Lucide React

### Project Structure
```
├── src/                  # Frontend React application
│   ├── components/       # Reusable UI components
│   ├── data/            # Static data files
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # External service integrations (Supabase)
│   ├── lib/             # Utility functions
│   ├── pages/           # Route page components
│   ├── styles/          # Additional CSS files
│   ├── utils/           # Utility modules
│   ├── App.tsx          # Main app component with routing
│   └── main.tsx         # Application entry point
├── server/              # Backend Express API
│   ├── middleware/      # Auth and other middleware
│   ├── db.ts           # Database connection
│   ├── index.ts        # Express server setup
│   ├── openai.ts       # OpenAI integration
│   ├── routes.ts       # API route definitions
│   └── storage.ts      # Database operations layer
├── shared/              # Shared types and schemas
│   └── schema.ts       # Drizzle ORM database schema
├── supabase/           # Supabase configuration
├── public/             # Static assets
└── drizzle.config.ts   # Database configuration
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

## Backend API Endpoints

### Authentication
All endpoints (except public ones) require Bearer token in Authorization header from Supabase auth.

### Flashcard Endpoints
- **POST /api/flashcards/generate** - Generate AI-powered flashcards
  - Body: `{ topic: string, text?: string, count?: number }`
  - Returns: Generated and saved flashcards
  
- **GET /api/flashcards** - Get user's flashcards
  - Returns: Array of user's flashcards
  
- **POST /api/flashcards** - Create a flashcard manually
  - Body: `{ topic: string, front: string, back: string, difficulty?: string }`

### Learning Session Endpoints
- **POST /api/sessions** - Record a learning session
  - Body: `{ session_type: string, duration_seconds: number, score?: number }`
  
- **GET /api/progress** - Get user's learning progress
  - Returns: User progress statistics

### Pronunciation Endpoints  
- **POST /api/pronunciation/check** - Check pronunciation (currently mock implementation)
  - Returns: Score and feedback

## Database Schema

The application uses PostgreSQL with four main tables:
- **users**: User accounts (id, email, name, role, created_at)
- **flashcards**: AI-generated and user-created flashcards
- **learning_sessions**: Records of study sessions
- **user_progress**: Cumulative progress tracking

## Recent Changes

### November 11, 2025 - Code Cleanup & Optimization
1. **Hero Section Update**: Changed homepage heading from "AI-Powered English Learning from Voice to Victory" to simply "Voice and Victory"
2. **YouTube Video Background**: Implemented YouTube video background (https://youtu.be/luiE5rZKhzg) for hero section with autoplay, mute, and loop
3. **For Teachers Page Cleanup**: 
   - Replaced "How AI Can Help You" section with classroom image
   - Compressed teacher dashboard features section for better visual balance
   - Removed "Ready to Transform Your Teaching?" CTA section
4. **Codebase Cleanup** (making application lighter):
   - Deleted unused `TryDemo.tsx` page (was commented out and redirected)
   - Deleted unused `teamData.ts` file containing fake team data (real team hardcoded in Team.tsx)
   - Removed commented import line in `App.tsx`
   - Optimized lucide-react icon imports in `Index.tsx` - removed 17 unused icons (ChevronDown, BookOpen, ArrowRight, Shield, Zap, Target, Languages, Headphones, Database, Globe, BarChart3, Newspaper, Sparkles, TrendingUp, DollarSign, Gamepad2, Wifi)

### October 12, 2025
1. **Theme Update**: Made app permanently dark mode only - removed theme toggle and ThemeProvider
2. **Color Scheme Overhaul**: Replaced all orange colors (#ffa366) with professional light blue (#4c9dff) throughout entire website including primary colors, buttons, icons, gradients, text highlights, and CSS variables
3. **Partner Update**: Changed partner section to "Trusted by Schools and Institutions Across Africa and the US" with specific partners:
   - Neeley's Institute
   - Dallas Innovates
   - US Chamber of Commerce
   - TCU 360
   - TCU CS Department
   - Fort Worth Report
   - Kagarama SS
   - GS Karembure
4. **B2N Focus**: Converted platform to B2N (Business-to-NGO) model - replaced all government references with NGO throughout the website
5. **Role-Based Access**: Implemented comprehensive role-based access control with ProtectedRoute and RoleGuard components
6. **Student Dashboard**: Created gamified student dashboard with learning progress tracking and achievement badges
7. **Navigation Fix**: Fixed dropdown behavior to be click-only instead of hover-triggered to prevent unexpected dropdown appearances

## Features
- Dark theme only (permanent dark mode for consistent B2N aesthetic)
- Responsive design with Tailwind CSS
- Analytics integration
- Toast notifications
- Form handling with React Hook Form
- Data fetching with TanStack Query
- Supabase authentication and database integration
- Role-based access control for different user types (student, teacher, admin, school, government, NGO)
- Click-only navigation dropdowns for better user control