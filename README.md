# User Dashboard

A React TypeScript application for managing and displaying user information.

## Features

- Fetch and display users from JSONPlaceholder API
- Searchable and sortable user table
- User detail modal with comprehensive information
- Add new user functionality (client-side)
- Responsive design for desktop and mobile
- Accessible components with ARIA attributes

## Tech Stack

- React 18 with TypeScript
- React Router for navigation
- Zustand for state management
- Functional components with hooks
- CSS for styling (no thirdparty UI libraries)

## State Management

This application uses **Zustand** for global state management instead of React Context API. 

**Why Zustand over Context API:**
- **Performance**: Only re-renders components that subscribe to specific state slices
- **Simplicity**: No provider wrapping required, direct store access
- **TypeScript**: Better type inference and less boilerplate
- **DevTools**: Built-in Redux DevTools support for debugging

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/midnightprojects/user-dashboard.git
cd user-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm test -- --coverage` - Runs tests with coverage report
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Testing

This project uses **Jest** and **React Testing Library** for comprehensive testing.

### Test Coverage
- **Form Components**: 100% coverage
- **Utils & Hooks**: 100% coverage for tested files
- **Overall**: 46.75% statements, 50.81% functions

### Running Tests
```bash
npm test                    # Run all tests
npm test -- --coverage     # Run with coverage report
npm test -- --watch        # Run in watch mode
```

## Project Structure

```
src/
├── components/    # Reusable UI components (with co-located CSS Modules)
├── pages/         # Page components (with co-located CSS Modules)
├── hooks/         # Custom React hooks
├── store/         # Zustand stores
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── __tests__/     # Test files
```

## API

This application uses the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) for fetching user data.
