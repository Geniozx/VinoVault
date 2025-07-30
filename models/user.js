const mongoose = require('mongoose');

const vinosSchema = mongoose.Schema ({
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
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Cabernet Sauvignon', 'Merlot', 'Pinot Nior', 'Shiraz', 'Malbec', 
      'Zinfandel', 'Grenache', 'Sangiovese', 'Tempranillo', 'Carmenere', 'Nebbiolo', 'Cabernet Franc', 
      'Syrah', 'Lambrusco', 'Red Blends', 'Port', 'Banyus', 'Nero d\'Avola', 'Vin Santo', 'Recioto Della Valpolicella', 
      'Barbera', 'Bobal', 'Alicante Henri Bouschet', 'Carignan', 'Cisnaut', 'Dolcetto', 'Gamay', 
      'Mourvèdre', 'Brachetto d\'Acqui', 'Primitivo', 'Saperavi', 'Pinotage', 'Montepulciano', 'Ruby Cabernet', 
      'Chardonnay', 'Sauvignon Blanc', 'Riesling', 'Pinot Grigio/Pinot Gris', 'Moscato/Muscat Blanc', 'Pinot Blanc', 
      'Gewürztraminer', 'Viognier', 'Chenin Blanc', 'Albariño', 'Semillon', 'Verdejo', 'Vermentino', 'Grüner Veltliner', 
      'Torrontés', 'Marsanne', 'Roussane', 'Cortese', 'Arneis', 'Assyrtiko', 'Grenache Blanc/Garnacha Blanca', 
      'Garganega', 'Fiano', 'White Blend' ],
    required: true
  },
  rating: {
    type: Number,
  },
  flavorProfile: {
    type: String,
    enum: ['Dry', 'Sweet', 'Tart', 'Crisp', 'Acidic', 'Bitter', 'Smooth', 'Soft', 'Full-Body', 'Light-Body', 'Medium-Body', 
      'Fruity', 'Earthy', 'Spicy', 'Herbal', 'Woody', 'Stone Fruits', 'Red Fruits', 'Black Fruits', 'Tropical Fruits', 
      'Pome Fruits', 'White Flowers', 'Rose', 'Violet', 'Honeysuckle', 'Wildflowers', 'Mushroom', 'Wet Stone', 'Leather', 
      'Tobacco', 'Black Pepper', 'Cinnamon', 'Clove', 'Smoky/Burnt', 'Nutty', 'Buttery', 'Vegetative',],
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
  wines: [vinosSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
