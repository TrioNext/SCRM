// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const supplier = sequelize.define('suppliers',
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

     /* 1: inbound - 2:outbound */
     type:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     /* 0: disable - 1 :aenable */
     status:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },

     /* [list JSON : pro_code mà NCC này đang bán ]	 */
     list_products:{
       type:DataTypes.TEXT,
       allowNull:true,
       defaultValue:'[]'
     },

     creator_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     company_id:{
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


     address:{
       type:DataTypes.STRING,
       allowNull:false,
       validate:{
         notEmpty:{
           args:true,
           msg:"Vui lòng nhập địa chỉ"
         },
         len: [4,100]

       }

     },
     region_id:{
       type:DataTypes.INTEGER,
       defaultValue:0,
     },
     subregion_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     phone:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     fax:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },
     email:{
       type:DataTypes.STRING,
       allowNull:true,
       set(val){
         this.setDataValue('email',val.toLowerCase())
       }
     },

     website:{
       type:DataTypes.STRING,
       allowNull:true,
     },

     /* basic inventory - basic PO - basic - inv	 */
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

  return supplier;



};
