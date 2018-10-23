// search for known ids
Project.findById(123).then(function(project) {
    // project will be an instance of Project and stores the content of the table entry
    // with id 123. if such an entry is not defined you will get null
  })
  
  // search for attributes
  Project.findOne({ where: {title: 'aProject'} }).then(function(project) {
    // project will be the first entry of the Projects table with the title 'aProject' || null
  })
  
  
  Project.findOne({
    where: {title: 'aProject'},
    attributes: ['id', ['name', 'title']]
  }).then(function(project) {
    // project will be the first entry of the Projects table with the title 'aProject' || null
    // project.title will contain the name of the project
  })

  ////////////////////////

  User
  .findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
  .spread(function(user, created) {
    console.log(user.get({
      plain: true
    }))
    console.log(created)

    /*
      {
        username: 'sdepold',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      }
      created: true
    */
  })


  Project
  .findAndCountAll({
     where: {
        title: {
          $like: 'foo%'
        }
     },
     offset: 0,
     limit: 10
  })
  .then(function(result) {
    console.log(result.count);
    console.log(result.rows);
  });

  //////////////////

  User.findAndCountAll({
    include: [
       { model: Profile, required: true}
    ],
    limit: 3
  });

  User.findAndCountAll({
    include: [
       { model: Profile, where: { active: true }}
    ],
    limit: 3
  });

  ///////////////////////

  // find multiple entries
Project.findAll().then(function(projects) {
    // projects will be an array of all Project instances
  })
  
  // also possible:
  Project.all().then(function(projects) {
    // projects will be an array of all Project instances
  })
  
  // search for specific attributes - hash usage
  Project.findAll({ where: { name: 'A Project' } }).then(function(projects) {
    // projects will be an array of Project instances with the specified name
  })
  
  // search with string replacements
  Project.findAll({ where: ["id > ?", 25] }).then(function(projects) {
    // projects will be an array of Projects having a greater id than 25
  })
  
  // search within a specific range
  Project.findAll({ where: { id: [1,2,3] } }).then(function(projects) {
    // projects will be an array of Projects having the id 1, 2 or 3
    // this is actually doing an IN query
  })
  
  Project.findAll({
    where: {
      id: {
        $and: {a: 5}           // AND (a = 5)
        $or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
        $gt: 6,                // id > 6
        $gte: 6,               // id >= 6
        $lt: 10,               // id < 10
        $lte: 10,              // id <= 10
        $ne: 20,               // id != 20
        $between: [6, 10],     // BETWEEN 6 AND 10
        $notBetween: [11, 15], // NOT BETWEEN 11 AND 15
        $in: [1, 2],           // IN [1, 2]
        $notIn: [1, 2],        // NOT IN [1, 2]
        $like: '%hat',         // LIKE '%hat'
        $notLike: '%hat'       // NOT LIKE '%hat'
        $iLike: '%hat'         // ILIKE '%hat' (case insensitive)  (PG only)
        $notILike: '%hat'      // NOT ILIKE '%hat'  (PG only)
        $overlap: [1, 2]       // && [1, 2] (PG array overlap operator)
        $contains: [1, 2]      // @> [1, 2] (PG array contains operator)
        $contained: [1, 2]     // <@ [1, 2] (PG array contained by operator)
        $any: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)
      },
      status: {
        $not: false,           // status NOT FALSE
      }
    }
  })

  /* COMPLEX FILTER  */
  const query = `SELECT *
  FROM Projects
  WHERE (
    Projects.name = 'a project'
     AND (Projects.id IN (1,2,3) OR Projects.id > 10)
  )
  LIMIT 1;`;

  Project.findOne({
    where: {
      name: 'a project',
      $or: [
        { id: [1,2,3] },
        { id: { $gt: 10 } }
      ]
    }
  })
  
  Project.findOne({
    where: {
      name: 'a project',
      id: {
        $or: [
          [1,2,3],
          { $gt: 10 }
        ]
      }
    }
  })

  omething.findOne({
    order: [
      'name',
      // will return `name`
      'username DESC',
      // will return `username DESC` -- i.e. don't do it!
      ['username', 'DESC'],
      // will return `username` DESC
      sequelize.fn('max', sequelize.col('age')),
      // will return max(`age`)
      [sequelize.fn('max', sequelize.col('age')), 'DESC'],
      // will return max(`age`) DESC
      [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],
      // will return otherfunction(`col1`, 12, 'lalala') DESC
      [sequelize.fn('otherfunction', sequelize.fn('awesomefunction', sequelize.col('col'))), 'DESC']
      // will return otherfunction(awesomefunction(`col`)) DESC, This nesting is potentially infinite!
      [{ raw: 'otherfunction(awesomefunction(`col`))' }, 'DESC']
      // This won't be quoted, but direction will be added
    ]
  })

  /* RAW QUERY */
  Project.findAll({ where: {  }, raw: true })

  /* MAX - MIN - SUM */
/*
  Let's assume 3 person objects with an attribute age.
  The first one is 10 years old,
  the second one is 5 years old,
  the third one is 40 years old.
*/

Project.max('age').then(function(max) {
    // this will return 40
  })
  
  Project.max('age', { where: { age: { lt: 20 } } }).then(function(max) {
    // will be 10
})

/*
  Let's assume 3 person objects with an attribute age.
  The first one is 10 years old,
  the second one is 5 years old,
  the third one is 40 years old.
*/

Project.min('age').then(function(min) {
    // this will return 5
  })
  
  Project.min('age', { where: { age: { $gt: 5 } } }).then(function(min) {
    // will be 10
})

/*
  Let's assume 3 person objects with an attribute age.
  The first one is 10 years old,
  the second one is 5 years old,
  the third one is 40 years old.
*/
Project.sum('age').then(function(sum) {
    // this will return 55
  })
  
Project.sum('age', { where: { age: { $gt: 5 } } }).then(function(sum) {
    // will be 50
})






  