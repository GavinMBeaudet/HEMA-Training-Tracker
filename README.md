# HEMA Tracker

HEMA Tracker is a web application for tracking Historical European Martial Arts (HEMA) training sessions. Built with React and Vite, it allows users to log, view, and manage their training sessions, including details like weapon type, training focus, intensity, and notes.

## Features
- User authentication (login/register)
- Dashboard with training stats (total sessions, hours trained, average intensity)
- Add, edit, and delete training sessions
- Track session details: title, date, duration, weapon type, training type, intensity, focus areas, and notes
- Responsive, modern UI with card-based session display

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:KingVitaman/HEMA-tracker.git
   cd HEMA-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The app will be available at [http://localhost:5173]

### Mock API Setup
- The app uses a mock API with a `database.json` file in the `api/` directory.
- You can use [json-server](https://github.com/typicode/json-server) to serve this file:
  ```bash
  npm install -g json-server
  json-server --watch api/database.json --port 8088
  ```
- The frontend expects the API at `http://localhost:8088`.

## Project Structure
```
HEMA-tracker/
  ├── api/                # Mock database (JSON)
  ├── src/
  │   ├── components/     # React components (auth, dashboard, nav, sessions)
  │   ├── services/       # API service modules
  │   ├── App.jsx         # Main app component
  ├── package.json
  └── README.md
```

## Customization & Styling
- Styles are organized by component (e.g., `Session.css`, `Dashboard.css`).
- The app uses CSS modules for scoped, maintainable styles.
- Button and card styles are consistent across the app for a modern look.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
