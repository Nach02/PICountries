const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    ID:{//cca3
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:"N/D",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    img:{
      type:DataTypes.STRING,
      allowNull:false,      
    },
    continent:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    capitalCity:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:"N/D"
    },
    subregion:{
      type:DataTypes.STRING,      
    },
    area:{
      type:DataTypes.DOUBLE, 
    },
    population:{
      type:DataTypes.INTEGER,      
    }
 
  });
};
