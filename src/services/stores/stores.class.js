/*
DEPARTMENTS
cURL
		GET
      - /           method find(params)  : custom
      - /{id}       method get(id,params): custom
    POST
      - /authentication           method authenticate() : default
      - /                         method create() : custom
    PUT

    DEL
*/

const { Service } = require( 'feathers-sequelize');
const mModel = require('../../models/stores.model');


class iRoute extends Service {

    setup(app){
      this.app = app;
    }

    /* METHOD CRUD */
    async find(params){

      /* GOT HOOKED BEFOR : => Default schema from app main Object*/
      const query = params.query;
      const schema = this.app.get('temp_get_in_schema');

      return query.$limit !== undefined ? await super.find(params) : await this.Model.findAndCountAll(schema);

    }


    /* cURL POST */
    async create(data,params){


        /* GOT HOOKED BEFOR :-> APP DATA_OUT*/
        let data_out = this.app.get('data_out');
        data_out.data = data_out.name==='success' ?  await this.Model.create(data) : data_out.data ;

        return data_out;

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

  /* options : app - hook - event */
  module.exports = function (options) {
    const app = options.app;
    const Model = mModel(app);
    const paginate = app.get('paginate');

    const sequelize = {
        Model,
        paginate
    }


    return new iRoute(sequelize);

  };

  module.exports.Service = iRoute;
