Post.findAll({
    where: {
      authorId: 2
    }
  });
  // SELECT * FROM post WHERE authorId = 2
  
  Post.findAll({
    where: {
      authorId: 12,
      status: 'active'
    }
  });
  // SELECT * FROM post WHERE authorId = 12 AND status = 'active';
  
  Post.destroy({
    where: {
      status: 'inactive'
    }
  });
  // DELETE FROM post WHERE status = 'inactive';
  
  Post.update({
    updatedAt: null,
  }, {
    where: {
      deletedAt: {
        $ne: null
      }
    }
  });
  // UPDATE post SET updatedAt = null WHERE deletedAt NOT NULL;

