/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const Categories = () => {
  const baseURL = 'https://api.blog.redberryinternship.ge/api/categories';
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="flex justify-center mt-16">
      <ul className="flex flex-wrap justify-center max-w-6xl gap-6">
        {categories.map((category) => (
          <li
            key={category.id}
            style={{
              color: category.text_color,
              backgroundColor: category.background_color,
              padding: '8px 16px',
              margin: '5px',
              borderRadius: '30px',
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
