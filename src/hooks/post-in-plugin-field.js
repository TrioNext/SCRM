
/*
gắng thêm các field mặc định cho method POST : CREATE
*/

module.exports = function (options = {}) {
  return async context => {

    console.log(context.params.user);
    return context;
  };
};
