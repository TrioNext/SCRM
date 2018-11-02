// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const customers = sequelize.define('customers',
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
        allowNull:false,
        defaultValue:1   /* enum [1:ca nhan - 2:cty - 3: daily ...] */
     },
     status:{
       type:DataTypes.TINYINT,
       defaultValue:1      // [1: aenable - 0: disable ]
     },
     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },
     creator_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     /*  cộng tác viên */
     is_affiliated:{
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

     collection_tags:{
       type:DataTypes.TEXT('tiny'),
       allowNull:true,
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
       allowNull: true
     },

     /* TIME RẢNH RỔI ex: 3H pm*/
     time_available:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },


     /* nhóm khách hàng  */
     channel_tags:{
       type:DataTypes.TEXT('tiny'),
       allowNull:true,
       defaultValue:null
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
     face_id:{
        type:DataTypes.INTEGER,
        defaultValue:0
     },
     /* GHI CHU CHO KHACH HÀNG NÀY*/
     note:{
       type:DataTypes.TEXT('tiny'),
       allowNull:true,
       defaultValue:null
     },
     rank:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },
     current_balance:{
       type:DataTypes.DECIMAL(9, 2)
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

  return customers;



};
