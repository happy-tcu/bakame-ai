# Bakame AI - Project Documentation

## Overview
Bakame AI is the first voice-AI platform for offline programs, delivering education, health, and civic services through basic phone calls powered by AI. Like Duolingo — but for civics, weather, health... and no internet required. We serve 2.7 billion people without internet access, starting with Rwanda and expanding across Africa. The platform leverages AI (Whisper + GPT-4 + TTS) to provide real-time, personalized learning experiences via IVR, with <4s latency for natural conversations.

## User Preferences
I prefer detailed explanations and comprehensive documentation. I also prefer an iterative development approach where I can provide feedback often. Please ask before making major architectural changes or introducing new dependencies.

## System Architecture
The project uses a React frontend with a Vite build tool, an Express backend API with TypeScript, and a PostgreSQL database managed by Drizzle ORM. UI components are built with shadcn/ui and Radix UI primitives, styled using Tailwind CSS with a dark-only theme. Routing is handled by React Router DOM, and state management by TanStack Query. Authentication is provided by Supabase Auth, integrating role-based access control.

Key architectural decisions include:
- **UI/UX**: Consistent dark theme, responsive design, and accessible components using shadcn/ui and Radix UI.
- **Backend**: A modular Express API with clear separation of concerns (middleware, routes, database operations).
- **Database**: PostgreSQL with Drizzle ORM for type-safe schema definition and queries.
- **AI Integration**: Deep integration with ElevenLabs Conversational AI for real-time voice interactions and OpenAI GPT-5 for post-conversation analysis.
- **Deployment**: Configured for Replit's autoscale deployment, serving static frontend assets and dynamic API routes.
- **Admin Dashboard**: Provides comprehensive analytics, including CEFR level distribution, topic complexity, quality scores (grammar, vocabulary, fluency, coherence), and AI-generated key insights, with filtering and export capabilities.

## External Dependencies
- **ElevenLabs**: Conversational AI for voice-first learning experiences, including real-time voice synthesis and post-call webhooks for conversation data.
- **Supabase Auth**: User authentication and authorization services.
- **PostgreSQL**: Relational database for storing user and conversation data.
- **OpenAI GPT-4**: Used for AI-powered adaptive learning and conversation analysis.
- **Twilio/Telco APIs**: IVR infrastructure for offline voice-based program delivery.

## Recent Changes (November 2025)
- **About Page Overhaul**: Completely redesigned About page with specific metrics, leadership team information, company milestones, and strategic priorities based on content audit principles.
- **SEO Improvements**: Updated meta description to be specific and keyword-rich, highlighting key achievements (15K students, 10 schools, $30K invoiced, $20K raised).
- **Team Section**: Added full leadership team (CEO Happy Herman, CTO Aime Byiringiro, Designer Chretien Igiraneza) and advisory board.
- **Traction Metrics**: Prominently displayed real numbers from current operations across Rwanda.
- **Strategic Priorities**: Added concrete, measurable goals (100 schools by Dec 2025, $500K ARR Q4 2025, 30% cost reduction, 3 countries by 2026).
- **Company Timeline**: Added milestone-based journey section from founding through planned 2026 expansion.