"use client";
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  // create
  const [name, setName] = useState("");
  // fetch
  const [categories, setCategories] = useState([]);
  // update and delete
  const [updatingCategory, setUpdatingCategory] = useState(null);

  const createCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Category created");
        setName("");
        setCategories([data, ...categories]);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Try again");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        setCategories(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Try again");
    }
  };

  const fetchCategoriesPublic = async () => {
    try {
      const response = await fetch(`${process.env.API}/categories`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        setCategories(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Try again");
    }
  };

  const updateCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatingCategory),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedCategory = await response.json();
      // Update the categories state with the updated category
      setCategories((prevCategories) =>
        prevCategories.map((c) =>
          c._id === updatedCategory._id ? updatedCategory : c
        )
      );
      // Clear the categoryUpdate state
      setUpdatingCategory(null);
      toast.success("Category updated successfully");
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error occurred while updating the category");
    }
  };

  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory?._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Category deleted");
        setCategories(
          categories.filter((category) => category._id !== updatingCategory._id)
        );
        setUpdatingCategory(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Try again");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        name,
        setName,
        categories,
        setCategories,
        updatingCategory,
        setUpdatingCategory,
        createCategory,
        fetchCategories,
        fetchCategoriesPublic,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
