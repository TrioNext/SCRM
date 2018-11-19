const { authenticate } = require('@feathersjs/authentication').hooks;


const Helper = require('../../models/helper');

/* BEFORE : HTTP GET */
      const getInSchema = require('../../hooks/before/get-in-schema'); // -> GET Default SCHEMA QUERY DATABASE

/*          HTTP POST */
      const postInSchema = require('../../hooks/before/post-in-schema');
      const generateJsonField = require('../../hooks/before/generate-json-field');
      const postInPluginField = require('../../hooks/before/post-in-plugin-field');

/*          HTTP: PUT */
      const putInSchema = require('../../hooks/before/put-in-schema');
      const putInAction = require('../../hooks/before/put-in-action');
      const putInPluginField = require('../../hooks/before/put-in-plugin-field');


/*          HTTP: DELETE */
      const delInSchema = require('../../hooks/before/del-in-schema');


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [getInSchema({Helper})],
    get: [],
    create: [

      postInSchema({Helper,schema:['code', 'name', 'address', 'phone']}), /* this guy return err: on missing Default field */
      generateJsonField({ Helper ,schema :['code','phone','name','address'] }), // This guy create json field stringify
      postInPluginField() // this guy : add field default : [creator_id - company_id] to data for save
    ],
    update: [

      putInSchema(), /* this guy format params query as object condition for update  */
      putInAction(), /* this guy return to call a method  */
      putInPluginField(['date_modified']) /*  this gus add field : date_modified -   */
    ],
    patch: [],
    remove: [
      delInSchema() /*  this gus add field : date_deleleted - deleted_by -   */
    ]
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
