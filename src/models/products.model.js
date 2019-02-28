// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {

  // config Database
  const sequelize = app.get('sequelizeClient');
  const Op = sequelize.Op
  // define table object
  const model = sequelize.define('products',
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
          len: [4,100]

        }
     },

     /* 1: pro - 2 subpro - 3: services */
     type:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     /* 0: disable - 1 :aenable */
     status:{
       type:DataTypes.TINYINT,
       defaultValue:1
     },

     is_deleted:{
       type:DataTypes.TINYINT,
       defaultValue:0
     },

     /*  JSON list properties of pro */
     collection_container_tags:{
       type:DataTypes.TEXT,
       allowNull:true,
       defaultValue:null
     },
     collection_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     /* số luong có sẳn trong kho*/
     inventory_available:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     /* số luong se nhập */
     inventory_received:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     /* SL sẽ xuất kho */
     inventory_shiped:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },
     /* SỐ LUONG UOC TINH CUOI CUNG*/
     inventory_onhand:{
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


     list_inventory:{
       type:DataTypes.TEXT,
       allowNull:true,
       defaultValue:null
     },
     supplier_id:{
       type:DataTypes.INTEGER,
       defaultValue:0
     },



     /* basic inventory - basic PO - basic - inv	 */
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
    },

  );

  const Product = Object.assign(model,{

    maxPage:30,


    listAll(){

      return new Promise((resolve,reject)=>{

        const query = "Select id from products"
        /*sequelize.query(query, { type: sequelize.QueryTypes.SELECT}).success(function(count){

            resolve(count);

        }).catch(function(error){
            //res.send('server-error', {error: error});
        });*/

        sequelize.query(query).spread((results, metadata) => {

          const data = {
            count:0,
            rows:results
          }
          resolve(data);

        });
      });
    },

    getInfo(id){
      return new Promise((resolve,reject)=>{

        model.findById(id).then(idata => {

          const data = idata || {}
          resolve(data);

        })
      });
    },


  });

  return Product;

};
