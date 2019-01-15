// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const inventorytracks = sequelize.define('inventorie_tracks',
    {

     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true

     },


     /* 1: in - out */
     type:{
       type:DataTypes.STRING,
       defaultValue:'in'
     },

     /* LOAI MUA HÀNG - LOAI NHẬP HÀNG */
     action_type:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },

     /* TRẠNG THÁI : mới - đang xử lý - hoàn thành*/
     status:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },

     /* Mã đơn hàng */
     group_code:{
       type:DataTypes.STRING,
       allowNull:true
     },

     /* GHI CHÚ*/
     note:{
       type:DataTypes.STRING,
       allowNull:true
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



     date_created:{
       type:DataTypes.DATE,
       defaultValue: Sequelize.NOW,
       allowNull: true
     },

     inventory_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     purchase_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },


     order_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
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

  return inventorytracks;



};
