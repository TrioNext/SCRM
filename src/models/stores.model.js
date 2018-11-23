// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  const stores = sequelize.define('stores',
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

     type:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },
     /* 1: cửa hàng - 2: nhà hàng - 3.. */
     status:{
       type:DataTypes.TINYINT,
       defaultValue:1  /* available */
     },
     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },

     company_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     leader_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     /* NHÓM TRUONG - CUA HÀNG TRUOG*/


     staff_on:{
       type:DataTypes.TEXT,
       allowNull:true,
       defaultValue:null
     },

     creator_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     deleted_by:{
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

   
   address:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:"Vui lòng nhập địa chỉ"
        },
        len: {
          args:[4,100],
          msg:" Số ký tự giới hạn trong khoảnh [20,120] "
        }

      }

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

    ip_chamcong:{
      type:DataTypes.STRING,
      defaultValue:null,
      allowNull:true
    },


     phone:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null,
      validate:{
        notEmpty:{
          args:true,
          msg:'Vui lòng nhập số ĐT'
        },
        len:{
          args:[10,40],
          msg:"Số phone giới hạn ký tự [10,40]"
        }
      }
     },
     email:{
       type:DataTypes.STRING,
       allowNull:true,
       set(val){
         this.setDataValue('email',val.toLowerCase())
       }
     },
     fax:{
       type:DataTypes.STRING,
       allowNull:true
     },
     lat:{
       type:DataTypes.FLOAT,
       defaultValue:0
     },
     lng:{
       type:DataTypes.FLOAT,
       defaultValue:0
     },

     

     setting:{
       type:DataTypes.TEXT,
       defaultValue:null
     },
     /* thiet lap rules cho cua hang*/


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

  return stores



};
