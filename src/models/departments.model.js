// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const departments = sequelize.define('departments',
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
       unique: true,
       validate:{
         notEmpty:{
           args:true,
           msg:"Vui lòng nhập mã"
         },
         len: {
           args:[4,30],
           msg:'Mã bộ phận giới hạn trong khoảng [4,30] ký tự'
         },

       },
       set(val){

         const com_id = this.getDataValue()
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
          len: {
            args:[4,120],
            msg:'Tên bộ phận giới hạn trong khoảng [4,120] ký tự'
          },


        }
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

     deleted_by:{
       type:DataTypes.INTEGER,
       defaultValue:0
    },

    staff_on:{
      type:DataTypes.TEXT,
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
      {
        indexes: [
            {
                unique: true,
                fields: ['code']
            }
        ]
      },
      {
        hooks: {
              beforeValidate: function (data, options) {
                  if (typeof data.code === 'string') {
                      data.code = data.code.toLowerCase().trim();
                  }


              }
          }
      }
  )

  return departments



};
