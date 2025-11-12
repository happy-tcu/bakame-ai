# Bakame AI - Project Documentation

## Overview
Bakame AI is an AI-powered English learning platform for schools with voice-first learning experiences and comprehensive conversation analytics. The platform features a React frontend with a full Express backend API, PostgreSQL database, and ElevenLabs voice integration.

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
│   │   ├── auth/        # Authentication components (AuthContext, RoleGuard, etc.)
│   │   ├── layout/      # Layout components (Navbar)
│   │   └── ui/          # shadcn/ui components
│   ├── pages/           # Route page components
│   │   ├── AdminDashboard.tsx  # Admin analytics dashboard
│   │   └── ...          # Other pages
│   ├── App.tsx          # Main app component with routing
│   └── main.tsx         # Application entry point
├── server/              # Backend Express API
│   ├── middleware/      # Auth and other middleware
│   ├── db.ts           # Database connection
│   ├── elevenlabs.ts   # ElevenLabs integration
│   ├── index.ts        # Express server setup
│   ├── routes.ts       # API route definitions + webhook handler
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
- `ELEVENLABS_WEBHOOK_SECRET`: Secret for validating webhook signatures
- `DATABASE_URL`: PostgreSQL connection string

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
- `/admin` - Admin dashboard (authenticated, admin-only)

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

### Database Migrations
```bash
npm run db:push
```
Use `--force` flag if prompted for confirmations.

## Deployment
This project is configured for Replit's autoscale deployment:
- **Build command**: `npm run build` - Compiles React/Vite frontend to static files in `dist/`
- **Run command**: `tsx server/index.ts` - Starts production Express server
- **Port**: 5000 (via PORT environment variable)
- **Server Configuration**:
  - Binds to `0.0.0.0` for external access
  - Serves API routes at `/api/*`
  - Serves built static files from `dist/` folder in production mode
  - Handles React Router client-side routing
  - Returns JSON for API errors (including 404s)
  - Returns `index.html` for SPA navigation

## Backend API Endpoints

### Authentication
User authentication is handled through Supabase Auth. The authMiddleware validates Bearer tokens.

### User Endpoints
- **GET /api/user/me** - Get current authenticated user
  - Requires: Bearer token in Authorization header
  - Returns: User object with id, email, name, role

### Admin Endpoints (Admin-only)
- **GET /api/admin/conversations** - Get all conversations with filters
  - Query params: `startDate`, `endDate`, `userId`, `agentId`, `minDuration`, `maxDuration`, `minCost`, `maxCost`
  - Returns: Array of conversations
  
- **GET /api/admin/stats** - Get conversation statistics
  - Returns: `{ totalCalls, totalDuration, totalCost, uniqueUsers }`
  
- **GET /api/admin/conversations/:id** - Get single conversation details
  - Returns: Full conversation with transcript and analysis

### ElevenLabs Endpoints (No Auth Required for Demo)
- **POST /api/elevenlabs/start-conversation** - Start ElevenLabs Conversational Agent
  - Returns: `{ signedUrl: string }` - WebSocket URL for real-time voice conversation
  
- **POST /api/elevenlabs/conversation** - Process conversation with voice synthesis
  - Body: `{ messages: Array, voiceId?: string }`
  - Returns: `{ text: string, audio: base64, timestamp: string }`
  
- **POST /api/elevenlabs/tts** - Text-to-speech conversion
  - Body: `{ text: string, voiceId?: string }`
  - Returns: Audio buffer (audio/mpeg)

### Webhook Endpoints
- **POST /api/webhooks/elevenlabs** - Receive ElevenLabs post-call webhooks
  - Validates HMAC signature using `ELEVENLABS_WEBHOOK_SECRET`
  - Stores conversation data (transcript, analysis, metadata)
  - Handles duplicate deliveries via upsert

## Database Schema

The application uses PostgreSQL with two main tables:

### users
- `id` (serial, primary key)
- `email` (varchar, unique, not null)
- `name` (varchar)
- `role` (varchar) - e.g., 'student', 'teacher', 'admin'
- `created_at` (timestamp)

### conversations
- `id` (serial, primary key)
- `conversation_id` (varchar, unique) - ElevenLabs conversation ID
- `agent_id` (varchar) - ElevenLabs agent ID
- `user_id` (varchar) - Optional user identifier
- `status` (varchar)
- `start_time` (timestamp)
- `call_duration_seconds` (integer)
- `cost` (decimal)
- `transcript` (jsonb) - Full conversation turns
- `analysis` (jsonb) - AI analysis results
- `metadata` (jsonb) - Call metadata from ElevenLabs
- `conversation_initiation_data` (jsonb) - Config and variables
- `created_at` (timestamp)

