// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const orders = sequelize.define('orders',
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


     /*  1: don hang san pham - 2: don hang dich vu */
     type:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     /* [open-confirn-pickup-finish]  */
     status:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },

     company_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     /* đơn hàng của nhân vien này */
     creator_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     customer_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     list_order:{
       type:DataTypes.TEXT,
       defaultValue:'[]'
     },

     payment_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     deleted_by:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     /* THIẾT LẬP CHO CÁC PLUIGN CHẠY TRÊN SAN PHAM NAY*/
     plugin_json:{
       type:DataTypes.TEXT,
       defaultValue:'[]'
     },

     /* is on run marketing campaign on this */
     marketing_code:{
       type:DataTypes.STRING,
       defaultValue:null
     },
     date_created:{
       type:'TIMESTAMP',
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
       allowNull: true
     },

     date_modified:{
       type:'TIMESTAMP',
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
       allowNull: true
     },

     date_deleted:{
       type:'TIMESTAMP',
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
       allowNull: true
     },

     date_future:{
       type:'TIMESTAMP',
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
       allowNull: true
     },

     /* json list for status update */
     date_timeline:{
       type:DataTypes.TEXT,
       defaultValue:'[]'
     },

     store_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     ip_address:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     is_customer_order:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },
     is_mobile:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },



     /* basic info employee - basic info customer - basic info store -		 */
    json:{
      type:DataTypes.TEXT,
      allowNull:true,
      defaultValue:null,
      get(){
        var json = this.getDataValue('json');
        json = json !== null ? json : '{}';
        return JSON.parse(json);
      }
    }
  }
  )

  return orders;



};
