
/*
Definition
Scoping allows you to define commonly used queries that you can easily use later. Scopes can include all the same attributes as regular finders, where, include, limit etc.

Scopes are defined in the model definition and can be finder objects, or functions returning finder objects - except for the default scope, which can only be an object:
*/

var Project = sequelize.define('project', {
    // Attributes
  }, {
    defaultScope: {
      where: {
        active: true
      }
    },
    scopes: {
      deleted: {
        where: {
          deleted: true
        }
      },
      activeUsers: {
        include: [
          { model: User, where: { active: true }}
        ]
      }
      random: function () {
        return {
          where: {
            someNumber: Math.random()
          }
        }
      },
      accessLevel: function (value) {
        return {
          where: {
            accessLevel: {
              $gte: value
            }
          }
        }
      }
    }
  });

// useage:
Project.scope('deleted').findAll(); // Removes the default scope
var DeletedProjects = Project.scope('deleted');

DeletedProjects.findAll();
// some time passes

// let's look for deleted projects again!
DeletedProjects.findAll();

