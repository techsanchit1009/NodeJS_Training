const itemService = require('./service');

module.exports.getAllItems = async (req, res) => {
  const response = await itemService.getAllItems();
  res.send(response);
};

module.exports.getItem = async(req, res) => {
  const response = await itemService.getItem();
  res.send(response);
};

module.exports.addItem = async (req, res) => {
  let response; 
  const item = await itemService.getAllItems(req.body.name);
  if(!item[0]){
    response = await itemService.addItem(req.body);
  } else {
    response = await itemService.updateItem(item[0].id, req.body);
  }
  res.send(response)
};

module.exports.updateItem = async (req, res) => {
  const response = await itemService.updateItem(req.params.id, req.body);
  res.send(response);
};

module.exports.deleteItem = async (req, res) => {
  const response = await itemService.deleteItem(req.params.id);
  res.send(response);
}