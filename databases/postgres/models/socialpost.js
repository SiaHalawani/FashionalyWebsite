// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class socialpost extends Model {
//     static associate(models) {
//       socialpost.belongsTo(models.user, {
//         foreignKey: 'userID',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });

//       socialpost.belongsTo(models.collection, {
//         foreignKey: 'collectionID',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE'
//       });

//       socialpost.hasMany(models.like, {
//         foreignKey: 'postID',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });

//       socialpost.hasMany(models.comment, {
//         foreignKey: 'postID',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//     }
//   }

//   socialpost.init({
//     postID: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false
//     },
//     postContent: {
//       type: DataTypes.TEXT,
//       allowNull: false
//     },
//     likesCount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 0
//     },
//     commentsCount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 0
//     },
//     postImageURL: {
//       type: DataTypes.STRING(255),
//       allowNull: true
//     },
//     postType: {
//       type: DataTypes.ENUM('private', 'public'),
//       allowNull: false,
//       defaultValue: 'public'
//     },
//     userID: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     collectionID: {
//       type: DataTypes.INTEGER,
//       allowNull: true
//     }
//   }, {
//     sequelize,
//     modelName: 'socialpost',
//     tableName: 'socialposts',
//     timestamps: true
//   });

//   return socialpost;
// };


'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class socialpost extends Model {
    static associate(models) {
      socialpost.belongsTo(models.user, {
        foreignKey: 'userID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      socialpost.belongsTo(models.collection, {
        foreignKey: 'collectionID',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });

      socialpost.hasMany(models.like, {
        foreignKey: 'postID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      socialpost.hasMany(models.comment, {
        foreignKey: 'postID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  socialpost.init({
    postID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    postContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    postImageURL: {
      type: DataTypes.TEXT, // Keep in DB as string (even if migration still says STRING(255))
      allowNull: true,
      get() {
        const raw = this.getDataValue('postImageURL');
        try {
          const parsed = JSON.parse(raw);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          return raw ? [raw] : [];
        }
      },
      set(value) {
        this.setDataValue('postImageURL', JSON.stringify(value));
      }
    },
    postType: {
      type: DataTypes.ENUM('private', 'public'),
      allowNull: false,
      defaultValue: 'public'
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    collectionID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'socialpost',
    tableName: 'socialposts',
    timestamps: true
  });

  return socialpost;
};
