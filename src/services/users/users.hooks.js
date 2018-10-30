
const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const filterOnGetFind = require('../../hooks/filter-on-get-find');

const usersCreated = require('../../hooks/users-created');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [ authenticate('jwt') ],
    create: [hashPassword(), usersCreated()],
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [ hashPassword(),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [protect('password')],
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
