
/* Eager loading 
When you are retrieving data from the database there is a fair chance that you also want to get associations with the same query - this is called eager loading. The basic idea behind that, is the use of the attribute include when you are calling find or findAll. Lets assume the following setup:
*/



var User = sequelize.define('user', { name: Sequelize.STRING })
  , Task = sequelize.define('task', { name: Sequelize.STRING })
  , Tool = sequelize.define('tool', { name: Sequelize.STRING })

Task.belongsTo(User)
User.hasMany(Task)
User.hasMany(Tool, { as: 'Instruments' })

sequelize.sync().then(function() {
  // this is where we continue ...
})

Task.findAll({ include: [ User ] }).then(function(tasks) {
    console.log(JSON.stringify(tasks))
  
    /*
      [{
        "name": "A Task",
        "id": 1,
        "createdAt": "2013-03-20T20:31:40.000Z",
        "updatedAt": "2013-03-20T20:31:40.000Z",
        "userId": 1,
        "user": {
          "name": "John Doe",
          "id": 1,
          "createdAt": "2013-03-20T20:31:45.000Z",
          "updatedAt": "2013-03-20T20:31:45.000Z"
        }
      }]
    */
  })

  /* Notice that the accessor (the User property in the resulting instance) is singular because the association is one-to-something.
    Next thing: Loading of data with many-to-something associations! */
    User.findAll({ include: [ Task ] }).then(function(users) {
        console.log(JSON.stringify(users))
      
        /*
          [{
            "name": "John Doe",
            "id": 1,
            "createdAt": "2013-03-20T20:31:45.000Z",
            "updatedAt": "2013-03-20T20:31:45.000Z",
            "tasks": [{
              "name": "A Task",
              "id": 1,
              "createdAt": "2013-03-20T20:31:40.000Z",
              "updatedAt": "2013-03-20T20:31:40.000Z",
              "userId": 1
            }]
          }]
        */
      })
      User.findAll({ include: ['Instruments'] }).then(function(users) {
        console.log(JSON.stringify(users))
      
        /*
          [{
            "name": "John Doe",
            "id": 1,
            "createdAt": "2013-03-20T20:31:45.000Z",
            "updatedAt": "2013-03-20T20:31:45.000Z",
            "Instruments": [{
              "name": "Toothpick",
              "id": 1,
              "createdAt": null,
              "updatedAt": null,
              "userId": 1
            }]
          }]
        */
      })
      
      User.findAll({ include: [{ association: 'Instruments' }] }).then(function(users) {
        console.log(JSON.stringify(users))
      
        /*
          [{
            "name": "John Doe",
            "id": 1,
            "createdAt": "2013-03-20T20:31:45.000Z",
            "updatedAt": "2013-03-20T20:31:45.000Z",
            "Instruments": [{
              "name": "Toothpick",
              "id": 1,
              "createdAt": null,
              "updatedAt": null,
              "userId": 1
            }]
          }]
        */
      })

      User.findAll({
        include: [{
            model: Tool,
            as: 'Instruments',
            where: { name: { $like: '%ooth%' } }
        }]
    }).then(function(users) {
        console.log(JSON.stringify(users))
    
        /*
          [{
            "name": "John Doe",
            "id": 1,
            "createdAt": "2013-03-20T20:31:45.000Z",
            "updatedAt": "2013-03-20T20:31:45.000Z",
            "Instruments": [{
              "name": "Toothpick",
              "id": 1,
              "createdAt": null,
              "updatedAt": null,
              "userId": 1
            }]
          }],
    
          [{
            "name": "John Smith",
            "id": 2,
            "createdAt": "2013-03-20T20:31:45.000Z",
            "updatedAt": "2013-03-20T20:31:45.000Z",
            "Instruments": [{
              "name": "Toothpick",
              "id": 1,
              "createdAt": null,
              "updatedAt": null,
              "userId": 1
            }]
          }],
        */
      })

/* 
Ordering Eager Loaded Associations
In the case of a one-to-many relationship.
*/
Company.findAll({ include: [ Division ], order: [ [ Division, 'name' ] ] });
Company.findAll({ include: [ Division ], order: [ [ Division, 'name', 'DESC' ] ] });
Company.findAll({
  include: [ { model: Division, as: 'Div' } ],
  order: [ [ { model: Division, as: 'Div' }, 'name' ] ]
});
Company.findAll({
  include: [ { model: Division, as: 'Div' } ],
  order: [ [ { model: Division, as: 'Div' }, 'name', 'DESC' ] ]
});
Company.findAll({
  include: [ { model: Division, include: [ Department ] } ],
  order: [ [ Division, Department, 'name' ] ]
});

/*  the case of many-to-many joins, you are also able to sort by attributes in the through table. */
Company.findAll({
    include: [ { model: Division, include: [ Department ] } ],
    order: [ [ Division, DepartmentDivision, 'name' ] ]
});

/* NESTED EAGER LOADER */
User.findAll({
    include: [
      {model: Tool, as: 'Instruments', include: [
        {model: Teacher, include: [ /* etc */]}
      ]}
    ]
  }).then(function(users) {
    console.log(JSON.stringify(users))
  
    /*
      [{
        "name": "John Doe",
        "id": 1,
        "createdAt": "2013-03-20T20:31:45.000Z",
        "updatedAt": "2013-03-20T20:31:45.000Z",
        "Instruments": [{ // 1:M and N:M association
          "name": "Toothpick",
          "id": 1,
          "createdAt": null,
          "updatedAt": null,
          "userId": 1,
          "Teacher": { // 1:1 association
            "name": "Jimi Hendrix"
          }
        }]
      }]
    */
  })

  User.findAll({
    include: [{
      model: Tool,
      as: 'Instruments',
      include: [{
        model: Teacher,
        where: {
          school: "Woodstock Music School"
        },
        required: false
      }]
    }]
  }).then(function(users) {
    /* ... */
  })
  