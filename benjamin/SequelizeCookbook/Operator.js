$and: {a: 5}           // AND (a = 5)
$or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
$gt: 6,                // > 6
$gte: 6,               // >= 6
$lt: 10,               // < 10
$lte: 10,              // <= 10
$ne: 20,               // != 20
$eq: 3,                // = 3
$not: true,            // IS NOT TRUE
$between: [6, 10],     // BETWEEN 6 AND 10
$notBetween: [11, 15], // NOT BETWEEN 11 AND 15
$in: [1, 2],           // IN [1, 2]
$notIn: [1, 2],        // NOT IN [1, 2]
$like: '%hat',         // LIKE '%hat'
$notLike: '%hat'       // NOT LIKE '%hat'
$iLike: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
$notILike: '%hat'      // NOT ILIKE '%hat'  (PG only)
$like: { $any: ['cat', 'hat']}
                       // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike
$overlap: [1, 2]       // && [1, 2] (PG array overlap operator)
$contains: [1, 2]      // @> [1, 2] (PG array contains operator)
$contained: [1, 2]     // <@ [1, 2] (PG array contained by operator)
$any: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)

$col: 'user.organization_id' // = "user"."organization_id", with dialect specific column identifiers, PG in this example

/* RANK */
// All the above equality and inequality operators plus the following:

$contains: 2           // @> '2'::integer (PG range contains element operator)
$contains: [1, 2]      // @> [1, 2) (PG range contains range operator)
$contained: [1, 2]     // <@ [1, 2) (PG range is contained by operator)
$overlap: [1, 2]       // && [1, 2) (PG range overlap (have points in common) operator)
$adjacent: [1, 2]      // -|- [1, 2) (PG range is adjacent to operator)
$strictLeft: [1, 2]    // << [1, 2) (PG range strictly left of operator)
$strictRight: [1, 2]   // >> [1, 2) (PG range strictly right of operator)
$noExtendRight: [1, 2] // &< [1, 2) (PG range does not extend to the right of operator)
$noExtendLeft: [1, 2]  // &> [1, 2) (PG range does not extend to the left of operator)

/* COMBINATION */
{
    rank: {
      $or: {
        $lt: 1000,
        $eq: null
      }
    }
  }
  // rank < 1000 OR rank IS NULL
  
  {
    createdAt: {
      $lt: new Date(),
      $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
    }
  }
  // createdAt < [timestamp] AND createdAt > [timestamp]
  
  {
    $or: [
      {
        title: {
          $like: 'Boat%'
        }
      },
      {
        description: {
          $like: '%boat%'
        }
      }
    ]
  }
  // title LIKE 'Boat%' OR description LIKE '%boat%'

  /* Nested Object */
  {
    meta: {
      video: {
        url: {
          $ne: null
        }
      }
    }
  }

//  Nested key
{
  "meta.audio.length": {
    $gt: 20
  }
}

//Containment
{
  "meta": {
    $contains: {
      site: {
        url: 'http://google.com'
      }
    }
  }
}

// Relations / Associations
// Find all projects with a least one task where task.state === project.task
Project.findAll({
    include: [{
        model: Task,
        where: { state: Sequelize.col('project.state') }
    }]
})

// Pagination / Limiting
// Fetch 10 instances/rows
Project.findAll({ limit: 10 })

// Skip 8 instances/rows
Project.findAll({ offset: 8 })

// Skip 5 instances and fetch the 5 after that
Project.findAll({ offset: 5, limit: 5 })

/* Ordering
order takes an array of items to order the query by. Generally you will want to use a tuple/array of either attribute, direction or just direction to ensure proper escaping. */

something.findOne({
  order: [
    // Will escape username and validate DESC against a list of valid direction parameters
    ['username', 'DESC'],

    // Will order by max(age)
    sequelize.fn('max', sequelize.col('age')),

    // Will order by max(age) DESC
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],

    // Will order by  otherfunction(`col1`, 12, 'lalala') DESC
    [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],

    // Will order by name on an associated User
    [User, 'name', 'DESC'],

    // Will order by name on an associated User aliased as Friend
    [{model: User, as: 'Friend'}, 'name', 'DESC'],

    // Will order by name on a nested associated Company of an associated User
    [User, Company, 'name', 'DESC'],
  ]
  // All the following statements will be treated literally so should be treated with care
  order: 'convert(user_name using gbk)'
  order: 'username DESC'
  order: sequelize.literal('convert(user_name using gbk)')
})

