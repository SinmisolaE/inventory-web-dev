# Inventory Management System

A full-stack inventory management web application built with Angular and Node.js/Express. This system provides comprehensive inventory tracking, sales management, and user role-based access control.

## 📋 Features

### Core Functionality
- **Stock Management**: Track products with codes, models, quantities, and pricing
- **Sales Management**: Record and monitor sales transactions with customer information
- **User Management**: Multi-role user system with authentication and authorization
- **Dashboard**: Real-time overview of inventory and sales metrics
- **Authentication**: Secure JWT-based authentication system
- **Role-Based Access Control**: Three user roles (Admin, Stocker, Seller)

### User Roles
- **Admin**: Full system access including user management
- **Stocker**: Manage inventory and stock levels
- **Seller**: Process sales and view stock information

## 🏗️ Tech Stack

### Frontend
- **Framework**: Angular 20.3.0
- **UI Library**: Bootstrap 5.3.8
- **Language**: TypeScript 5.9.2
- **Build Tool**: Angular CLI

### Backend
- **Runtime**: Node.js with Express 5.2.1
- **Database**: MongoDB with Mongoose 9.1.1
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: bcrypt 6.0.0
- **Environment Management**: dotenv 17.2.3

## 📁 Project Structure

```
inventory-web-dev/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── controllers/              # Business logic controllers
│   │   ├── authController.js
│   │   ├── saleController.js
│   │   ├── stockController.js
│   │   └── userController.js
│   ├── middleware/               # Authentication & authorization
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/                   # MongoDB schemas
│   │   ├── Customer.js
│   │   ├── Sale.js
│   │   ├── Stock.js
│   │   └── User.js
│   ├── routes/                   # API route definitions
│   │   ├── authRoute.js
│   │   ├── saleRoute.js
│   │   ├── stockRoute.js
│   │   └── userRoute.js
│   └── utils/
└── frontend/inventory/
    ├── src/
    │   ├── app/
    │   │   ├── components/       # UI components
    │   │   │   ├── auth/
    │   │   │   ├── sales/
    │   │   │   ├── stocks/
    │   │   │   ├── users/
    │   │   │   └── layout/
    │   │   ├── services/         # API services
    │   │   ├── guards/           # Route guards
    │   │   ├── interceptors/     # HTTP interceptors
    │   │   ├── models/           # TypeScript interfaces
    │   │   └── environments/     # Environment configs
    │   └── index.html
    └── angular.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=mongodb_connection_string
JWT_SECRET=jwt_secret_key
JWT_EXPIRES_IN=7d
```

4. Generate secrets (optional):
```bash
chmod +x utils/generate_secrects.sh
./utils/generate_secrects.sh
```

5. Start the backend server:
```bash
node server.js
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/inventory
```

2. Install dependencies:
```bash
npm install
```

3. Update the environment configuration in [src/app/environments/environment.ts](frontend/inventory/src/app/environments/environment.ts):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

4. Start the development server:
```bash
npm start
```

The frontend application will run on `http://localhost:4200`

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration (admin only)
- `PUT /auth/password` - Update password

### Stocks
- `GET /stocks` - Get all stocks
- `GET /stocks/:id` - Get single stock
- `POST /stocks` - Create new stock (stocker/admin)
- `PUT /stocks/:id` - Update stock (stocker/admin)
- `DELETE /stocks/:id` - Delete stock (admin)

### Sales
- `GET /sales` - Get all sales
- `GET /sales/:id` - Get single sale
- `POST /sales` - Create new sale (seller/admin)
- `GET /sales/report` - Sales reports (admin)

### Users
- `GET /users` - Get all users (admin)
- `GET /users/:id` - Get single user (admin)
- `PUT /users/:id` - Update user (admin)
- `DELETE /users/:id` - Delete user (admin)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control middleware
- HTTP-only cookies support
- CORS configuration
- Request size limits (50mb)

## 🧪 Testing

### Frontend Tests
```bash
cd frontend/inventory
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

## 📦 Build & Deployment

### Frontend Production Build
```bash
cd frontend/inventory
npm run build
```

Build artifacts will be in the `dist/` directory.

### Backend Deployment
Ensure all environment variables are set in your production environment and start the server:
```bash
node server.js
```

### Netlify Deployment
The frontend includes a [netlify.toml](frontend/inventory/netlify.toml) configuration for easy deployment to Netlify.

## 🛠️ Development

### Code Formatting
The project uses Prettier for code formatting with the following configuration:
- Print width: 100 characters
- Single quotes
- Angular HTML parser

### Development Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run tests

## 📝 Models

### User
- username (unique)
- hashedPassword
- role (admin/stocker/seller)

### Stock
- code (unique)
- name
- model
- initialAmount
- currentAmount
- unitCostPrice
- unitSellPrice

### Sale
- product (ref: Stock)
- user (ref: User)
- customer (ref: Customer)
- quantity
- unitSellPrice
- totalSaleAmount
- saleDate

### Customer
- Customer information for sales tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, please open an issue in the repository or contact the development team.

---

