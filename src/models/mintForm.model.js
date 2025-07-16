// src/models/mintForm.model.js
// This file contains functions for interacting with the 'mint_forms' table.
const pool = require('../config/db'); // Adjust path if your structure differs

const MintFormModel = {
  /**
   * Creates a new mint form entry in the database.
   * @param {Object} data - The data for the mint form.
   * @param {string} data.userId - The Auth0 user ID.
   * @param {number} data.amount - Number of NFTs.
   * @param {string} data.owner - Blockchain owner address.
   * @param {number} data.royalty - Royalty percentage.
   * @param {string} data.name - Name of the NFT.
   * @param {string} data.category - Category of the NFT.
   * @param {string} data.disease - Disease related to the NFT.
   * @param {string} data.country - Country.
   * @param {string} data.region - Region.
   * @param {string} data.description - Description of the NFT.
   * @param {string} data.unlockable_content_claim_type - Unlockable content claim type.
   * @param {string} data.unlockable_content_description - Unlockable content description.
   * @param {string} data.unlockable_content_preview_text - Unlockable content preview text.
   * @param {boolean} data.resale_allowed - Is resale allowed.
   * @param {string} data.original_content_url - URL for original content image.
   * @param {string} data.large_preview_url - URL for large preview image.
   * @param {string} data.small_preview_url - URL for small preview image.
   * @returns {Promise<Object>} The created mint form entry.
   */
  create: async (data) => {
    const {
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
      original_content_url,
      large_preview_url,
      small_preview_url
    } = data;

    const query = `
      INSERT INTO mint_forms (
        user_id, amount, owner, royalty, name, category, disease, country, region,
        description, unlockable_content_claim_type, unlockable_content_description,
        unlockable_content_preview_text, resale_allowed,
        original_content_url, large_preview_url, small_preview_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *;
    `;
    const values = [
      userId, amount, owner, royalty, name, category, disease, country, region,
      description, unlockable_content_claim_type, unlockable_content_description,
      unlockable_content_preview_text, resale_allowed,
      original_content_url, large_preview_url, small_preview_url
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  /**
   * Retrieves all mint form entries for a specific user.
   * @param {string} userId - The Auth0 user ID.
   * @returns {Promise<Array<Object>>} An array of mint form entries.
   */
  findByUserId: async (userId) => {
    const query = 'SELECT * FROM mint_forms WHERE user_id = $1 ORDER BY created_at DESC;';
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  /**
   * Retrieves a single mint form entry by its ID and user ID.
   * @param {string} id - The ID of the mint form entry.
   * @param {string} userId - The Auth0 user ID.
   * @returns {Promise<Object|null>} The mint form entry or null if not found/authorized.
   */
  findByIdAndUserId: async (id, userId) => {
    const query = 'SELECT * FROM mint_forms WHERE id = $1 AND user_id = $2;';
    const result = await pool.query(query, [id, userId]);
    return result.rows[0] || null;
  },

  /**
   * Updates an existing mint form entry.
   * @param {string} id - The ID of the mint form entry to update.
   * @param {string} userId - The Auth0 user ID to ensure authorization.
   * @param {Object} data - The updated data for the mint form.
   * @returns {Promise<Object|null>} The updated mint form entry or null if not found/authorized.
   */
  update: async (id, userId, data) => {
    const {
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
      original_content_url,
      large_preview_url,
      small_preview_url
    } = data;

    const query = `
      UPDATE mint_forms
      SET
        amount = $1, owner = $2, royalty = $3, name = $4, category = $5, disease = $6,
        country = $7, region = $8, description = $9,
        unlockable_content_claim_type = $10, unlockable_content_description = $11,
        unlockable_content_preview_text = $12, resale_allowed = $13,
        original_content_url = $14, large_preview_url = $15, small_preview_url = $16,
        updated_at = NOW()
      WHERE id = $17 AND user_id = $18
      RETURNING *;
    `;
    const values = [
      amount, owner, royalty, name, category, disease, country, region,
      description, unlockable_content_claim_type, unlockable_content_description,
      unlockable_content_preview_text, resale_allowed,
      original_content_url, large_preview_url, small_preview_url,
      id, userId
    ];

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  /**
   * Deletes a mint form entry by its ID and user ID.
   * @param {string} id - The ID of the mint form entry to delete.
   * @param {string} userId - The Auth0 user ID to ensure authorization.
   * @returns {Promise<boolean>} True if deleted, false if not found/authorized.
   */
  delete: async (id, userId) => {
    const query = 'DELETE FROM mint_forms WHERE id = $1 AND user_id = $2 RETURNING id;';
    const result = await pool.query(query, [id, userId]);
    return result.rows.length > 0;
  }
};

module.exports = MintFormModel;