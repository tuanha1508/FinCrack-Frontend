## Authentication Setup

The application uses token-based authentication with a backend API. Authentication flow has been set up to redirect to a backend server for processing:

1. Frontend sends authentication requests to backend API endpoints
2. Backend validates credentials and returns tokens/user data
3. Frontend stores tokens in localStorage and attaches them to subsequent requests

### Backend Authentication Endpoints

The frontend is configured to work with the following backend API endpoints (assuming the backend runs on `http://localhost:3000`):

- **POST /api/auth/login** - Login with email and password
- **POST /api/auth/register** - Register a new user
- **POST /api/auth/oauth/:provider** - OAuth authentication (Google, GitHub, etc.)
- **POST /api/auth/logout** - User logout
- **POST /api/auth/forgot-password** - Request password reset
- **POST /api/auth/reset-password** - Reset password with token
- **GET /api/auth/profile** - Get current user profile

### Environment Configuration

Create a `.env` file in the frontend directory with the following variables:

```
NUXT_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
NUXT_FINNHUB_API_KEY=your_finnhub_api_key
NUXT_API_BASE_URL=http://localhost:3000/api
```

### Setting Up the Backend

The backend implementation will be created separately. It should implement the endpoints listed above and use JWT for authentication.

For development, you can use a mock backend server or set up a full backend implementation with Node.js and Express. 