const item = require('./model');

module.exports.addItem = async ({
  name,
  quantity,
  isSanitized,
  unit,
  expiryDate,
  category,
  location
}) => {
  const response = await item.create({
    name,
    quantity,
    isSanitized,
    unit,
    expiryDate: new Date(expiryDate),
    category,
    location
  });

  return response;
};


module.exports.getAllItems = async (name) => {
  let response;
  if(!name){
    response = await item.find();
  } else {
    response = await item.find({name: name});
  }
  return response;
};


module.exports.updateItem = async (id, updatingItem) => {
  const response = await item.updateOne({
    _id: id
  }, {
    ...updatingItem
  });
  return response;
};

module.exports.deleteItem = async (id) => {
  const response = await item.deleteOne({
    _id: id
  });
  return response;
};