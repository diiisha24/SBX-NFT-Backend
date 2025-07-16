// app.js
// This is your main Express application file.
// Save this as 'app.js' in your project root.

require('dotenv').config(); // Load environment variables
const express = require('express');
const mintFormRoutes = require('./src/routes/mintForm.routes'); // Adjust path
const pool = require('./src/config/db'); // Import the pool to ensure connection is established

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Main API route for mint forms
app.use('/api/mint-forms', mintFormRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
