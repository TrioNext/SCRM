// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const collections = sequelize.define('collections',
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
        allowNull:false,
        unique: {
            args: true,
            msg: 'Vui lòng nhập mã khác'
        },
        set(val){
          this.setDataValue('code',val.toLowerCase())
        }
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
     /* SINGLE : LIST JSON  */
     type:{
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue:1
     },
     status:{
       type:DataTypes.TINYINT,
       defaultValue:1      // [1: aenable - 0: disable ]
     },
     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },
     parent_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     creator_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     company_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     webtheme_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },


     deleted_by:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     /* contain a JSON list  */
     container:{
       type:DataTypes.TEXT,
       defaultValue:null,
       get(){
         var json = this.getDataValue('json');
         json = json !== null ? json : '{}';

          // 'this' allows you to access attributes of the instance
         return JSON.parse(json);
       }
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

  },
    { indexes: [ { unique: true, fields: [ 'code' ] } ] },
  )

  return collections;



};
