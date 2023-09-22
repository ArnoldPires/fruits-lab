// Import Mongoose
const mongoose = require('mongoose');

// Create your data schema
const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true},
  color: { type: String, required: true},
  readyToEat: Boolean
});

// Create your model using your schema
const Fruit = mongoose.model('Fruit', fruitSchema);

// Export your newly created model
module.exports = Fruit;