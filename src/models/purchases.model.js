// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const purchases = sequelize.define('purchases',
    {

     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true

     },

     code_in:{
        type:DataTypes.STRING,
        allowNull:true,
        unique: {
            args: true,
            msg: 'Vui lòng nhập mã khác'
        },
        set(val){
          this.setDataValue('code_in',val.toLowerCase())
        }
     },
     code_out:{
        type:DataTypes.STRING,
        allowNull:true,
        unique: {
            args: true,
            msg: 'Vui lòng nhập mã khác'
        },
        set(val){
          this.setDataValue('code_out',val.toLowerCase())
        }
     },



     /* 1: nhap - 2:xuat */
     type:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     /*
     n_ncc, n_inv, n_local: luan chuyen kho , x_ncc: tra hang NCC, x_inv : xuat cho inv, x_local : xuat luan chuyen
     */
     action_type:{
       type:DataTypes.STRING,
       defaultValue:'n_ncc'
     },

     /* 0: chờ xuat/nhap - 1: đã xuat/nhap - 2: đã giao */
     status:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },

     suplier_id:{
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

     deleted_by:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     /* JSON list order pro */
     list_order:{
       type:DataTypes.TEXT,
       defaultValue:'[]'
     },
     order_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
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

     store_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     inventorie_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
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

  return purchases;



};
