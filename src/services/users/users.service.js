// Initializes the `users` service on path `/users`
const Service = require('feathers-sequelize');
const db = require('../../models/users.model');

const hooks = require('./users.hooks');

class User {

  /*
    dùng cho đối tượng phức : phối hợp nhiềi service - object để xử lý 1 vấn đề 
    app : MAIN OBJECT : to retrieve other service 
  */

  setup(app){
    this.app = app ;
    this.paginate = app.get('paginate');
    this.model = db(app);
  }
  async find(params){

    //console.log(Model);
    const query = params.query
    const list =  this.model.findAll();


    return list;
  }

  async get(id,params){

    return await this.model.findById(id);
  }

  async create(data,params){

    return await this.model.create(data);
  }

  async update(id,data,params){
    
    return {};
  }

  async remove(id,params){
    return id;
  }
}

module.exports = function (app) {

  const user = new User();
  
  const Model = db(app);
  const paginate = app.get('paginate');
  const options = {
    Model,
    paginate
  };
  //app.use('/users', ModelService(options));
  app.use('/users',Service({Model,paginate}))
  

  const service = app.service('users');


  service.hooks(hooks);


};
