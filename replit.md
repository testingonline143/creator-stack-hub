# CreatorStack - Digital Creator Profile Platform

## Overview

CreatorStack is a full-stack web application that allows creators to showcase their digital products (courses, templates, tools) through professional profiles. The platform features a React frontend with shadcn/ui components, Express.js backend, and PostgreSQL database using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM for client-side navigation
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot reload with Vite middleware integration

### Database Design
- **Primary Database**: PostgreSQL 16 (Active)
- **ORM**: Drizzle ORM for type-safe database operations
- **Migration System**: Drizzle Kit for schema migrations
- **Current Schema**: Users table with basic authentication fields
- **Storage Implementation**: DatabaseStorage class using PostgreSQL backend
- **Connection**: Neon serverless PostgreSQL with connection pooling

## Key Components

### User Interface Components
- **Navigation**: Responsive navigation with route-based highlighting
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Comprehensive shadcn/ui component library including buttons, cards, dialogs, sheets, and form controls
- **Pages**: Landing page, dashboard, creator profiles, explore page, and admin interface

### Backend Services
- **Route Registration**: Centralized route management system
- **Storage Interface**: Abstracted storage layer for CRUD operations
- **Memory Storage**: In-memory storage implementation for development
- **Error Handling**: Centralized error handling middleware
- **Logging**: Request/response logging with duration tracking

### Development Tools
- **Hot Reload**: Vite integration for development server
- **TypeScript**: Full type safety across frontend and backend
- **Path Aliases**: Configured path mapping for clean imports
- **Code Quality**: ESM modules with strict TypeScript configuration

## Data Flow

1. **Frontend Requests**: React components make API calls using TanStack Query
2. **Backend Processing**: Express routes handle requests and interact with storage layer
3. **Database Operations**: Drizzle ORM manages database interactions with type safety
4. **Response Handling**: Structured JSON responses with error handling
5. **State Updates**: TanStack Query manages cache invalidation and UI updates

## External Dependencies

### Core Technologies
- **Database**: Neon PostgreSQL serverless database
- **UI Framework**: Radix UI primitives for accessible components
- **Authentication**: Session-based authentication with PostgreSQL store
- **Deployment**: Replit with autoscale deployment target

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **Code Quality**: TypeScript strict mode, ESLint configuration
- **Styling**: PostCSS, Autoprefixer, Tailwind CSS
- **Development**: tsx for TypeScript execution, hot reload capabilities

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20, PostgreSQL 16 modules
- **Port Configuration**: Application runs on port 5000, exposed on port 80
- **Hot Reload**: Automatic restart on file changes during development
- **Database**: Provisioned PostgreSQL instance with connection pooling

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Process Management**: Single Node.js process serving both API and static files
- **Environment**: Production environment variables for database connection

### Database Management
- **Migrations**: Drizzle Kit handles schema migrations
- **Environment**: DATABASE_URL required for all database operations
- **Connection**: Neon serverless PostgreSQL with connection pooling
- **Development**: Memory storage fallback for rapid prototyping

## Changelog
- June 15, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.