const mongoose = require('mongoose');

const wineSchema = mongoose.Schema ({
  name: {
    type: String,
    required: true,
  },
  winery: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Red", "White"],
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: [],
    required: true
  },
  rating: {
    type: Number,
  },
  flavorProfile: {
    type: String,
    enum: [],
    required: true,
  },
  notes: {
    type: String,
  },
})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wines: [wineSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
