// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');

  // define table object
  const brandnames = sequelize.define('brandnames',
    {

     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true

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
     /* [1 brandname - partner ]	 */
     type:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     status:{
       type:DataTypes.TINYINT,
       defaultValue:1
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


     url:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:null
     },
     photos:{
       type:DataTypes.TEXT,
       allowNull:true,
       defaultValue:'[]'
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

  return brandnames;

};
