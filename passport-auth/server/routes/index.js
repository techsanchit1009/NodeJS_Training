const router = require('express').Router();
const tokenVerify = require('../middleware/tokenVerify.middleware');
const axios = require('axios');

// Dashboard Router
router.get('/', tokenVerify, async (req, res) => { 
  res.send({status: true, name: req.user.name});
});


module.exports = router;