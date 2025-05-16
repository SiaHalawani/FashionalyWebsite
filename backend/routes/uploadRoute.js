const express = require('express');
const multer = require('multer');
const fs = require('fs');
const ImageKit = require('imagekit');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// === Initialize ImageKit SDK ===
const imagekit = new ImageKit({
  publicKey: "public_Kjb5vZlqNytvIKSiKgagHlAETaE=",
  privateKey: "private_Hj8Ve5WEB5Y6rGhsM0ihgHCufU4=",
  urlEndpoint: "https://ik.imagekit.io/s2vgc738p3"
});

router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;

  // Log file metadata
  console.log('📦 Received file:', file);

  try {
    // Read buffer from temporary upload
    const fileBuffer = fs.readFileSync(file.path);

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: fileBuffer,
      fileName: file.originalname,
      useUniqueFileName: true,
    });

    // Log success response
    console.log('✅ ImageKit response:', result);

    // Clean up local temp file
    fs.unlinkSync(file.path);

    // Return ImageKit URL
    res.json({ imageURL: result.url });
  } catch (err) {
    console.error('❌ Upload error:', err.message);

    // Always clean up the temp file if it exists
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    res.status(500).json({ error: 'Upload failed', detail: err.message });
  }
});

module.exports = router;