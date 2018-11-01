const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const postInPluginField = require('../../src/hooks/post-in-plugin-field');

describe('\'post-in-plugin-field\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