## Admin Dashboard Features

The admin dashboard (`/admin`) provides comprehensive analytics for ElevenLabs conversations:

### Overview Statistics
- **Total Calls**: Number of conversations
- **Total Duration**: Cumulative speaking time
- **Total Cost**: Sum of all conversation costs
- **Unique Users**: Number of distinct users

### Filtering & Search
- **Search**: By conversation ID, user ID, or agent ID
- **Date Range**: Pick start and end dates
- **Cost Range**: Filter by minimum and maximum cost
- **Duration Range**: Filter by call length
- **Clear Filters**: Reset all filters at once

### Data Table
- View all conversations with key metrics
- Sort by date (newest first)
- Click to view full details including transcript and analysis

### Export Capabilities
- **CSV Export**: Download filtered data as CSV for Excel/Sheets
- **JSON Export**: Download raw data for further processing

### Conversation Details
- Full transcript with user/agent turns
- Analysis results from ElevenLabs
- Metadata including costs, duration, timestamps
- Configuration and dynamic variables

## ElevenLabs Webhook Integration

### Setup Instructions
1. Configure webhook URL in ElevenLabs dashboard: `https://your-app.repl.co/api/webhooks/elevenlabs`
2. Set `ELEVENLABS_WEBHOOK_SECRET` environment variable with the shared secret from ElevenLabs
3. Enable post-call transcription webhooks in ElevenLabs settings

### Webhook Data Flow
1. ElevenLabs sends POST request when call ends
2. Backend validates HMAC signature
3. Data is stored/updated in conversations table (upsert on conversation_id)
4. Admin dashboard displays updated stats and conversation list

### Security
- HMAC signature validation using SHA256
- Timestamp validation (30-minute tolerance)
- Admin endpoints protected by role-based access control
- Idempotent upsert prevents duplicate data issues

## Recent Changes

### November 11, 2025 - Admin Dashboard for ElevenLabs Analytics
1. **Database Schema**: Added `conversations` table to store webhook data
   - Stores full transcripts, analysis, metadata from ElevenLabs
   - Supports filtering by date, user, agent, duration, and cost
2. **Webhook Handler**: Secure endpoint for ElevenLabs post-call webhooks
   - HMAC signature validation
   - Idempotent upsert to handle duplicate deliveries
   - Stores complete conversation data
3. **Admin Dashboard**: Comprehensive analytics interface (admin-only)
   - Overview statistics cards
   - Advanced filtering (date range, cost, duration, search)
   - Sortable data table
   - Conversation detail view with full transcripts
   - CSV and JSON download for reporting
4. **API Endpoints**: Admin-only endpoints for querying conversation data
   - GET `/api/admin/conversations` - Filtered conversation list
   - GET `/api/admin/stats` - Aggregate statistics
   - GET `/api/admin/conversations/:id` - Single conversation details

### November 11, 2025 - Code Cleanup (Learning Features Removed)
1. **Removed Learning Functionality**: Cleaned up all learning-related features
   - Deleted flashcard system (AI generation and manual creation)
   - Removed learning sessions tracking
   - Removed progress tracking and gamification
   - Removed pronunciation checking
   - Deleted student dashboard and all progress components
2. **Database Schema Simplified**: Only users and conversations tables remain
3. **API Routes Cleaned**: Only authentication, admin, and ElevenLabs endpoints remain
4. **Codebase Optimization**: Removed unused OpenAI integration code

### November 11, 2025 - Audio Quality & Playback Fix
1. **Fixed Chipmunk Voice Issue**: Resolved sample rate mismatch
2. **Removed Audio Hallucinations**: Fixed microphone feedback
3. **Agent Settings Respect**: Uses exact ElevenLabs agent configuration

### November 11, 2025 - Minimal Demo Page
1. **Simplified Demo Interface**: Clean black background with centered microphone
2. **Video Fade-In Effect**: YouTube video background on conversation start
3. **ElevenLabs Integration**: WebSocket API for real-time voice conversation
4. **Status Indicators**: Clear connection state feedback

## Features
- Dark theme only (permanent dark mode for consistent aesthetic)
- Responsive design with Tailwind CSS
- Analytics integration
- Toast notifications
- Form handling with React Hook Form
- Data fetching with TanStack Query
- Supabase authentication
- Role-based access control for different user types
- Click-only navigation dropdowns for better user control
- ElevenLabs Conversational AI for voice-first learning experiences
- Comprehensive admin analytics with filtering and export capabilities
