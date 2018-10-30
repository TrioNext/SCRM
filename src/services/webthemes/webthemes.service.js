const iRoute = require('./webthemes.class');
const hooks = require('./webthemes.hooks');
const events = require('./webthemes.events');

module.exports = function(app){

  app.use('/webthemes',iRoute({app}));
  const service = app.service('webthemes');

  service.hooks(hooks);

}
