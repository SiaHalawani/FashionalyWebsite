const express = require('express');
const router = express.Router();
const controller = require('../controllers/outfitController');
const validator = require('../validators/outfitValidator');
const authenticate = require('../middlewares/authMiddleware');


router.post('/', authenticate, validator.create, controller.create);
router.post('/bulk-outfits', authenticate, controller.bulkCreate);

router.get('/feed', authenticate, controller.getFollowingOutfits);
router.get('/feed/:friendID', authenticate, controller.getFriendOutfits);

router.get('/', authenticate, controller.getAll);
router.put('/:outfitID', authenticate, validator.update, controller.update);
router.delete('/:outfitID', authenticate, validator.remove, controller.delete);
// baby here add the .get('/:outfitID', authenticate, controller.getById);
module.exports = router;
