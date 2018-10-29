
const iRoute = require('./cointracks.class');
const hooks = require('./cointracks.hooks');
const events = require('./cointracks.events');


module.exports = function(app){

  /* set route */
  app.use('/cointracks', iRoute({app}))

  /* set hook */
  const service = app.service('cointracks');
  service.hooks(hooks)

  /* SET EVENT*/

}
