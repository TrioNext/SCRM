// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const iRoute = require('./payments.class');

const hooks = require('./payments.hooks');
const events = require('./payments.events');



module.exports = function (app) {


  /* ROUTE : /users */
  app.use('/payments',iRoute({app})) ;


  const service = app.service('payments');
  service.hooks(hooks);



};
