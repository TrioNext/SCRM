// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const inventories = sequelize.define('inventories',
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

     type:{
       type:DataTypes.STRING,
       defaultValue:'in'
     },

     /* 1: main - 2: kygui - trienlam - 3: muon - 4: nghiencuu */
     type:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     status:{
       type:DataTypes.TINYINT,
       defaultValue:1 /* 0: deabled - 1: app.enable; */
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

     /* JSON list employee array */
     staff_list:{
       type:DataTypes.TEXT,
       defaultValue:'[]'
     },

     products_list:{
       type:DataTypes.TEXT,
       defaultValue:'[]'
     },

     coin_fee_balance:{
       type:DataTypes.DECIMAL(10,2)
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


     /* seting giới hạn tồn cho mỗi SP báo động */
     limit_minimum_allow:{
       type:DataTypes.INTEGER,
       defaultValue:10
     },

     /* setting giới hạn hàng bị lỗi cảnh báo */
     limit_minium_product_error_allow:{
       type:DataTypes.INTEGER,
       defaultValue:10
     },

     /* CẢNH BAO SỐ NGÀY TỒN HÀNG */
     old_products_allow:{
       type:DataTypes.TINYINT,
       defaultValue:30
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
     email:{
       type:DataTypes.STRING,
       allowNull:true,
       set(val){
         this.setDataValue('email',val.toLowerCase())
       }
     },



     /* thong tin khong dau : nam - address	 */
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

  return inventories;



};
