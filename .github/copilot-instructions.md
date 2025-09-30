# HEMA Tracker - AI Coding Instructions

## Project Overview
HEMA Tracker is a React + Vite application for tracking Historical European Martial Arts training sessions. It uses a mock JSON database served via json-server on port 8088.

## Architecture & Data Flow

### Core Components Structure
- **App.jsx**: Root router with conditional NavBar rendering based on `localStorage.getItem("HEMA_user")`
- **Services**: All API calls in `src/services/` return fetch promises (no error handling pattern established)
- **Authentication**: User state stored in localStorage as `HEMA_user` with `{id, isStaff}` structure

### Database Schema Pattern
The `api/database.json` follows a relational pattern with:
- `trainingSessions` as the main entity with `userId`, `weaponTypeId`, `trainingTypeId` foreign keys  
- `focusAreas` array field contains IDs that reference `trainingFocuses.id`
- Many-to-many relationships handled client-side (e.g., session focus areas)

## Development Workflow

### Local Setup Commands
```bash
npm run dev                    # Start Vite dev server (port 5173)
json-server --watch api/database.json --port 8088  # Start mock API
npm run lint                   # ESLint with React hooks + refresh plugins
```

### Key Service Patterns
All services in `src/services/` use direct fetch calls to `localhost:8088`:
- User filtering by current user: `sessions.filter(session => session.userId === userId)`
- Data relationships resolved client-side using `find()` methods
- No centralized error handling - services return raw promises

## Code Conventions

### Component Patterns
- **Exported as named exports**: `export const ComponentName = () => {}`  
- **Props passed down**: Authentication state managed via `setIsLoggedIn` prop drilling
- **useEffect dependencies**: Always include state dependencies in dependency arrays
- **Form handling**: Controlled components with individual useState for each field

### State Management
- **User session**: Always check `JSON.parse(localStorage.getItem("HEMA_user"))` for auth
- **Data fetching**: Use separate useEffect for each API call, set loading states
- **Filtering**: Client-side filtering with useEffect watching filter dependencies

### Styling Approach
- Component-specific CSS files: `ComponentName.css` alongside `ComponentName.jsx`
- CSS classes follow kebab-case: `.session-card`, `.new-session-btn`
- Card-based UI pattern for displaying sessions and stats

## Integration Points

### Mock API Expectations
- **Base URL**: `http://localhost:8088` hardcoded in all services
- **RESTful endpoints**: `/users`, `/trainingSessions`, `/weaponTypes`, etc.
- **Data format**: All API responses expect arrays or single objects (json-server format)

### Navigation Patterns  
- **React Router**: All navigation via `useNavigate()` hook
- **Route structure**: Nested routes with conditional NavBar in root layout
- **Authentication guard**: Routes render based on `isLoggedIn` state, no route protection

### Current Limitations
- No error boundaries or global error handling
- Authentication is purely client-side (localStorage only)  
- All data fetched on component mount (no caching or optimization)
- Form validation is minimal (mostly HTML5 required attributes)

## File Organization
- `/src/components/` organized by feature: `auth/`, `dashboard/`, `nav/`, `sessions/`
- Services separated by domain: `userService.jsx`, `userSessions.jsx`
- CSS files colocated with components, no global styling system