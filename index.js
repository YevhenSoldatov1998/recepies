const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Recipe = require("./schema/recipe");
const Category = require("./schema/category");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})
dotenv.config()

const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Получение объекта подключения
const db = mongoose.connection;

// Обработка событий подключения
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // Успешное подключение
  console.log("Successfully connected to MongoDB database");
});

app.post('/categories', async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
    });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});
app.get('/recipes/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const recipes = await Recipe.find({category: categoryId});
    res.json(recipes);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});
app.post('/recipes', jsonParser, async (req, res) => {
  try {
    const recipe = new Recipe({
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      category: req.body.category
    });

    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Error creating recipe'});
  }
});
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().select('name');
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Error getting categories'});
  }
});

app.listen(PORT, () => {
  console.log('started application on port %d', PORT)
})