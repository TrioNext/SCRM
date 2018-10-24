// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    let  query  = context.params.query ;
    const paginate = context.app.get('paginate');

    
    query.p = query.p || 0 ;
    query.max = query.max || paginate.max ;
    query.sort_by =  query.sort_by || 'id';
    query.sort_type = query.sort_type || 'desc';

    
    query.basicQuery = {
        order:[
          [ query.sort_by || 'id' , query.sort_type || 'desc' ]
        ],
        offset: parseInt(query.p),
        limit: parseInt(query.max)
    };

    delete query.p ;
    delete query.max ;
    delete query.sort_by ;
    delete query.sort_type ;
    

    return context;
  };
  
};
