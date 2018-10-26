const users = require('./users/users.service.js');
const offices = require('./offices/offices.service.js');
const companies = require('./companies/companies.service.js');
const departments = require('./departments/departments.service.js');
const stores = require('./stores/stores.service.js');
const regions = require('./regions/regions.service.js');
const subregions = require('./subregions/subregions.service.js');
const payments = require('./payments/payments.service.js');
const customers = require('./customers/customers.service.js');
const collections = require('./collections/collections.service.js');
const coins = require('./coins/coins.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(offices);
  app.configure(companies);
  app.configure(departments);
  app.configure(stores);
  app.configure(regions);
  app.configure(subregions);
  app.configure(payments);
  app.configure(customers);
  app.configure(collections);
  app.configure(coins);
};
