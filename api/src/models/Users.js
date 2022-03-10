const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('users', {
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      }
  });
}; 