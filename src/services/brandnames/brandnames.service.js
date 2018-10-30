

const iRoute = require('./brandnames.class');
const hooks = require('./brandnames.hooks');
const events = require('./brandnames.events');


module.exports = function(app){

  app.use('/brandnames',iRoute({app}));
  const service = app.service('brandnames');
  service.hooks(hooks);
  
}
