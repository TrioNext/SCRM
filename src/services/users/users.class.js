
/* feathers DB supporter */
const { Service } = require( 'feathers-sequelize');

/* DB schema for filter IN - OUT */
const mUser = require('../../models/users.model');

/* CUSTOM helper guy */
const Helper = require('../../models/helper');

class User extends Service {

    setup(app){
      this.app = app;
    }


    basicSchema(query){

      const paginate = this.paginate;

      query.p = query.p || 0 ;
      query.max = query.max || paginate.max ;
      query.sort_by =  query.sort_by || 'id';
      query.sort_type = query.sort_type || 'desc';


      query.basicQuery = {
          order:[
            [ query.sort_by || 'id' , query.sort_type || 'desc' ]
          ],
          offset: parseInt(query.p),
          limit: parseInt(query.max)
      };

      delete query.p ;
      delete query.max ;
      delete query.sort_by ;
      delete query.sort_type ;

      return query ;

    }
    whereSchema(query){

        const basic = query.basicQuery;
        delete query.basicQuery;
        query.is_deleted === undefined ? Object.assign(query,{ is_deleted:0 }) :  '';

        const where = {
            where: {
                $and: query
             }
        };
        return Object.assign({},where,basic);

    }

    /* method used in FIND */
    async read(params){

        let basicSchema = this.basicSchema(params.query);
        const fullSchema =    this.whereSchema(basicSchema);
        const list = await this.Model.findAndCountAll(fullSchema);


        return list;

    }

    /* METHOD CRUD */
    /* cURL: GET */
    async find(params){

      const query = params.query;
      return query.$limit !== undefined ?  super.find(params) : await this.read(params) ;
    }



    /* cURL : END GET  */



    /* cURL POST */
    async create(data,params){

        /*let ret  = {
          message:"",
          errors:[]
        }



        if(data.err===''){

          const json = {
            json:JSON.stringify({
              name:Helper.khongdau(data.name),
              address:Helper.khongdau(data.address)
            })
          }
          Object.assign(data,json);
          ret = this.Model.create(data);

        }else{ ret.message = data.err; }*/

        return this.Model.create(data); 

    }

    async update(id,data,params){

       return this.Model.update(data,{
         where:{
           id:id
         }
       });

    }

    /* cURL : DELETE */
    async remove(id, params ){

        const delData = {
          is_deleted:1
        }

        return this.Model.update(delData,{
          where:{
            id:id
          }
        })
    }

    /* END CRUD METHOD */

  }

  module.exports = function (app) {

    const Model = mUser(app);
    const paginate = app.get('paginate');
    return new User({Model,paginate});

  };

  module.exports.Service = User;
