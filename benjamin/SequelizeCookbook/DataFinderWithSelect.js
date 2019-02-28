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

// search for known ids
Project.findById(123).then(project => {
  // project will be an instance of Project and stores the content of the table entry
  // with id 123. if such an entry is not defined you will get null
})

// search for attributes
Project.findOne({ where: {title: 'aProject'} }).then(project => {
  // project will be the first entry of the Projects table with the title 'aProject' || null
})


Project.findOne({
  where: {title: 'aProject'},
  attributes: ['id', ['name', 'title']]
}).then(project => {
  // project will be the first entry of the Projects table with the title 'aProject' || null
  // project.title will contain the name of the project
});

Project
  .findAndCountAll({
     where: {
        title: {
          [Op.like]: 'foo%'
        }
     },
     offset: 10,
     limit: 2
  })
  .then(result => {
    console.log(result.count);
    console.log(result.rows);
  });

  
