// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const serviceCompany = require('./companies.class');

const hooks = require('./companies.hooks');
const events = require('./companies.events');



module.exports = function (app) {


  /* ROUTE : /users */
  app.use('/companies',serviceCompany({app})) ;


  const service = app.service('companies');
  service.hooks(hooks);



};
