const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  updateThought,
  removeThought
} = require('../../controllers/thought-controller');

// /api/thoughts
router 
  .route('/')
  .get(getAllThought)
  .post(addThought);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

module.exports = router;