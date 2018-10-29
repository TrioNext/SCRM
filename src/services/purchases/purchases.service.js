// Initializes the `suppliers` service on path `/suppliers`


const iRoute = require('./purchases.class');
const hooks = require('./purchases.hooks')
const events = require('./purchases.events')


module.exports = function(app){

  app.use('/purchases',iRoute({app}));

  const service = app.service('purchases');
  service.hooks(hooks);

}
