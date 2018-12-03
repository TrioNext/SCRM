
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




      return query.$limit !== undefined ? await super.find(params) : await this.Model.findAndCountAll(schema);

    }
    /* cURL : END GET  */

    /* cURL POST */
    async create(data,params){


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

          ret.data = await this.Model.update(data,isUpdate.condition)
      }



       return ret ;

    }

    /* cURL : DELETE */
    async remove(id, params ){



        /* be hooked before => data for update*/
        const idata = this.app.get('data_del');


        idata.data =  await this.Model.update(idata.data,{
          where:{
            id:idata.id
          }
        });

        return idata;
    }

    /* END CRUD METHOD */

  }


  module.exports = function (app) {

    const Model = mUser(app);
    const paginate = app.get('paginate');
    return new User({Model,paginate});

  };

  module.exports.Service = User;
