
const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const dataInCreated = require('../../hooks/data-in-created');

const generateJsonField = require('../../hooks/generate-json-field');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [ authenticate('jwt') ],
    create: [
      hashPassword(),
      dataInCreated({schema:['username', 'name', 'password', 'address', 'email']}),
      generateJsonField({ schema :['name','address'] })
    ],
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [ hashPassword(),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [protect('password')],
    find: [],
    get: [],
    create: [ function(context){
        context.data = {
            "name": "success",
            "message": "Đã tạo thành công",
            "data": {}
        }


        return context;
    }],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [
      function(context){
        console.log('co bien xay ra '+context.error);
      }
    ],
    update: [],
    patch: [],
    remove: []
  }
};
