# Bakame AI - Project Documentation

## Overview
Bakame AI is an AI-powered English learning platform for schools with voice-first learning experiences. The platform features a React frontend with a full Express backend API, PostgreSQL database, and ElevenLabs voice integration.

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 18.3.1
- **Backend Framework**: Express with TypeScript
- **Build Tool**: Vite 5.4.1
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: ElevenLabs Conversational AI
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
│   ├── elevenlabs.ts   # ElevenLabs integration
│   ├── index.ts        # Express server setup
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
- `ELEVENLABS_API_KEY`: ElevenLabs API key for voice AI
- `ELEVENLABS_AGENT_ID`: ElevenLabs conversational agent ID

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
- `/government-demo` - Government demo page (ElevenLabs voice AI demo)
- `/blog` - Blog page
- `/support` - Support page
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/early-access` - Early access signup
- `/pricing` - Redirects to /contact
- `/demo-scheduling` - Demo scheduling page
- `/try` - Redirects to /contact
- `/resources` - Redirects to /contact
- `/features` - All features page
- `/roadmap` - Product roadmap page
- `/press` - Press and media page

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
User authentication is handled through Supabase Auth. The authMiddleware validates Bearer tokens.

### User Endpoints
- **GET /api/user/me** - Get current authenticated user
  - Requires: Bearer token in Authorization header
  - Returns: User object with id, email, name, role

### ElevenLabs Endpoints (No Auth Required for Demo)
- **POST /api/elevenlabs/start-conversation** - Start ElevenLabs Conversational Agent
  - Returns: `{ signedUrl: string }` - WebSocket URL for real-time voice conversation
  
- **POST /api/elevenlabs/conversation** - Process conversation with voice synthesis
  - Body: `{ messages: Array, voiceId?: string }`
  - Returns: `{ text: string, audio: base64, timestamp: string }`
  
- **POST /api/elevenlabs/tts** - Text-to-speech conversion
  - Body: `{ text: string, voiceId?: string }`
  - Returns: Audio buffer (audio/mpeg)

## Database Schema

The application uses PostgreSQL with a single table:
- **users**: User accounts (id, email, name, role, created_at)

## Recent Changes

### November 11, 2025 - Code Cleanup (Learning Features Removed)
1. **Removed Learning Functionality**: Cleaned up all learning-related features
   - Deleted flashcard system (AI generation and manual creation)
   - Removed learning sessions tracking
   - Removed progress tracking and gamification
   - Removed pronunciation checking
   - Deleted student dashboard and all progress components
2. **Database Schema Simplified**: Only users table remains
3. **API Routes Cleaned**: Only authentication and ElevenLabs endpoints remain
4. **Codebase Optimization**: Removed unused OpenAI integration code
   - Authentication system remains intact for future features
   - ElevenLabs voice AI demo functionality preserved

### November 11, 2025 - Audio Quality & Playback Fix
1. **Fixed Chipmunk Voice Issue**: Resolved sample rate mismatch causing fast, high-pitched audio
   - Demo now dynamically detects audio formats from agent's metadata instead of hardcoding values
   - Playback uses agent's actual output sample rate (e.g., 16kHz) instead of incorrect 24kHz
   - Microphone capture matches agent's expected input format automatically
   - Voice now plays at correct pace and pitch, matching ElevenLabs dashboard settings exactly
2. **Removed Audio Hallucinations**: Fixed microphone picking up background audio
   - YouTube background video now muted to prevent audio feedback loop
   - Microphone only captures user's voice, not AI responses or video audio
   - Eliminates phantom transcriptions of background sounds
3. **Agent Settings Respect**: Removed all audio format overrides
   - Demo uses exact voice, pace, and quality configured in ElevenLabs agent dashboard
   - No client-side modifications to agent behavior
   - Full compatibility with agent's configured settings

### November 11, 2025 - Minimal Demo Page with ElevenLabs Conversational Agent
1. **Simplified Demo Interface**: Redesigned demo page for maximum impact with minimal UI
   - Removed all chat UI, prompts, and complex interface elements
   - Clean black background with single centered white microphone button
   - Focused user experience: click mic to talk to AI tutor immediately
2. **Video Fade-In Effect**: Smooth visual transition when starting conversation
   - YouTube video (https://youtu.be/bVbRBLaTMpI) fades in over 1 second when mic is clicked
   - Subtle dark overlay (30% opacity) maintains text visibility
   - Responsive video background covers full viewport
3. **ElevenLabs Conversational Agent Integration**: WebSocket API implementation (FIXED)
   - Backend makes GET request to `/v1/convai/conversation/get-signed-url?agent_id={id}`
   - Returns signed WebSocket URL with conversation signature
   - Frontend establishes WebSocket connection to ElevenLabs agent
   - Real-time bidirectional voice conversation with AI English tutor
   - Proper error handling, validation, and connection status indicators
   - Uses environment variables: `ELEVENLABS_API_KEY` and `ELEVENLABS_AGENT_ID`
4. **Status Indicators**: Clear visual feedback for connection state
   - "Connecting..." message shown during WebSocket setup
   - "AI Tutor is listening..." with pulsing green dot when active
   - Microphone button scales and pulses when conversation is active

### November 11, 2025 - Navigation Simplification & Demo Branding
1. **Navigation Cleanup**: Simplified main navigation to show only essential links
   - Removed "Actual Demo" and "Contact Sales" from navbar
   - Navigation now displays: Home, Solutions, About (plus Log in/Sign up)
   - Cleaner, more focused user experience
2. **Demo Branding Consistency**: Changed all "Actual Demo" references to simply "Demo"
   - Updated navbar button text
   - Changed hero section button from "Book a Demo" to "Demo"
   - Unified all demo buttons across homepage to say "Demo"
   - Removed redundant "Contact Sales" buttons throughout homepage

### November 11, 2025 - Code Cleanup & Optimization
1. **Hero Section Update**: Changed homepage heading from "AI-Powered English Learning from Voice to Victory" to simply "Voice and Victory"
2. **YouTube Video Background**: Implemented YouTube video background (https://youtu.be/luiE5rZKhzg) for hero section with autoplay, mute, and loop
3. **For Teachers Page Cleanup**: 
   - Replaced "How AI Can Help You" section with classroom image
   - Compressed teacher dashboard features section for better visual balance
   - Removed "Ready to Transform Your Teaching?" CTA section
4. **Solution Pages Removal** (lightweight code approach):
   - Deleted `ForStudents.tsx`, `ForTeachers.tsx`, and `ForSchools.tsx` page files
   - Updated Solutions dropdown to show "For Students", "For Teachers", "For Schools" as non-clickable informational items
   - Removed routes from `App.tsx` for deleted solution pages
   - Applied muted styling (opacity-60, gray colors) to visually distinguish non-interactive items from clickable links
   - "All Features" and "Roadmap" remain clickable in Solutions dropdown
5. **Codebase Cleanup** (making application lighter):
   - Deleted unused `TryDemo.tsx` page (was commented out and redirected)
   - Deleted unused `teamData.ts` file containing fake team data (real team hardcoded in Team.tsx)
   - Removed commented import line in `App.tsx`
   - Optimized lucide-react icon imports in `Index.tsx` - removed 17 unused icons

### October 12, 2025
1. **Theme Update**: Made app permanently dark mode only - removed theme toggle and ThemeProvider
2. **Color Scheme Overhaul**: Replaced all orange colors (#ffa366) with professional light blue (#4c9dff) throughout entire website
3. **Partner Update**: Changed partner section to "Trusted by Schools and Institutions Across Africa and the US" with specific partners
4. **B2N Focus**: Converted platform to B2N (Business-to-NGO) model - replaced all government references with NGO throughout the website
5. **Role-Based Access**: Implemented comprehensive role-based access control with ProtectedRoute and RoleGuard components

## Features
- Dark theme only (permanent dark mode for consistent B2N aesthetic)
- Responsive design with Tailwind CSS
- Analytics integration
- Toast notifications
- Form handling with React Hook Form
- Data fetching with TanStack Query
- Supabase authentication
- Role-based access control for different user types (student, teacher, admin, school, government, NGO)
- Click-only navigation dropdowns for better user control
- ElevenLabs Conversational AI for voice-first learning experiences
