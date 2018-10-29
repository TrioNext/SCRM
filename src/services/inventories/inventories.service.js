
const iRoute = require('./inventories.class');
const hooks = require('./inventories.hooks');
const events = require('./inventories.events');


module.exports = function(app){

  /* set route */
  app.use('/inventories', iRoute({app}))

  /* set hook */
  const service = app.service('inventories');
  service.hooks(hooks)

  /* SET EVENT*/

}
