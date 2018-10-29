// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const marketings = sequelize.define('marketings',
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
        allowNull:true,
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
     /* deal - giftcode - loyal - affiliate - event */
     type:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },

     /* 0: disnabel - 1: aenable; */
     status:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },

     deleted_by:{
       type:DataTypes.INTEGER,
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

     /* [] JSON list : email - Name - sex	 */
     list_customer:{
       type:DataTypes.TEXT,
       defaultValue:'[]'
     },


     /* [] JSON: list staff joining this marketing	 */
     list_employee:{
       type:DataTypes.TEXT,
       defaultValue:'[]'
     },

     emailthems_id:{
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

     date_start:{
       type:'TIMESTAMP',
       defaultValue: 0,
       allowNull: true
     },

     date_end:{
       type:'TIMESTAMP',
       defaultValue: 0,
       allowNull: true
     },

     is_online:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     /* json: list channel joining */
     channels:{
       type:DataTypes.TEXT,
       defaultValue:'[]'
     },
     /* NGÂN SÁCH */
     budget:{
       type:DataTypes.DECIMAL('10,2'),
       defaultValue:0
     },

     /* DOANH SỐ*/
     total_sales:{
       type:DataTypes.DECIMAL('10,2'),
       defaultValue:0
     },

     /* MỤC TIÊU DOANH SỐ */
     total_sales_target:{
       type:DataTypes.DECIMAL('10,2'),
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

  return marketings;



};
