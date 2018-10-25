// Initializes the `offices` service on path `/offices`
const createService = require('feathers-sequelize');
const createModel = require('../../models/offices.model');
const hooks = require('./offices.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/offices', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('offices');

  service.hooks(hooks);
};
