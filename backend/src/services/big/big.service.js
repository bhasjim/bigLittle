// Initializes the `big` service on path `/bigs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/big.model');
const hooks = require('./big.hooks');
const filters = require('./big.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'big',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bigs', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bigs');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
