// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const companies = sequelize.define('companies',
    {

     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true

     },
     bussiness_type:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },
     /* 1 : loại hình bán hàng : 2 ngành kinh doanh */

     name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Vui lòng nhập tên công ty"
          },
          len: [4,40]

        }
     },
     tax_no:{
       type:DataTypes.STRING,
       allowNull:true
     },
     status:{
       type:DataTypes.TINYINT,
       defaultValue:1      // [1: aenable - 0: disable ]
     },
     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },
     logo:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
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

     creator_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },

     deleted_by:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },


     lat:{
       type:DataTypes.FLOAT,
       defaultValue:0
     },
     lng:{
       type:DataTypes.FLOAT,
       defaultValue:0
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
    fax:{
      type:DataTypes.STRING,
      allowNull:true
    },
    website:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null
    },
    cloudtags:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null
    },
    config:{
        type:DataTypes.TEXT('tiny'),
        allowNull:true,
        defaultValue: null
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

  }

  )

  return companies;



};
