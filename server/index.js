const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healthRoutes');
const doshaRoutes = require('./routes/doshaRoutes');
const practitionerRoutes = require('./routes/practitionerRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/dosha', doshaRoutes);
app.use('/api/practitioners', practitionerRoutes);

// Base route for API health check
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Ayurvedic Health Assistant API' });
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;