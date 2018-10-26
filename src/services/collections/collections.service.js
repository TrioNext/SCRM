
const iRoute = require('./collections.class');
const hooks = require('./collections.hooks');
const events = require('./collections.events');


module.exports = function(app){

  /* set route */
  app.use('/collections', iRoute({app}))

  /* set hook */
  const service = app.service('collections');
  service.hooks(hooks)

  /* SET EVENT*/

}
