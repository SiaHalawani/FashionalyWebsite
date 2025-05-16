
const { user, wardrobeitem, collection, socialpost, outfit } = require('../../databases/postgres/models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'myultrasecretkey';
exports.registerUser = async (userData) => {
  // Normalize email
  userData.email = userData.email.toLowerCase().trim();

  // Hash password
  userData.passwordHash = await bcrypt.hash(userData.password, 10);
  delete userData.password;

  // Create user
  return await user.create(userData);
};

exports.loginUser = async ({ email, password }) => {
  // Normalize email input
  const existingUser = await user.findOne({
    where: {
      email: {
        [Op.iLike]: email.trim()
      }
    }
  });

  if (!existingUser) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign(
    { id: existingUser.userID, email: existingUser.email },
    secretKey,
    { expiresIn: '1d' }
  );

  return { user: existingUser, token };
};

exports.getUserByID = async (userID) => {
  return await user.findByPk(userID, {
    attributes: { exclude: ['passwordHash'] }
  });
};

exports.updateUser = async (userID, data) => {
  return await user.update(data, { where: { userID } });
};

exports.getAllUsers = async () => {
  return await user.findAll({
    attributes: { exclude: ['passwordHash'] }
  });
};

exports.deleteUserByID = async (userID) => {
  const userToDelete = await user.findByPk(userID);
  if (!userToDelete) throw new Error('User not found');
  await userToDelete.destroy();
};

exports.searchGlobal = async (query) => {
const searchTerm = `%${query}%`;


  const lowerQuery = query.toLowerCase();

  const score = (text) => {
    const t = text?.toLowerCase() || '';
    if (!t.includes(lowerQuery)) return 0;
    if (t === lowerQuery) return 3;
    if (t.startsWith(lowerQuery)) return 2;
    return 1;
  };

  const usersRaw = await user.findAll({
    where: {
      [Op.or]: [
        { username: { [Op.iLike]: searchTerm } },
        { fullName: { [Op.iLike]: searchTerm } }
      ]
    },
    attributes: ['userID', 'username', 'fullName', 'profilePicture'],
    limit: 20
  });

  const itemsRaw = await wardrobeitem.findAll({
    where: { itemName: { [Op.iLike]: searchTerm } },
    attributes: ['itemID', 'itemName', 'imageURL'],
    limit: 20
  });

  const collectionsRaw = await collection.findAll({
    where: { collectionName: { [Op.iLike]: searchTerm } },
    attributes: ['collectionID', 'collectionName'],
    limit: 20
  });

  const postsRaw = await socialpost.findAll({
    where: { postContent: { [Op.iLike]: searchTerm } },
    attributes: ['postID', 'postContent', 'postImageURL'],
    limit: 20
  });

  const outfitsRaw = await outfit.findAll({
    where: { outfitName: { [Op.iLike]: searchTerm } },
    attributes: ['outfitID', 'outfitName'],
    limit: 20
  });

  const users = usersRaw
    .map(u => ({
      type: 'user',
      id: u.userID,
      title: u.username,
      subtitle: u.fullName,
      image: u.profilePicture
    }))
    .sort((a, b) => score(b.title) - score(a.title));

  const items = itemsRaw
    .map(i => ({
      type: 'item',
      id: i.itemID,
      title: i.itemName,
      subtitle: 'Wardrobe Item',
      image: i.imageURL
    }))
    .sort((a, b) => score(b.title) - score(a.title));

  const collections = collectionsRaw
    .map(c => ({
      type: 'collection',
      id: c.collectionID,
      title: c.collectionName,
      subtitle: 'Collection',
      image: null
    }))
    .sort((a, b) => score(b.title) - score(a.title));

  const posts = postsRaw
    .map(p => ({
      type: 'post',
      id: p.postID,
      title: (p.postContent || '').slice(0, 40) + (p.postContent?.length > 40 ? '...' : ''),
      subtitle: 'Post',
      image: p.postImageURL
    }))
    .sort((a, b) => score(b.title) - score(a.title));

  const outfits = outfitsRaw
    .map(o => ({
      type: 'outfit',
      id: o.outfitID,
      title: o.outfitName,
      subtitle: 'Outfit',
      image: null
    }))
    .sort((a, b) => score(b.title) - score(a.title));

  return {
    users: { label: 'Users', results: users },
    items: { label: 'Wardrobe Items', results: items },
    collections: { label: 'Collections', results: collections },
    posts: { label: 'Posts', results: posts },
    outfits: { label: 'Outfits', results: outfits }
  };
};