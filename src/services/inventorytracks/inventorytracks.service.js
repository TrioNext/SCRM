
const iRoute = require('./inventorytracks.class');
const hooks = require('./inventorytracks.hooks');
const events = require('./inventorytracks.events');


module.exports = function(app){

  /* set route */
  app.use('/inventorytracks', iRoute({app}))

  /* set hook */
  const service = app.service('inventorytracks');
  service.hooks(hooks)

  /* SET EVENT*/

}
