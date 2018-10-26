// Initializes the `coins` service on path `/coins`
const createService = require('feathers-sequelize');
const createModel = require('../../models/coins.model');
const hooks = require('./coins.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/coins', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('coins');

  service.hooks(hooks);
};
