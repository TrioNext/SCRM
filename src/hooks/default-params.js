// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/* 
for get default params on FIND METHOD
*/

module.exports = function (options = {}) {
  return async context => {
    const query = context.params.query;
    const paginate = context.app.get('paginate');
    
    
    return context;
  };
};
