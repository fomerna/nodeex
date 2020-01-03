const Sequelize = require('sequelize');
const sequelize = new Sequelize('db', 'id', 'pw!', {
  host: 'address',
  dialect: 'mssql',
  timezone: '+09:00',
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1,
    }
  }
});

const User = sequelize.define('NODE_TEST_USER', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //   isEmail: true
    // }
  }
});


module.exports = {
  sequelize: sequelize,
  User: User
};
