// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const iRoute = require('./stores.class');

const hooks = require('./stores.hooks');
const events = require('./stores.events');



module.exports = function (app) {


  /* ROUTE : /users */
  app.use('/stores',iRoute({app})) ;


  const service = app.service('stores');
  service.hooks(hooks);



};
