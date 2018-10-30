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
const cointracks = require('./cointracks/cointracks.service.js');
const inventories = require('./inventories/inventories.service.js');
const inventorytracks = require('./inventorytracks/inventorytracks.service.js');
const products = require('./products/products.service.js');
const orders = require('./orders/orders.service.js');
const suppliers = require('./suppliers/suppliers.service.js');
const purchases = require('./purchases/purchases.service.js');
const marketings = require('./marketings/marketings.service.js');

const webthemes = require('./webthemes/webthemes.service.js');
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
  app.configure(cointracks);
  app.configure(inventories);
  app.configure(inventorytracks);
  app.configure(products);
  app.configure(orders);
  app.configure(suppliers);
  app.configure(purchases);
  app.configure(marketings);
  
  app.configure(webthemes);
};
