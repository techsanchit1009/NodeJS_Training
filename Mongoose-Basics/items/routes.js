const router = require('express').Router();
const itemController = require('./controller');

router.get('/items', itemController.getAllItems);
router.post('/items', itemController.addItem);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);


module.exports = router;