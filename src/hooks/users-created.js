// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('@feathersjs/errors');

/* CUSTOM helper guy */
const Helper = require('../models/helper');


module.exports = function (options = {}) {
  return async context => {

    let {data} =  context;

    const schema = ['username','name','password','address','email'];

    const filers =  Helper.isPassedSchema(schema,Object.keys(data))
    data.err = filers === '' ? '' : ' Vui lòng kiểm tra  '+filers;

    return context;
  };
};
