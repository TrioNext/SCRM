// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const serviceUser = require('./users.class');

const hooks = require('./users.hooks');
const events = require('./users.events');



module.exports = function (app) {
  

  /* ROUTE : /users */
  app.use('/users',serviceUser({app})) ;

  const service = app.service('users');
  service.hooks(hooks);



};
