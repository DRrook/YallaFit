# YallaFit Backend API

This is the backend API for the YallaFit application, built with Laravel and Laravel Sanctum for API authentication.

## Setup Instructions

1. Install dependencies:
   ```
   composer install
   ```

2. Set up environment variables:
   ```
   cp .env.example .env
   php artisan key:generate
   ```

3. Run migrations:
   ```
   php artisan migrate
   ```

4. Start the development server:
   ```
   php artisan serve
   ```

## API Endpoints

### Public Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Login and get authentication token
- `GET /api/test` - Test API endpoint

### Protected Endpoints (Requires Authentication)

- `GET /api/user` - Get authenticated user information
- `POST /api/logout` - Logout and invalidate token

## Authentication

This API uses Laravel Sanctum for token-based authentication. To authenticate requests, include the token in the Authorization header:

```
Authorization: Bearer {your_token}
```

## CORS Configuration

CORS is configured to allow requests from the following origins:
- http://localhost:3000
- http://localhost:5173

If you need to add more origins, update the `config/cors.php` file.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
