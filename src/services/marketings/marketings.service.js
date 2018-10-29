// Initializes the `marketings` service on path `/marketings`


const iRoute = require('./marketings.class');
const hooks = require('./marketings.hooks');
const events = require('./marketings.events');

module.exports = function(app){

  app.use('/marketings',iRoute({app}));
  const service = app.service('marketings');

  service.hooks(hooks);

}
