/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const Categories = ({ onSelectCategory }) => {
  const baseURL = 'https://api.blog.redberryinternship.ge/api/categories';
  const storedCategories =
    JSON.parse(localStorage.getItem('selectedCategories')) || [];
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] =
    useState(storedCategories);

  useEffect(() => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleSelectCategory = (categoryId) => {
    // Toggle the category's selection status
    setSelectedCategories((prevSelectedCategories) => {
      const updatedCategories = prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId];

      // Save selected categories to local storage
      localStorage.setItem(
        'selectedCategories',
        JSON.stringify(updatedCategories)
      );

      return updatedCategories;
    });

    // Call the provided onSelectCategory callback
    onSelectCategory(categoryId);
  };

  return (
    <div className="flex justify-center mt-16">
      <ul className="flex flex-wrap justify-center max-w-6xl gap-6 cursor-pointer ">
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => handleSelectCategory(category.id)}
            className="px-4 py-2 rounded-[1.875rem] border"
            style={{
              color: category.text_color,
              backgroundColor: category.background_color,
              border: selectedCategories.includes(category.id)
                ? '1px solid #000'
                : '',
            }}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
