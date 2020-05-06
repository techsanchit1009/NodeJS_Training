const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    min: 1,
    required: true
  },
  isSanitized: {
    type: Boolean,
    default: false
  },
  unit: {
    type: String,
    required: true
  },
  expiryDate: Date,
  createdDate: {
    type: Date,
    default: new Date(),
    required: true
  },
  updatedDate: {
    type: Date,
    default: Date.now(),
    required:true
  },
  category: {
    type: String,
    enum: ['Grocery', 'Medical', 'Fruits&Veg', 'Beverages', 'Babycare', 'Cleaning']
  },
  location: {
    type: String,
    enum: ['Store', 'Kitchen']
  }
});

itemSchema.pre('save', function() {
  this.set({ createdDate: new Date() });
});

itemSchema.pre('updateOne', function() {
  console.log('update triggered');
  this.set({ updatedDate: Date.now() });
});

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;