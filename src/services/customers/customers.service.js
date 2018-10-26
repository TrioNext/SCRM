// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const iRoute = require('./customers.class');
const hooks = require('./customers.hooks');
const events = require('./customers.events');



module.exports = function (app) {


  /* ROUTE : /users */
  app.use('/customers',iRoute({app})) ;


  const service = app.service('customers');
  service.hooks(hooks);



};
