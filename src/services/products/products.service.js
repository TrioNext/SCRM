// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const serviceCompany = require('./products.class');

const hooks = require('./products.hooks');
const events = require('./products.events');



module.exports = function (app) {


  /* ROUTE : /users */
  app.use('/products',serviceCompany({app})) ;


  const service = app.service('products');
  service.hooks(hooks);



};
