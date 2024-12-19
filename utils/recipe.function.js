const { Recipe } = require("../models/recipe.model");

const addRecipe = async (recipeData) => {
  try {
    const recipe = {
      title: recipeData.title,
      cuisine: recipeData.cuisine,
      imageUrl: recipeData.imageUrl,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
    };

    const newRecipe = new Recipe(recipe);
    await newRecipe.save();
    console.log("added", newRecipe);
    return newRecipe;
  } catch (error) {
    throw new Error("Failed to add recipe");
  }
};

const deletedRecipe = async (recipeId) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(recipeId);
    return recipe;
  } catch (error) {
    throw error;
  }
};

const getAllRecipe = async () => {
  try {
    const recipe = await Recipe.find();
    return recipe;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addRecipe,
  deletedRecipe,
  getAllRecipe,
};
