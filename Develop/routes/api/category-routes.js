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

router.post('/', (req, res) => {
  // create a new category
  try {
    Category.create(req.body)
    .then(result => {
      res.json(result)
    })
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(result => {
      res.json(result0)
    })
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(result => {
      res.json(result)
    })
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
