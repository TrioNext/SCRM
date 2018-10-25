// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const offices = sequelize.define('offices',{

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
        set(val){
          this.setDataValue('username',val.toLowerCase())
        }
     },
     name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Vui lòng nhập tên văn phòng"
          },
          len: [4,40]

        }
     },
     type:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'main'   /* enum [main,sub] : kiểu văn phòng : chính - phụ*/
     },
     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },
     status:{
       type:DataTypes.TINYINT,
       defaultValue:1      // [1: aenable - 0: disable ]
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

     leader_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     staff_on:{
       type:DataTypes.TEXT,
       allowNull:true,
       defaultValue:null,
       get(){
         var json = this.getDataValue('json');
         json = json !== null ? json : '{}';
         return JSON.parse(json);
       }
     },
     /* JSON []
      List thông tin basic của User làm việc ở đây
     */

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
     working_begin:{

     },
     working_end:{

     },

    latetime_allowed:{

    },
    earlytime_allowed:{

    },

    lat:{},
    lng:{},
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
    fax:{

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

  })



  return offices;



};
