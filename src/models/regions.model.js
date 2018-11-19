// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  const regions = sequelize.define('regions',
    {

     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true

     },

     code:{
       type:DataTypes.STRING,
       unique: true,
       validate:{
         notEmpty:{
           args:true,
           msg:"Vui lòng nhập mã"
         }


       }
     },
     /* mã vùng TP */

     name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Vui lòng nhập tên"
          },
          len: [4,40]

        }
     },

     slug:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:null
     },

     name_with_type:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     type:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },



  },
  {
    indexes: [
        {
            unique: true,
            fields: ['code']
        }
    ]
  },

  )

  return regions



};
