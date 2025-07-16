// src/controllers/mintForm.controller.js
// This file contains the business logic for handling mint form requests.
const MintFormModel = require('../models/mintForm.model'); // Adjust path

const MintFormController = {
  /**
   * Handles the creation of a new mint form entry.
   * Extracts data from request body and user ID from JWT, then calls the model.
   */
  createMintForm: async (req, res) => {
    const userId = req.auth.payload.sub; // Auth0 user ID
    const {
      amount,
      owner,
      royalty,
      metadata,
      originalContentUrl,
      largePreviewUrl,
      smallPreviewUrl
    } = req.body;

    // Destructure metadata
    const {
      name,
      category,
      disease,
      country,
      region,
      description,
      unlockable_content_claim_type,
      unlockable_content_description,
      unlockable_content_preview_text,
      resale_allowed
    } = metadata;

    try {
      const newMintForm = await MintFormModel.create({
        userId,
        amount,
        owner,
        royalty,
        name,
        category,
        disease,
        country,
        region,
        description,
        unlockable_content_claim_type,
        unlockable_content_description,
        unlockable_content_preview_text,
        resale_allowed,
        original_content_url: originalContentUrl,
        large_preview_url: largePreviewUrl,
        small_preview_url: smallPreviewUrl
      });
      res.status(201).json(newMintForm);
    } catch (error) {
      console.error('Error in createMintForm controller:', error);
      res.status(500).json({ message: 'Failed to create mint form entry', error: error.message });
    }
  },

  /**
   * Handles fetching all mint form entries for the authenticated user.
   */
  getMintForms: async (req, res) => {
    const userId = req.auth.payload.sub; // Auth0 user ID

    try {
      const mintForms = await MintFormModel.findByUserId(userId);
      res.status(200).json(mintForms);
    } catch (error) {
      console.error('Error in getMintForms controller:', error);
      res.status(500).json({ message: 'Failed to fetch mint form entries', error: error.message });
    }
  },

  /**
   * Handles fetching a single mint form entry by ID.
   */
  getMintFormById: async (req, res) => {
    const userId = req.auth.payload.sub; // Auth0 user ID
    const { id } = req.params;

    try {
      const mintForm = await MintFormModel.findByIdAndUserId(id, userId);
      if (!mintForm) {
        return res.status(404).json({ message: 'Mint form entry not found or not authorized' });
      }
      res.status(200).json(mintForm);
    } catch (error) {
      console.error('Error in getMintFormById controller:', error);
      res.status(500).json({ message: 'Failed to fetch mint form entry', error: error.message });
    }
  },

  /**
   * Handles updating an existing mint form entry.
   */
  updateMintForm: async (req, res) => {
    const userId = req.auth.payload.sub; // Auth0 user ID
    const { id } = req.params;
    const {
      amount,
      owner,
      royalty,
      metadata,
      originalContentUrl,
      largePreviewUrl,
      smallPreviewUrl
    } = req.body;

    // Destructure metadata
    const {
      name,
      category,
      disease,
      country,
      region,
      description,
      unlockable_content_claim_type,
      unlockable_content_description,
      unlockable_content_preview_text,
      resale_allowed
    } = metadata;

    try {
      const updatedMintForm = await MintFormModel.update(id, userId, {
        amount,
        owner,
        royalty,
        name,
        category,
        disease,
        country,
        region,
        description,
        unlockable_content_claim_type,
        unlockable_content_description,
        unlockable_content_preview_text,
        resale_allowed,
        original_content_url: originalContentUrl,
        large_preview_url: largePreviewUrl,
        small_preview_url: smallPreviewUrl
      });

      if (!updatedMintForm) {
        return res.status(404).json({ message: 'Mint form entry not found or not authorized to update' });
      }
      res.status(200).json(updatedMintForm);
    } catch (error) {
      console.error('Error in updateMintForm controller:', error);
      res.status(500).json({ message: 'Failed to update mint form entry', error: error.message });
    }
  },

  /**
   * Handles deleting a mint form entry.
   */
  deleteMintForm: async (req, res) => {
    const userId = req.auth.payload.sub; // Auth0 user ID
    const { id } = req.params;

    try {
      const deleted = await MintFormModel.delete(id, userId);
      if (!deleted) {
        return res.status(404).json({ message: 'Mint form entry not found or not authorized to delete' });
      }
      res.status(204).send(); // 204 No Content for successful deletion
    } catch (error) {
      console.error('Error in deleteMintForm controller:', error);
      res.status(500).json({ message: 'Failed to delete mint form entry', error: error.message });
    }
  }
};

module.exports = MintFormController;