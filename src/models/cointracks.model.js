// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const cointracks = sequelize.define('coin_tracks',
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
       defaultValue:null
     },
     code_out:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     type:{
       type:DataTypes.STRING,
       defaultValue:'in'
     },

     /*
     order - recharge - withdraw - salary - commision - bonus - inventory - other
     */
     exchangeAction:{
       type:DataTypes.STRING,
       defaultValue:null
     },

     /* ck-tm */
     exchangeType:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     status:{
       type:DataTypes.TINYINT,
       defaultValue:0 /* 0: opened - 1: accepted */
     },
     is_deleted:{
       type:DataTypes.TINYINT,
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
     coin_id:{
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
       allowNull: true
     },

     store_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     bank_ref:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     ip_address:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },
     is_mobile:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },

     content:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     amount:{
       type:DataTypes.DECIMAL(10,2),
       defaultValue:0
     },

     vat:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },




     /* basic customer - order items creator - */
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

  return cointracks;



};
