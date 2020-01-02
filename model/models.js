const Sequelize = require('sequelize');
const sequelize = new Sequelize('db', 'id', 'pw!', {
  host: 'address',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1,
    }
  }
});

const User = sequelize.define('NODE_TEST_USER', {
  name: Sequelize.STRING
});


module.exports = {
  sequelize: sequelize,
  User: User
};
