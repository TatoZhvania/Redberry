/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const FormCategories = ({ formData, handleInputChange, validation }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://api.blog.redberryinternship.ge/api/categories'
      );

      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
      } else {
        console.error(
          'Failed to fetch categories:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-2 relative">
      {/* <ul className="absolute top-10 bg-white w-[100px]">
        <li>heelo</li>
      </ul> */}
      <label htmlFor="category_id" className="input-heading">
        კატეგორია *
      </label>
      <select
        id="category_id"
        name="category_id"
        className={`input ${
          validation.category_id === 'success'
            ? 'input-success'
            : validation.category_id === 'error'
            ? 'input-error'
            : ''
        }`}
        value={formData.category_id}
        onChange={handleInputChange}
        required
      >
        <option value="" disabled>
          აირჩიეთ კატეგორია
        </option>
        {loadingCategories ? (
          <option disabled>იტვირთება...</option>
        ) : (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default FormCategories;
