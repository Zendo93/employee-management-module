# Employee Management Module

## Backend Setup (Laravel)
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
    ```bash
    composer install
    ```
4. Set up environment variables:
    ```bash
    cp .env.example .env
    ```
    Configure your database credentials in `.env`.
5. Run migrations:
    ```bash
    php artisan migrate
    ```
6. Serve the application:
    ```bash
    php artisan serve
    ```

## Frontend Setup (Vue.js)
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the development server:
    ```bash
    npm run dev
    ```

## Running Tests
### Laravel
- Run backend tests:
    ```bash
    php artisan test
    ```

### Vue.js
- Run frontend tests:
    ```bash
    npm run test:unit
    ```

## API Endpoints
- GET /api/employees - List employees with pagination
- POST /api/employees - Add a new employee
- GET /api/employees/{id} - Get employee details
- PUT /api/employees/{id} - Update employee details
- DELETE /api/employees/{id} - Delete an employee