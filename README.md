# Joy Plaste Factory Website

## Project Overview

This is a full-stack web application for a Plastic Home Equipment Factory, built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application provides a comprehensive platform for showcasing and managing plastic home equipment products.

## Features

- **Product Catalog**: Display a wide range of plastic home equipment
- **Category Filtering**: Easy navigation through product categories
- **Responsive Design**: Mobile-friendly user interface
- **Backend API**: RESTful endpoints for product management
- **Database Integration**: MongoDB for storing product information

## Technology Stack

- **Frontend**:

  - React.js
  - Tailwind CSS
  - Axios for API requests

- **Backend**:

  - Node.js
  - Express.js
  - Mongoose (MongoDB ODM)

- **Database**:
  - MongoDB

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16+ recommended)
- npm (v8+)
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tarekhdeen/Joy-Plaste.git
   cd Joy-Plaste
   ```

2. Install backend dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

## Running the Application

1. Start the backend server:

   ```bash
   cd server
   npm start
   ```

2. In a separate terminal, start the frontend:

   ```bash
   cd client
   npm start
   ```

3. The application will be available at `http://localhost:3000`

## Project Structure

```
Joy-Plaste/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│
├── server/                 # Node.js backend
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

## API Endpoints

- `GET /api/products`: Retrieve all products
- `POST /api/products`: Add a new product
- `GET /api/products/:id`: Retrieve a specific product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Upcoming Features

- User Authentication
- Shopping Cart Functionality
- Advanced Product Search
- Admin Dashboard for Product Management

## Deployment

### Frontend Deployment

- Build the React app: `npm run build`
- Deploy to platforms like Netlify, Vercel, or AWS Amplify

### Backend Deployment

- Deploy to platforms like Heroku, AWS, or DigitalOcean
- Ensure MongoDB connection is configured for production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Tarek Hosameldeen - tarekhdeen@gmail.com

Project Link: [https://github.com/tarekhdeen/Joy-Plaste.git](https://github.com/tarekhdeen/Joy-Plaste.git)
