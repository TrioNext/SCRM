
/* feathers DB supporter */
const { Service } = require( 'feathers-sequelize');
/* DB schema for filter IN - OUT */
const mUser = require('../../models/users.model');

class User extends Service {


    constructor(options) {
      super(options)
      this.events = ['test'];
    }
    setup(app,path){
      this.app = app;

    }


    /* METHOD CRUD */
    /* cURL: GET */
    async find(params){

      /* GOT HOOKED BEFOR : => Default schema from app main Object*/
      const query = params.query;
      let schema = this.app.get('temp_get_in_schema') || {};

      //this.emit('test',{status:'ok good'})

      const sequelize = this.app.get('sequelizeClient');
      const { offices } = sequelize.models;

      Object.assign(schema,{
        include:[
          { model: offices, as:'offices'}
        ]
      });


      let data_out ;
      if(query.$limit !== undefined){
        data_out = await super.find(params);
      }else{
        data_out = await this.Model.findAndCountAll(schema);
        Object.assign(data_out,{
          name:'success'
        });
      }


      return  data_out ; //query.$limit !== undefined ? await super.find(params) : await this.Model.findAndCountAll(schema);
      //return query.$limit !== undefined ? await super.find(params) : await this.Model.findAndCountAll(schema);

    }
    /* cURL : END GET  */

    /* cURL POST */
    async create(data,params){


        /* cleart all fields null  */
        Object.keys(data).map((item)=>{
          if(data[item]==='null'){
            delete data[item];
          }
        });

        /* GOT HOOKED BEFOR :-> APP DATA_OUT*/
        let data_out = this.app.get('data_out');
        data_out.data = data_out.name==='success' ?  await this.Model.create(data) : data_out.data ;



        return data_out;

    }

    async test(data,params){

      return {
        name:"callmethod",
        message:"calling method",
        data:{}

      }
    }

    async update(id,data,params){

      /* be hooked before : to get condition schema for update database from params query*/
      let ret;

      const isUpdate = this.app.get('conditon_schema');
      ret = isUpdate;

      const isMethod = this.app.get('method_schema');

      if(isMethod.name==='success'){
         ret =  this[isMethod.method](data,params);
      }else{

          /* cleart all fields null  */
          Object.keys(data).map((item)=>{
            if(data[item]==='null'){
              delete data[item];
            }
          });
          
          delete data.password ;// dont update password

          const isSuccess = await this.Model.update(data,isUpdate.condition);
          ret.name = parseInt(isSuccess[0]) > 0 ? 'success' : 'fail-update' ;
          ret.data.id = ret.condition.where.id;

          delete ret.condition;


      }



       return ret ;

    }
    /* cURL : DELETE */
    async remove(id, params ){

        /* be hooked before => data for update*/
        let idata = this.app.get('data_del');

        const isSuccess = await this.Model.update(idata.data,{
          where:{
            id:idata.id
          }
        });

        idata.name = parseInt(isSuccess[0]) > 0 ? 'success' : 'fail-remove';
        idata.data.id = idata.id ;


        return idata;
    }

  }


  module.exports = function (app) {

    const Model = mUser(app);
    const paginate = app.get('paginate');
    return new User({Model,paginate});

  };

  module.exports.Service = User;
