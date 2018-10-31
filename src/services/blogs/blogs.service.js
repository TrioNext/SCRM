
/* THIS IS STUPID OBJECT : WORKING AS key WHERE principle */

const iRoute = require('./blogs.class');
const hooks = require('./blogs.hooks');
const events = require('./blogs.events');


module.exports = function(app){

  app.use('/blogs',iRoute({app}));
  const service = app.service('blogs');
  service.hooks(hooks);
}
