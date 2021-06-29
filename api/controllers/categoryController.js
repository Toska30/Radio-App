const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const getAllCategories = async (req,res)=>{
  let categories = await fetch(`http://api.sr.se/api/v2/programcategories?${json}&${paginationFalse}`);
  categories = await categories.json();
   res.json(categories.programcategories)
}
const getCategoryById = async (req, res)=>{
  let category = await fetch(`http://api.sr.se/api/v2/programcategories/${req.params.categoryId}?${json} `)
  category = await category.json();
  res.json(category)

}
module.exports ={
getAllCategories,
getCategoryById,
}