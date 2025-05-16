const express = require('express');
const router = express.Router();
const followerController = require('../controllers/followerController');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/authMiddleware');

const {
  followUnfollowSchema,
  userIDParamSchema
} = require('../validators/followerValidator');

// Follow a user
router.post('/', auth, validate(followUnfollowSchema), followerController.followUser);

router.post('/bulk-follow', auth, followerController.bulkFollow);

// Unfollow a user
router.delete('/', auth, validate(followUnfollowSchema), followerController.unfollowUser);

// Check if logged-in user is following :userID
router.get('/is-following/:userID', auth, followerController.isFollowing);

// Check if :otherID is following the logged-in user
router.get('/is-followed-by/:otherID', auth, followerController.isFollowedBy);

// Get followers of a user
router.get('/:userID/followers', auth, validate(userIDParamSchema, 'params'), followerController.getFollowers);

// Get users followed by a user
router.get('/:userID/following', auth, validate(userIDParamSchema, 'params'), followerController.getFollowing);

// Suggested users to follow
router.get('/:userID/suggested', auth, validate(userIDParamSchema, 'params'), followerController.getSuggestedFollows);


// Remove someone you follow
router.delete('/remove-following', auth, validate(followUnfollowSchema), followerController.removeFollowing);

// Remove someone following you
router.delete('/remove-follower', auth, validate(followUnfollowSchema), followerController.removeFollower);

module.exports = router;
