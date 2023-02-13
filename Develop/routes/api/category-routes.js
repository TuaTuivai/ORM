const router = require('express').Router();
const { Category, Product } = require('../../models');

// try {
    
// } catch(err) {
//   console.log(err)
//   res.status(500).json(err)
// }


// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    Category.findAll({
      include: Product
    })
    .then(results => {
      res.json(results)
    })
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    Category.findByPk(req.params.id, {
      include: Product
    })
    .then(result => {
      res.json(result)
    })
    
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await Category.create(req.body);
    res.json(result);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create category' });
  }
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(result => {
    // Check if the category was updated successfully
    if (result[0] === 0) {
      res.status(404).json({ message: "No category found with that ID." });
      return;
    }
    res.json({ message: "Category updated successfully." });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Internal server error.", error: err });
  });
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(result => {
    if (result === 0) {
      res.status(404).json({ message: "Category with the specified ID does not exist." });
    } else {
      res.status(200).json({ message: "Category successfully deleted." });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Error deleting the category." });
  });
});


module.exports = router;
