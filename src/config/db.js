const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // Set to true in production if you have proper certificates
  }
});

// Test database connection when the pool is created
pool.on('connect', () => {
  console.log('🎉 Successfully connected to PostgreSQL database!');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1); // Exit process if there's a critical database error
});

module.exports = pool;