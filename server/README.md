# Achariya Debdutta Website Backend

This is the backend server for the Achariya Debdutta website, providing APIs for authentication, payment processing, blog management, and more.

## Features

- User Authentication (Register, Login, Forgot Password, Reset Password)
- Google OAuth Integration
- Shopping Cart Management
- Payment Processing with Razorpay
- Blog Management
- Contact Form
- Email Notifications

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Razorpay Account
- Gmail Account (for sending emails)

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   VITE_APP_PORT=5000
   VITE_MONGO_URL=your_mongodb_connection_string
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   EMAIL_USER=your_gmail_email
   EMAIL_PASS=your_gmail_app_password
   FRONTEND_URL=http://localhost:5173
   ADMIN_EMAIL=admin_email_address
   ```

## Running the Server

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Send password reset email
- `POST /api/auth/reset-password/:token` - Reset password
- `POST /api/auth/google` - Google OAuth login/signup
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/change-password` - Change password (requires authentication)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart
- `GET /api/cart/count` - Get cart item count

### Blog
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:slug` - Get blog by slug
- `POST /api/blogs` - Create new blog (admin only)
- `PUT /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)
- `GET /api/blogs/categories` - Get blog categories
- `GET /api/blogs/tags` - Get blog tags

### Contact
- `POST /api/contact` - Send contact form

### Payment
- `POST /api/payment/checkout` - Create payment order
- `POST /api/payment/verification` - Verify payment
- `GET /api/payment/appointments` - Get all appointments
- `GET /api/payment/payments` - Get all payments

### Product
- `POST /api/products/checkout` - Create product checkout session
- `POST /api/products/verify` - Verify product payment

## License

ISC