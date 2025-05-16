'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Posts
    await queryInterface.bulkInsert('socialposts', [
      {
        postID: 1,
        postContent: 'Loving my new jacket!',
        likesCount: 2,
        commentsCount: 1,
        postImageURL: 'https://example.com/post1.jpg',
        postType: 'public',
        userID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Likes
    await queryInterface.bulkInsert('likes', [
      {
        likeID: 1,
        postID: 1,
        userID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Comments
    await queryInterface.bulkInsert('comments', [
      {
        commentID: 1,
        commentText: 'Looks great!',
        commentDate: new Date(),
        postID: 1,
        userID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
    await queryInterface.bulkDelete('likes', null, {});
    await queryInterface.bulkDelete('socialposts', null, {});
  }
};
