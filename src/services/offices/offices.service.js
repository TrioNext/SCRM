// Initializes the `users` service on path `/users`

/* THIS USER SERVICE OBJECT : WORKINHG WITH DATABASE  */
const serviceOffice = require('./offices.class');

const hooks = require('./offices.hooks');
const events = require('./offices.events');



module.exports = function (app) {


  /* ROUTE : /users */
  app.use('/offices',serviceOffice({app})) ;

  const service = app.service('offices');
  service.hooks(hooks);



};
