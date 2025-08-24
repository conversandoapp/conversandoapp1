# Reflection Card Game

## Overview

This is a full-stack web application that presents users with thoughtful reflection questions in an interactive card game format. The application features a code-based access system integrated with Google Sheets for validation, and provides an engaging interface for personal reflection and self-discovery.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (TanStack) for server state and React hooks for local state
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **External Integration**: Google Sheets API for code validation
- **Session Management**: Local storage for client-side session persistence

## Key Components

### Authentication & Access Control
- Code-based access system instead of traditional user authentication
- Google Sheets integration validates access codes against a spreadsheet
- Session storage maintains access state for 24 hours
- Codes have creation and expiration dates tracked in the sheet

### Reflection Card System
- Interactive card interface with flip animations
- Question categories (Personal Growth, Wisdom, Passion, etc.)
- Shuffled question presentation to maintain engagement
- Favorites system for marking preferred questions
- Smooth animations and transitions for better UX

### Database Schema
- Users table with basic user information (id, username, password)
- Code validation schema for request/response typing
- Drizzle ORM provides type-safe database operations

## Data Flow

1. **Initial Access**: User enters access code on welcome screen
2. **Code Validation**: Code is validated against Google Sheets via API
3. **Session Creation**: Valid access creates local session storage entry
4. **Game Access**: User can access reflection card game interface
5. **Card Interaction**: Questions are shuffled and presented with smooth animations
6. **State Persistence**: Favorites and preferences stored locally

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Data Fetching**: TanStack React Query
- **Database**: Drizzle ORM, Neon Database driver
- **External APIs**: Google APIs for Sheets integration
- **Development**: Vite, TypeScript, ESBuild

### Styling & Design
- Tailwind CSS for utility-first styling
- CSS variables for consistent theming
- PostCSS for CSS processing
- shadcn/ui design system

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React application to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations manage schema changes

### Environment Configuration
- PostgreSQL database URL required via `DATABASE_URL`
- Google Sheets API credentials via environment variables
- Production/development environment detection

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Push database schema changes

## Changelog
- July 02, 2025. Initial setup
- July 16, 2025. Added custom background image to game and welcome pages

## User Preferences

Preferred communication style: Simple, everyday language.