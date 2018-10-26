// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const iRoute = require('./regions.class');

const hooks = require('./regions.hooks');
const events = require('./regions.events');



module.exports = function (app) {


  /* ROUTE : /users */
  app.use('/regions',iRoute({app})) ;


  const service = app.service('regions');
  service.hooks(hooks);



};
