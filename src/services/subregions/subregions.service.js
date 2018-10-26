// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const iRoute = require('./subregions.class');

const hooks = require('./subregions.hooks');
const events = require('./subregions.events');



module.exports = function (app) {


  /* ROUTE : /users */
  app.use('/subregions',iRoute({app})) ;


  const service = app.service('subregions');
  service.hooks(hooks);



};
