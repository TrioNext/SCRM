
const { Service } = require( 'feathers-sequelize');
const mUser = require('../../models/users.model');

class User extends Service {

    
    async find (params) {


        

        return  []; //await this.Model.findAll()
    }

    async remove(id, data, params ){

        const delData = {
            is_deleted:true
        }
        return await this.Model.update(delData,{
            where: {
                id: {
                  $eq: id
                }
            }
        });

        //return params;

    }
    
    
  }
  
  /* options : app - hook - event */
  module.exports = function (options) {
    const app = options.app;
    const Model = mUser(app);
    const paginate = app.get('paginate');

    const sequelize = {
        Model,
        paginate
    }

    
    return new User(sequelize);

  };
  
  module.exports.Service = User;
  
  