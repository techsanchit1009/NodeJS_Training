const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('hello from index route');
});


module.exports = router;