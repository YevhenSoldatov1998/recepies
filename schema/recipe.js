const mongoose = require('mongoose');

// Определение схемы рецептов
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: String,
  createdAt: { type: Date, default: Date.now },
});

// Создание модели рецептов на основе схемы
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;