export const responseAPI = (message, data = null) => {
  let result = {
    message,
    data,
  };
  return result;
};

export const recipeFormatter = (recipe, comments) => {
  const result = {
    id: recipe.id,
    author: recipe.name,
    title: recipe.title,
    ingredients: recipe.ingredients.split(","),
    image_url: recipe.image_url,
    video_url: recipe.video_url,
    category: recipe.category_name,
    like: recipe.liked,
    comments: comments,
  };

  return result;
};

export const recipesFormatter = (recipes) => {
  const result = [];
  for (const obj of recipes) {
    result.push({
      id: obj.id,
      title: obj.title,
      image_url: obj.image_url,
      category: obj.category_name,
      like: obj.liked,
    });
  }
  return result;
};

export const commentsFormatter = (comments) => {
  const result = [];
  for (const obj of comments) {
    result.push({
      name: obj.name,
      comment: obj.comment,
    });
  }
  return result;
};
