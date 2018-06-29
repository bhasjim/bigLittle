const contact = require('./contact/contact.service.js');
const big = require('./big/big.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(contact);
  app.configure(big);
};
