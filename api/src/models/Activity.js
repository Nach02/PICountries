const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('activity', {
      name:{
        type: DataTypes.STRING,
        validate:{
          isAlphanumeric:true
        }
      },
      dificulty:{
        type: DataTypes.ENUM('1','2','3','4','5')
      },
      duration:{
        type: DataTypes.DOUBLE
      },
      season:{
        type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring')
      }, 
  });
}; 