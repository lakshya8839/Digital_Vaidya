# Body Spot Analyzer - 3D Medical Annotation Tool

## Overview

Body Spot Analyzer is a professional web application for medical and dermatological analysis, enabling users to annotate and label spots on a 3D human body model. The application provides an interactive 3D viewport for placing markers on body regions, with comprehensive management tools for categorizing, documenting, and exporting spot data. Built as a single-page application with a focus on precision, clarity, and medical utility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing

**3D Rendering:**
- React Three Fiber (@react-three/fiber) for declarative 3D scene management using Three.js
- React Three Drei (@react-three/drei) for common 3D helpers (OrbitControls, PerspectiveCamera, Html annotations)
- Three.js types for comprehensive type safety in 3D development

**State Management:**
- Zustand for lightweight global state management (spot data, selection state, UI modes)
- Client-side state stored in `useSpotStore` managing all spot annotations
- No server-side state synchronization currently implemented

**UI Component Library:**
- shadcn/ui components built on Radix UI primitives (28+ components imported)
- Tailwind CSS for utility-first styling with custom design tokens
- Design system follows Material Design principles adapted for medical/technical precision

**Form Management:**
- React Hook Form for performant form handling
- Zod for schema validation via @hookform/resolvers
- Validation schemas defined in shared/schema.ts

**Data Fetching:**
- TanStack Query (React Query) configured but not actively used
- Query client configured with conservative caching (staleTime: Infinity, no refetch on window focus)

### Backend Architecture

**Server Framework:**
- Express.js running on Node.js
- TypeScript throughout the stack
- Development mode uses tsx for TypeScript execution
- Production build uses esbuild for server bundling

**Development Server:**
- Vite middleware integration for hot module replacement
- Custom logging middleware for API request tracking
- Raw body capture for request verification

**API Structure:**
- Routes registered in server/routes.ts (currently minimal implementation)
- All routes prefixed with /api (by design guidelines)
- Storage abstraction interface (IStorage) for future database integration

**Current State:**
- Server routes are placeholder stubs awaiting implementation
- In-memory storage (MemStorage) implements user CRUD operations
- No spot persistence implemented yet (client-side only)

### Data Storage Solutions

**Database Configuration:**
- Drizzle ORM configured for PostgreSQL via @neondatabase/serverless
- Schema defined in shared/schema.ts with two main tables:
  - `users`: Authentication/user management (id, username, password)
  - `spots`: Body spot annotations with 3D position data and metadata
- Migration output directory: ./migrations
- Database connection via DATABASE_URL environment variable

**Schema Design for Spots:**
- UUID primary keys (PostgreSQL gen_random_uuid())
- 3D position coordinates (positionX, positionY, positionZ as real numbers)
- Surface normal vectors (normalX, normalY, normalZ) for marker orientation
- Categorical data: category (Mole, Birthmark, Scar, Rash, Lesion, Freckle, etc.)
- Body region classification (Head, Neck, Chest, Abdomen, Back, Legs, Feet)
- Visual attributes: color (hex codes), label (string)
- Metadata: notes (text), createdAt (timestamp)

**Current Implementation:**
- Database schema fully defined but not actively used
- All spot data managed client-side in Zustand store
- No persistence layer implemented (data lost on page refresh)
- Storage interface abstracted for future database integration

### Authentication and Authorization

**Current State:**
- User schema defined in database (username/password fields)
- No authentication implementation present
- No session management configured (connect-pg-simple imported but unused)
- Application appears to be single-user or public access currently

### Layout and Design Patterns

**Split-View Layout:**
- Left panel (60-65% width): 3D model viewport with interaction canvas
- Right sidebar (35-40% width, fixed 384px): Control panels in tabbed interface
- Top navigation bar: Branding, project actions, theme toggle
- Floating viewport controls: Bottom-left positioned for camera/marker controls

**Component Architecture:**
- Presentational components separated by concern (BodyModel3D, SpotList, SpotForm, ExportPanel)
- Shared UI components from shadcn/ui with consistent styling
- Viewport controls overlaid on 3D canvas with backdrop blur effects

**Interaction Patterns:**
- Click-to-place marker mode (toggled via viewport controls)
- Click on markers to select and edit
- Tabbed sidebar for different workflows (Spots list, Edit form, Export)
- Real-time 3D manipulation via OrbitControls

**Typography System:**
- Primary: Inter or Roboto (Google Fonts)
- Monospace: JetBrains Mono or Roboto Mono for coordinates/JSON
- Scale: 2xl (titles), lg (sections), base (body), sm (data), xs (secondary)

**Spacing System:**
- Tailwind units: 2, 4, 6, 8, 12 for consistent spacing
- Component padding: p-4 to p-6
- Section margins: my-6 to my-8

**Color System:**
- CSS custom properties for theme tokens (HSL color space)
- Support for light and dark modes via CSS class toggle
- Semantic color naming (primary, secondary, destructive, muted, accent)
- Border and outline colors with opacity variations

## External Dependencies

**UI Component Ecosystem:**
- Radix UI: Comprehensive set of accessible, unstyled UI primitives (accordion, dialog, dropdown, popover, select, tabs, toast, tooltip, etc.)
- shadcn/ui: Pre-styled components built on Radix with Tailwind integration
- Lucide React: Icon library for consistent iconography
- class-variance-authority: Type-safe variant management for components
- tailwind-merge & clsx: Utility functions for conditional class merging

**3D Graphics:**
- Three.js: Core WebGL 3D rendering engine
- @react-three/fiber: React renderer for Three.js
- @react-three/drei: Helper components and abstractions for common 3D patterns

**Database & ORM:**
- Neon Serverless PostgreSQL: Serverless PostgreSQL database provider
- Drizzle ORM: Type-safe ORM with schema definition and migrations
- drizzle-zod: Integration for Zod schema generation from Drizzle schemas

**Development Tools:**
- TypeScript: Type safety across entire stack
- Vite: Fast build tool and dev server
- esbuild: Production bundling for server code
- PostCSS & Autoprefixer: CSS processing

**Replit Integration:**
- @replit/vite-plugin-runtime-error-modal: Development error overlay
- @replit/vite-plugin-cartographer: Project exploration tooling
- @replit/vite-plugin-dev-banner: Development mode indicators

**State & Data Management:**
- Zustand: Lightweight state management
- TanStack Query: Server state management (configured but underutilized)
- React Hook Form: Form state and validation
- Zod: Runtime type validation and schema definition

**Utility Libraries:**
- date-fns: Date manipulation and formatting
- nanoid: Unique ID generation
- cmdk: Command palette component

**Font Resources:**
- Google Fonts: Architects Daughter, DM Sans, Fira Code, Geist Mono (loaded via CDN)