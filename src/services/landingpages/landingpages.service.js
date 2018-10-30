const iRoute = require('./landingpages.class');
const hooks = require('./landingpages.hooks');
const events = require('./landingpages.events');

module.exports = function(app){

  app.use('/landingpages',iRoute({app}));
  const service = app.service('landingpages');

  service.hooks(hooks);

}
