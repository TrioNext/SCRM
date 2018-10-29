// Initializes the `suppliers` service on path `/suppliers`


const iRoute = require('./suppliers.class');
const hooks = require('./suppliers.hooks')
const events = require('./suppliers.events')


module.exports = function(app){

  app.use('/suppliers',iRoute({app}));

  const service = app.service('suppliers');
  service.hooks(hooks);
  
}
