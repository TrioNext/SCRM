const { authenticate } = require('@feathersjs/authentication').hooks;

const dataInCreated = require('../../hooks/data-in-created');

const generateJsonField = require('../../hooks/generate-json-field');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [dataInCreated(), generateJsonField()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
