# Bakame AI - Project Documentation

## Overview
Bakame AI is a voice-AI platform for offline education programs, delivering AI-powered learning tools for remote schools in Africa. This landing page showcases the platform and provides a live conversational AI demo via ElevenLabs widget.

## User Preferences
I prefer detailed explanations and comprehensive documentation. I also prefer an iterative development approach where I can provide feedback often. Please ask before making major architectural changes or introducing new dependencies.

## System Architecture (Simplified - November 2025)
The project is now a streamlined static React application built with Vite. This is a landing page only, with no backend, database, or authentication system.

**Tech Stack:**
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM (Index + NotFound pages only)
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Components**: Minimal Radix UI primitives (toast, tooltip, slot)
- **Icons**: Lucide React
- **AI Integration**: ElevenLabs Conversational AI widget (client-side only)

**Key Architectural Decisions:**
- **Static-First**: Pure frontend application, no server-side logic
- **Minimal Dependencies**: Reduced from 83+ to 12 essential packages
- **Clean Codebase**: Removed all unused pages, components, and integrations
- **Simple Routing**: Only Index (landing page) and NotFound routes
- **Client-Side AI**: ElevenLabs widget loaded dynamically via script tag

## External Dependencies
- **ElevenLabs**: Conversational AI widget for live voice demos (client-side integration via CDN script)

## Recent Changes (November 18, 2025)
- **Major Codebase Cleanup**: Removed all unused code, pages, and integrations
  - Deleted 15+ unused pages (About, Team, Contact, Admin Dashboard, etc.)
  - Removed authentication system (Supabase Auth)
  - Removed backend API and server infrastructure
  - Removed database integrations (Drizzle ORM, PostgreSQL)
  - Removed OpenAI integration
  - Removed analytics and admin dashboard
  - Removed unused components, hooks, and utilities
- **Dependency Optimization**: Reduced from 83+ dependencies to 12 essential packages
- **Simplified Architecture**: Now a pure static landing page with ElevenLabs widget
- **Clean Workflows**: Removed Backend Server and ElevenLabs Sync workflows, kept only "Start application" for Vite dev server