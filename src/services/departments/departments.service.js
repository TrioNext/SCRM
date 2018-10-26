// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const iRoute = require('./departments.class');

const hooks = require('./departments.hooks');
const events = require('./departments.events');



module.exports = function (app) {


  /* ROUTE : /users */
  app.use('/departments',iRoute({app})) ;


  const service = app.service('departments');
  service.hooks(hooks);



};
