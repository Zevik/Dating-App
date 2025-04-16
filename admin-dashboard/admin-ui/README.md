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
# Install backend dependencies
npm install

# Install admin dashboard dependencies
cd admin-ui
npm install
```

### Running the Application

To start the development server:

```bash
# Inside admin-ui directory
npm run dev
```

This will start the application in development mode at http://localhost:5173.

For the backend server:

```bash
# In the root directory
npm run dev
```

### Default Admin User

The default admin credentials are:
- Email: admin@example.com
- Password: 123456

You can create admin users through the database or using the seed script.

### Building for Production

To build the application for production:

```bash
npm run build
```

The build output will be in the `admin-ui/dist` directory.

## Configuration

The backend API URL can be configured in `admin-ui/src/lib/api.ts`. 

### Environment Variables

The following environment variables are required for the backend:

```
# Database connection
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/dating_app

# Redis connection
REDIS_URL=redis://localhost:6379

# JWT secret for authentication
JWT_SECRET=your-secure-secret-key

# S3 storage configuration
S3_BUCKET=match-app-media
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_ENDPOINT=http://localhost:9000

# WebRTC TURN server
TURN_SECRET=your_turn_secret
TURN_URL=turn:your-turn-server.com:3478

# Application settings
NODE_ENV=development
PORT=3000
```

Copy the `example.env` file to `.env` and update the values as needed.

## Authentication 

The admin dashboard uses JWT authentication. When you log in, a token is stored in your browser's localStorage and used for subsequent API requests.

## Troubleshooting

If you encounter CORS issues:
- Ensure the backend has CORS enabled for the admin dashboard origin
- Check that the API URL is correctly configured

If login fails:
- Verify the admin user exists in the database
- Check the backend logs for authentication errors
