// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const coins = sequelize.define('coins',
    {

     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true

     },
     status:{
       type:DataTypes.TINYINT,
       defaultValue:0 /* 0: pending - 1: active */
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
     user_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     purchase_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     deleted_by:{
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

     date_timeline:{
       type:DataTypes.TEXT,
       defaultValue:'[]' /*JSON : timeline in status action*/
     },

     /*
     JSON object holding : schedual auto action for notificattion message to other object
     */
     date_schedule_action:{
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

     balance:{
       type:DataTypes.DECIMAL(10,2),
       defaultValue:0
     },


     /* basic employee - basic purchase info - basic store */
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

  return coins;



};
