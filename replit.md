# Bakame AI - Project Documentation

## Overview
Bakame AI is the first voice-AI platform for offline programs, delivering education, health, and civic services through basic phone calls powered by AI. Like Duolingo — but for civics, weather, health... and no internet required. We serve 2.7 billion people without internet access, starting with Rwanda and expanding across Africa. The platform leverages AI (Whisper + GPT-4 + TTS) to provide real-time, personalized learning experiences via IVR, with <4s latency for natural conversations.

## User Preferences
I prefer detailed explanations and comprehensive documentation. I also prefer an iterative development approach where I can provide feedback often. Please ask before making major architectural changes or introducing new dependencies.

## System Architecture
The project is a static landing page built with React and Vite. UI components are built with shadcn/ui and Radix UI primitives, styled using Tailwind CSS with a dark-only theme.

Key architectural decisions include:
- **UI/UX**: Consistent dark theme, responsive design, and accessible components using shadcn/ui and Radix UI.
- **Static Site**: Single-page application with no backend, database, or server-side rendering.
- **AI Integration**: Client-side ElevenLabs Conversational AI widget embedded in the landing page for voice interactions.
- **Deployment**: Configured for Replit's static deployment, serving only frontend assets.

## External Dependencies
- **ElevenLabs**: Conversational AI widget embedded in the landing page for voice-first demo experiences.

## Recent Changes (December 2025)
- **Floating Voice Button (December 4, 2025)**: Converted the ElevenLabs widget from an always-visible element to a floating action button:
  - Created FloatingVoiceButton component with phone icon in bottom-right corner
  - Widget is now hidden by default and opens when user clicks the floating button
  - Added tooltip on hover: "Try Bakame AI - No internet needed"
  - Smooth animations for opening/closing widget with backdrop overlay
  - Blue-purple gradient button with pulse animation to attract attention
  - Moved ElevenLabs script loading to the component for better encapsulation

## Recent Changes (November 2025)
- **Static Deployment Configuration (November 18, 2025)**: Configured deployment for static hosting:
  - Set deployment target to "static" (no server needed)
  - Build command: `npm run build` (compiles Vite app)
  - Public directory: `dist` (Vite build output)
  - Removed server dependencies from deployment configuration
- **Transformation to Static Landing Page (November 18, 2025)**: Converted the application from a full-stack system to a pure static landing page:
  - Deleted all backend server files (server/, shared/, db/)
  - Removed AdminDashboard and NotFound pages
  - Eliminated authentication system (auth components and Supabase Auth integration)
  - Removed analytics provider and tracking components
  - Deleted database configuration (Drizzle ORM, PostgreSQL)
  - Removed Backend Server and ElevenLabs Sync workflows
  - Simplified App.tsx to directly render Index component (no routing)
  - Updated Navbar to minimal logo display only
  - Modified EarlyAccessModal to work without backend (UI only)
  - Cleaned up package.json scripts (removed server, sync, and database commands)
  - Result: Lightweight static landing page with ElevenLabs widget integration
- **Major Codebase Cleanup (November 18, 2025)**: Streamlined the application to be as lightweight as possible while preserving all essential functionality:
  - Deleted 18 unused page files (About, Blog, Contact, Team, Features, Roadmap, Press, Support, Privacy, Terms, DemoScheduling, EarlyAccess, GovernmentDemo, GovernmentSolution, EnterpriseSolution, EducationSolution, Pricing, Resources)
  - Removed 6 unused component directories (careers, government, resources, team, bakame, forms)
  - Deleted 6 old replaced logo images from attached_assets
  - Removed 7 unused Supabase functions (ai-chat, bakame-llama-chat, create-session, ivr-chat, realtime-chat, text-to-speech, voice-to-text)
  - Cleaned up all unused imports from Index.tsx (Button, Link, useNavigate, AnimatedCounter, and 20+ unused icons)
  - Removed navigation buttons that were causing 404 errors to deleted pages
- **Features Section Update**: Updated "Features & Integrations" section title to "Tools your students need to gain the command of English Language" with new subtitle
- **Features Content**: Replaced "Voice Clone Learning" feature with "Subject Convos" for personalized AI voice tutoring
- **Trust Indicators**: Replaced all 6 trust indicator logos with new partner images and applied grayscale filter for consistent black and white appearance
- **ES Module Fix**: Converted CommonJS require() to ES import in server/index.ts to resolve deployment errors
- **About Page Overhaul**: Completely redesigned About page with specific metrics, leadership team information, company milestones, and strategic priorities based on content audit principles
- **SEO Improvements**: Updated meta description to be specific and keyword-rich, highlighting key achievements (15K students, 10 schools, $30K invoiced, $20K raised)
- **Team Section**: Added full leadership team (CEO Happy Herman, CTO Aime Byiringiro, Designer Chretien Igiraneza) and advisory board
- **Traction Metrics**: Prominently displayed real numbers from current operations across Rwanda
- **Strategic Priorities**: Added concrete, measurable goals (100 schools by Dec 2025, $500K ARR Q4 2025, 30% cost reduction, 3 countries by 2026)
- **Company Timeline**: Added milestone-based journey section from founding through planned 2026 expansion
- **Features Section Redesign (November 18, 2025)**: Completely revamped the "Features & Integrations" section for better clarity and branding:
  - Changed headline from "Features & Integrations" to "AI-Powered Learning Tools" with gradient styling
  - Fixed grammar in subtitle: changed to "master the English language" from "gain the command of English Language"
  - Expanded all feature descriptions from 3-4 words to detailed 1-2 sentence explanations showing student benefits
  - Replaced bright colored gradient backgrounds (500 shades) with muted colors (700 shades) for a more professional appearance
  - Replaced colored square icon backgrounds with Bakame transparent logo (icon-white.png) for consistent branding
  - Added subtle opacity transitions on logo (30% to 50% on hover) and feature-specific icons
  - Changed grid from 4 columns to 3 columns for better readability and card spacing
  - Removed inaccurate student count claims from meta tags in index.html