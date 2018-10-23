/*
Attributes
To select only some attributes, you can use the attributes option. Most often, you pass an array:
*/
// SELECT foo, bar ...
Model.findAll({
    attributes: ['foo', 'bar']
});

// SELECT COUNT(hats) AS no_hats ...
Model.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
});

// SELECT id, foo, bar, baz, quz, COUNT(hats) AS no_hats ...
// This is a tiresome way of getting the number of hats...
Model.findAll({
    attributes: ['id', 'foo', 'bar', 'baz', 'quz', [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
  });
  
  // This is shorter, and less error prone because it still works if you add / remove attributes
Model.findAll({
    attributes: { include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']] }
});




