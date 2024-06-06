# Business Management API

This is a RESTful API for managing a small business, built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- CRUD operations for businesses and products
- JWT-based authentication
- Middleware for protecting routes
- Global error handling
- Environment variables support
- Logging with log4js
- Unit tests with Jest and Supertest

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/business-management.git
    cd business-management
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and add the following variables:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/business_management
    JWT_SECRET=your_jwt_secret
    LOG_LEVEL=info
    ```

4. Start the server:

    ```bash
    npm start
    ```

5. Run tests:

    ```bash
    npm test
    ```

## Endpoints

### Auth

- `POST /api/auth/signup` - Sign up a new user
- `POST /api/auth/login` - Log in an existing user

### Business

- `POST /api/business` - Create a new business (Admin only)
- `PUT /api/business/:id` - Update an existing business (Admin only)
- `DELETE /api/business/:id` - Delete a business (Admin only)

### Products

- `POST /api/products` - Create a new product (Admin only)
- `PUT /api/products/:id` - Update an existing product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)

## License

This project is licensed under the MIT License.
