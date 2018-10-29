// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const serviceCompany = require('./orders.class');

const hooks = require('./orders.hooks');
const events = require('./orders.events');



module.exports = function (app) {


  /* ROUTE : /users */
  app.use('/order',serviceCompany({app})) ;


  const service = app.service('order');
  service.hooks(hooks);



};
