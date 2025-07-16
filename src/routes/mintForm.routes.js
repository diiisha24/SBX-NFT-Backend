// src/routes/mintForm.routes.js
// This file defines the API routes for mint form operations.
const express = require('express');
const MintFormController = require('../controllers/mintForm.controller'); // Adjust path
const { auth } = require('express-oauth2-jwt-bearer');

const router = express.Router();

// Auth0 JWT Validation Middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

// Apply JWT validation to all mint form routes
router.use(checkJwt);

// Define CRUD routes
router.post('/', MintFormController.createMintForm); // Create
router.get('/', MintFormController.getMintForms);     // Read all for user
router.get('/:id', MintFormController.getMintFormById); // Read single by ID
router.put('/:id', MintFormController.updateMintForm); // Update
router.delete('/:id', MintFormController.deleteMintForm); // Delete

module.exports = router;
