// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const iDB = require('./users.class');
const hooks = require('./users.hooks');
const events = require('./users.events');



module.exports = function (app) {


  /* ROUTE : /users => database service action for response */

  const res = iDB(app);

  app.use('/users',res) ;
  const service = app.service('users');
    
  service.hooks(hooks);


};
