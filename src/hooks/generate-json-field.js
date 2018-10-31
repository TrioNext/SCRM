
/*
  THIS IS A SIMPLE GUY : ON PRINCIPLE : WHERE AT
  DETECTED DATA IN ON POST CREATE DATABASE
  USING : HELPER
  MUST HAVE DATA DEFAULT : options = { schema:[ field1, field2 ] }
  RETURN data.err
*/


const Helper = require('../models/helper');

module.exports = function (options = {}) {
  return async context => {

    let {data} = context ;
    
    if(context.error.toString() ==='true'){

       const schema = options.schema || ['field'];
       let obj = `{`;

       schema.forEach((item)=>{
         const value = Helper.khongdau(data[item]);
         obj += ` "${ item }" : "${ value }",`;
       });

       obj = obj.substring(0, obj.length - 1);
       obj += `}`;

       obj = JSON.parse(obj);

       Object.assign(data,{
         json:JSON.stringify(
           obj
         )
       });

     }

    return context;
  };
};
