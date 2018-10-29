
const iRoute = require('./coins.class');
const hooks = require('./coins.hooks');
const events = require('./coins.events');


module.exports = function(app){

  /* set route */
  app.use('/coins', iRoute({app}))

  /* set hook */
  const service = app.service('coins');
  service.hooks(hooks)

  /* SET EVENT*/

}
