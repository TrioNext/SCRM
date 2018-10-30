// Initializes the `webthemes` service on path `/webthemes`
const createService = require('feathers-sequelize');
const createModel = require('../../models/webthemes.model');
const hooks = require('./webthemes.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/webthemes', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('webthemes');

  service.hooks(hooks);
};
