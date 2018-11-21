// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const webthemes = sequelize.define('webthemes',
    {

     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true

     },

     name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Vui lòng nhập tên"
          },
          len: [4,100]

        }
     },
     /* 1: banhang - 2:chothue */
     type:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },


     description:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     keywords:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     coversliders:{
       type:DataTypes.TEXT('tiny'),
       allowNull:null,
       defaultValue:null
     },

     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
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

     /* [] JSON : list all company being used this themes		 */
     list_website_use:{
       type:DataTypes.TEXT,
       defaultValue:'[]'
     },


     date_start:{
       type:'TIMESTAMP',
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
       allowNull: true
     },

     date_end:{
       type:'TIMESTAMP',
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
       allowNull: true
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

   

     address:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     phone:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     email:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },
     domain:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     /* [ thiết lập cách sắp xếp trang chủ, các thiết lập khác ] */
     settings:{
       type:DataTypes.TEXT('tiny'),
       allowNull:true,
       defaultValue:null,
       get(){
         var json = this.getDataValue('json');
         json = json !== null ? json : '{}';
           // 'this' allows you to access attributes of the instance
         return JSON.parse(json);
       }
     },
     /* basic NCC - basic store - inventory	 */
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

  return webthemes;



};
