# OneMatch Admin Dashboard

This is the admin dashboard for the OneMatch Dating App. It provides a web-based interface for administrators to monitor system statistics and manage user reports.

## Features

- **Login** - Secure access for administrators
- **Dashboard** - View system statistics including:
  - Total users
  - Active users
  - Total matches
  - Total reports
  - Reports by status
  - Recent user and report activity
- **Reports Management** - View and update the status of user reports

## Technology Stack

- React.js (with TypeScript)
- Tailwind CSS
- React Router
- Axios for API calls

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (version 8 or higher)
- Running backend API (on http://localhost:3000 by default)

### Installation

1. Clone the repository
2. Navigate to the admin-dashboard directory
3. Install dependencies:

```bash
npm install
cd admin-ui
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

This will start the application in development mode at http://localhost:5173.

### Building for Production

To build the application for production:

```bash
npm run build
```

The build output will be in the `admin-ui/dist` directory.

## Configuration

The backend API URL can be configured in `admin-ui/src/lib/api.ts`. 