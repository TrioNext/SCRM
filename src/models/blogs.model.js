// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const blogs = sequelize.define('blogs',
    {

     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true

     },

     title:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Vui lòng nhập tiêu đề"
          },
          len: [4,100]

        }
     },
     /* 1: blog mac dinh - 2: blog theo collection		 */
     type:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     status:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },

     short_desc:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     

     company_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     creator_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     deleted_by:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     date_created:{
        type:DataTypes.DATE,
        defaultValue: Sequelize.NOW(),
        allowNull: true
     },

     date_modified:{
        type:DataTypes.DATE,
        defaultValue: Sequelize.NOW(),
        allowNull: true
     },

     date_deleted:{
        type:DataTypes.DATE,
        allowNull: true
     },

     tags:{
       type:DataTypes.TEXT,
       allowNull:true,
       defaultValue:null
     },

      json:{
        type:DataTypes.TEXT,
        allowNull:true,
        defaultValue:null,
        get(){
          var json = this.getDataValue('json');
          json = json !== null ? json : '{}';

           // 'this' allows you to access attributes of the instance
          return JSON.parse(json);
        }
      }
    }
  )

  return blogs;

};
