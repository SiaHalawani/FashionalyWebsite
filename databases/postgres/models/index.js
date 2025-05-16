'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// ✅ Adjusted the config path:
const config = require(path.resolve(__dirname, '../config.json'))[env];

const db = {};

// ✅ Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// ✅ Load all models in the folder
fs.readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.endsWith('.js') &&
    !file.endsWith('.test.js')
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// ✅ Setup associations
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

// ✅ Log loaded models (optional for debug)
console.log('✅ Models loaded:', Object.keys(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// sequelize.sync({ alter: true }).then(() => {
//   console.log("✅ Synced with DB");
// });

module.exports = {
  ...db,
  sequelize,
  Sequelize
};
