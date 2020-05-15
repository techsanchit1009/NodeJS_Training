const router = require('express').Router();
const itemController = require('./controller');

router.route('/items')
      .get(itemController.getAllItems)
      .post(itemController.addItem);

router.route('/item/:id')
      .get(itemController.getItem)
      .put(itemController.updateItem)
      .delete(itemController.deleteItem);


module.exports = router;