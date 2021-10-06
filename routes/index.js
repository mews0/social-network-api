const router = require('express').Router();
const apiRoutes = require('./api'); // import all of the API routes from /api/index.js (index.js is implied)

router.use('/api', apiRoutes); // add prefix of `/api` to all of the api routes imported from the `api` directory

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;