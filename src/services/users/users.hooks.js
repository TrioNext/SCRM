
const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const Helper = require('../../models/helper');

/* METHOD GET HOOKED -> GET Default SCHEMA QUERY DATABASE*/
const getInSchema = require('../../hooks/get-in-schema');

/* THE GUY : HOOKED POST [helper - [fields] ] -> return error: thiếu fields table mặc định  */
const postInSchema = require('../../hooks/post-in-schema');
const postInPluginField = require('../../hooks/post-in-plugin-field');

const putInSchema = require('../../hooks/put-in-schema');
const putInAction = require('../../hooks/put-in-action');




/* generate json fields by : passing schema needed */
const generateJsonField = require('../../hooks/generate-json-field');




module.exports = {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [getInSchema({Helper})],
    get: [],
    create: [
      hashPassword(),
      postInSchema({Helper,schema:['username', 'name', 'password', 'address', 'email']}), /* this guy return err: on missing Default field */
      generateJsonField({ Helper ,schema :['name','address'] }),
      postInPluginField()
      //dataInCreated({schema:['username', 'name', 'password', 'address', 'email']}),

    ],
    update: [ hashPassword(),putInSchema(),putInAction()  ],
    patch: [ hashPassword() ],
    remove: [ ]
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
