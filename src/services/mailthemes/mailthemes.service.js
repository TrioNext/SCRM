const iRoute = require('./mailthemes.class');
const hooks = require('./mailthemes.hooks');
const events = require('./mailthemes.events');

module.exports = function(app){

  app.use('/mailthemes',iRoute({app}));
  const service = app.service('mailthemes');

  service.hooks(hooks);

}
