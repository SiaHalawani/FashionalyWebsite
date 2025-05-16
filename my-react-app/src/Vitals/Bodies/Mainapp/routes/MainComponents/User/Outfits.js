// FILE: exportOutfit.js

import { createOutfit } from '../../../../../../BackendIntegration/UserData/Editors/EditOutfit';

// Fake fallback image URL (can be changed to your own hosted placeholder)
const FAKE_FALLBACK_IMAGE = "https://via.placeholder.com/400x400.png?text=Outfit+Preview";

/**
 * Programmatically creates an outfit using selected items.
 * @param {string} outfitName - The name of the new outfit.
 * @param {Array} items - Array of full outfit item objects (must include `.id` or `.itemID`).
 * @param {string} [imageUrl] - Optional image URL, fallback used if empty.
 */
export async function exportOutfit(outfitName, items, imageUrl) {
  try {
    const validItems = items.filter(item => item && (item.id || item.itemID));
    const itemIDs = validItems.map(item => item.id || item.itemID);
    const cleanImageUrl = (imageUrl || FAKE_FALLBACK_IMAGE).trim();

    if (itemIDs.length === 0) {
      console.warn('❌ No valid items to export.');
      return;
    }

    const result = await createOutfit(outfitName, cleanImageUrl, itemIDs);
    if (result) {
      console.log('✅ Outfit created successfully:', result);
    } else {
      console.error('❌ Failed to create outfit.');
    }
  } catch (error) {
    console.error('🚨 Error exporting outfit:', error);
  }
}
