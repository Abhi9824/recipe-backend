const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const cors = require("cors");
const { initializeDatabase } = require("./db/db");
const corsOption = {
  origin: "*",
  Credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
initializeDatabase();

const PORT = process.env.PORT || 3000;

const { Recipe } = require("./models/recipe.model");
const {
  addRecipe,
  deleteRecipe,
  getAllRecipe,
} = require("./utils/recipe.function");

//add recipe
app.post("/add/recipe", async (req, res) => {
  try {
    const { title, cuisine, imageUrl, ingredients, instructions } = req.body;
    const newRecipe = await addRecipe({
      title,
      cuisine,
      imageUrl,
      ingredients,
      instructions,
    });

    if (newRecipe) {
      res
        .status(200)
        .json({ message: "Recipe added succefully", recipe: newRecipe });
    } else {
      res.status(400).json({ message: "Failed to add recipe" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/recipe/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const deleteRecipe = await deleteRecipe(recipeId);
    if (deleteRecipe) {
      res
        .status(200)
        .json({ message: "Recipe deleted successfully", recipe: deleteRecipe });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/recipe/allrecipes", async (req, res) => {
  try {
    const recipe = await getAllRecipe();
    if (recipe) {
      res.status(200).json({ message: "All recipe fetched", recipe });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  res.send("Recipe Application");
});
app.listen(PORT, () => {
  console.log(`Server is listening ar PORT ${PORT}`);
});
