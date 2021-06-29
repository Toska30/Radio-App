import { createContext, useEffect, useState } from "react";
export const CategoryContext = createContext();

const CategoryContextProvider = (props) => {
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(null);
 

  useEffect(() => {
    // eslint-disable-next-line
    getAllCategories();
  }, []);


  //category by id
  const getCategoryById = async (categoryId) => {
    let category = await fetch(`/api/v1/categories/${categoryId}`);
    category = await category.json();
    setCategory(category.programcategory.name);
  };

  //all categories
  const getAllCategories = async () => {
    let categories = await fetch(`/api/v1/categories`);
    categories = await categories.json();
    setCategories(categories);
  };
  
  const values = { getCategoryById,category,categories};

  return (
    <CategoryContext.Provider value={values}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
