
/*
  THIS IS A SIMPLE GUY : ON PRINCIPLE : WHERE AT
  deteted params json ON HTTP: METHOD : GET
  USING : HELPER from trung gian

  RETURN a schema JSON for sequelize do query database
*/

module.exports = function (options = {}) {
  return async context => {

    const Helper = options.Helper;
    let {query} = context.params;
    let strQuery = JSON.stringify(query);

    /* BASIC SCHEMA */
    if(! strQuery.includes('$limit')){
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

      /* end BASIC SCHEMA */

      /* FULL SCHEMA  */
      const basic = query.basicQuery;
      delete query.basicQuery;
      query.is_deleted === undefined ? Object.assign(query,{ is_deleted:0 }) :  '';

      const key = query.key || '' ;
      delete query.key ;

      Object.assign(query,{
        json: {
          $like: '%'+Helper.khongdau(key)+'%'
        }
      })

      const where = {
          where: {
              $and: query
           }
      };
       const schema = Object.assign({},where,basic);

       context.app.set('temp_get_in_schema',schema);

       /* END FULL SCHEMA */
    }


    return context;
  };
};
