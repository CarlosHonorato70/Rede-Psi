require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Function to start the server
async function startServer() {
  try {
    let mongoUri;
    
    // Check if MONGODB_URI is provided in environment
    if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'coloque_sua_string_do_mongodb_atlas_aqui') {
      mongoUri = process.env.MONGODB_URI;
      console.log('Using MongoDB URI from environment variables');
    } else {
      // Use MongoDB Memory Server for development
      console.log('Starting MongoDB Memory Server for development...');
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      console.log('MongoDB Memory Server started successfully');
      console.log('Note: Data will not persist after server restart');
    }

    // Database connection
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB successfully');

    // Handle MongoDB connection events
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB error:', error);
    });

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/posts', postRoutes);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'ok', message: 'Server is running' });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
      console.log(`API endpoints:`);
      console.log(`  - POST http://localhost:${PORT}/api/users/register`);
      console.log(`  - POST http://localhost:${PORT}/api/users/login`);
      console.log(`  - GET  http://localhost:${PORT}/api/posts`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
