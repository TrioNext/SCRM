
/*
  THIS IS A SIMPLE GUY : ON PRINCIPLE : WHERE AT
  DETECTED DATA IN ON POST CREATE DATABASE
  USING : HELPER
  MUST HAVE DATA DEFAULT : options = { schema:[ field1, field2 ] }
  RETURN data.err
*/

const errors = require('@feathersjs/errors');
const Helper = require('../models/helper');

module.exports = function (options = {}) {
  return async context => {

    let {data} =  context;

    const schema =  options.schema ||   ['field'];

    const filers =  Helper.isPassedSchema(schema,Object.keys(data))
    context.error = filers === '' || ' Vui lòng kiểm tra  '+filers;

    return context;
  };
};
