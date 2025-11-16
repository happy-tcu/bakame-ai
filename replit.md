# Bakame AI - Project Documentation

## Overview
Bakame AI is an AI-powered English learning platform for schools, offering voice-first learning experiences and in-depth conversation analytics. The platform aims to provide comprehensive tools for educators and administrators to monitor and improve student language proficiency through AI-driven insights. It leverages a modern web stack to deliver a scalable and robust solution.

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
- **OpenAI GPT-5**: Used for advanced AI analysis of conversation transcripts to determine CEFR levels, topic complexity, quality scores, and key insights.