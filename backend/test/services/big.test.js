const assert = require('assert');
const app = require('../../src/app');

describe('\'big\' service', () => {
  it('registered the service', () => {
    const service = app.service('bigs');

    assert.ok(service, 'Registered the service');
  });
});
