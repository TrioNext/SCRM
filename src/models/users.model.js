// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const users = sequelize.define('users',{

     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,

        unique: true

     },
     username:{
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
         this.setDataValue('username',val.toLowerCase())
       }
     },

     position:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Vui lòng nhập chức vụ"
          },
          len: {
            args:[4,40],
            msg:" Tên tối thiểu [4,40] ký tự"
          }

        }
     },
     /* 1: nam - 0 nữ */
     gender:{
       type:DataTypes.TINYINT,
       defaultValue:1
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
            args:[4,40],
            msg:" Tên tối thiểu 4 ký tự"
          }

        }
     },
     password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Vui lòng nhập mật khẩu"
          },
          len:{
            args: [4,200],
            msg:' Vui lòng nhập mật khẩu : ít nhất là 4 ký tự'
          }
        }
     },
     job_level:{
        type:DataTypes.TINYINT,
        defaultValue:2

     },
     job_type:{
        type:DataTypes.TINYINT,
        defaultValue:2,

    },
    is_affiliated:{
      type:DataTypes.TINYINT,
      defaultValue:0, /* Thành viên sale liên kết  */
    },


    is_leader:{
      type:DataTypes.TINYINT,
      defaultValue:0
    },
    status:{
      type:DataTypes.TINYINT,
      defaultValue:5      // [0:vắng - 1: có mặt - 2: nghĩ phép có tính công - 3: nghĩ phép ko tính công - 4: nghĩ việc]
    },
    is_deleted:{
      type:DataTypes.TINYINT,
      defaultValue:0
    },
    collections_tags:{
      type:DataTypes.TEXT,   //[phòng ban - chức vụ - office - company - store]
      allowNull:true,
      defaultValue:null
    },
    deleted_by:{
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
    office_id:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    department_id:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    store_id:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    salary_balance:{
      type:DataTypes.DECIMAL,
      defaultValue:0
    },
    commission_balance:{
      type:DataTypes.DECIMAL,
      defaultValue:0
    },
    salary_set:{
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


    schedule:{
      type:DataTypes.TEXT,
      allowNull:true,
      defaultValue:null
    },
    address:{
      type:DataTypes.STRING,
      allowNull:true,


    },
    region_code:{
      type:DataTypes.STRING,
      defaultValue:null,
      allowNull:true
    },
    subregion_code:{
      type:DataTypes.STRING,
      defaultValue:null,
      allowNull:true
    },
    phone:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:"Vui lòng nhập số ĐT"
        }
      }
    },
    email:{
      type:DataTypes.STRING,
      allowNull:true,
      unique: true,
      validate:{
        isEmail: {
          args:true,
          msg:'Vui lòng nhập e-mail hợp lệ'
        }
      },
      set(val){
        this.setDataValue('email',val.toLowerCase())
      }
    },
    is_remote_working:{
      type:DataTypes.TINYINT,
      defaultValue:0
    },
    available_working_on:{
      type:DataTypes.TEXT,
      allowNull:true,
      defaultValue:null
    },
    checkin_available:{
      type:DataTypes.TEXT,
      allowNull:true,
      defaultValue:null

    },
    is_pass_training:{
      type:DataTypes.TINYINT,
      defaultValue:0
    },
    is_limit_ip_chamcong:{
      type:DataTypes.TINYINT,
      defaultValue:0
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
              fields: ['username','email']
          }
      ]
    }
);

  users.associate = function(models){
      users.belongsTo(models.offices, {
          as:'offices',
          foreignKey: 'office_id'

      });
  };




  return users;



};
