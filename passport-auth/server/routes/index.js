const router = require('express').Router();
const tokenVerify = require('../middleware/tokenVerify.middleware');

// Dashboard Router
router.get('/', tokenVerify, (req, res) => { 
  res.send({status: true, name: req.user.name});
});


module.exports = router;