/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';

const FormCategories = ({ handleInputChange, validation }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

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

  const saveSelectedCategoryIdsToLocalStorage = () => {
    localStorage.setItem(
      'selectedCategoryIds',
      JSON.stringify(selectedCategoryIds)
    );
  };

  const getSelectedCategoryIdsFromLocalStorage = () => {
    const storedIds = localStorage.getItem('selectedCategoryIds');
    if (storedIds) {
      setSelectedCategoryIds(JSON.parse(storedIds));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    getSelectedCategoryIdsFromLocalStorage();
  }, []);

  useEffect(() => {
    saveSelectedCategoryIdsToLocalStorage();
    handleInputChange({
      target: { name: 'category_id', value: selectedCategoryIds },
    });
  }, [selectedCategoryIds]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategoryIds((prevIds) => [...prevIds, category.id]);
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategoryIds((prevIds) =>
      prevIds.filter((id) => id !== category.id)
    );
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="relative" ref={dropdownRef}>
        <label htmlFor="category_id" className="input-heading">
          კატეგორია *
        </label>
        <div
          className={`input mt-[3px] cursor-pointer relative flex items-center overflow-hidden ${
            selectedCategoryIds.length > 0
              ? 'input-success'
              : validation.category_id === 'error'
              ? 'input-error'
              : ''
          } `}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedCategoryIds.length > 0 ? (
            <div className="flex items-center absolute left-0">
              {categories
                .filter((category) => selectedCategoryIds.includes(category.id))
                .map((selectedCategory) => (
                  <div
                    key={selectedCategory.id}
                    className="rounded-[1.875rem] py-2 px-3 m-2 min-w-fit"
                    style={{
                      color: selectedCategory.text_color,
                      backgroundColor: selectedCategory.background_color,
                    }}
                    onClick={() => handleRemoveCategory(selectedCategory)}
                  >
                    {selectedCategory.title}
                  </div>
                ))}
            </div>
          ) : (
            <div>Select a category</div>
          )}
        </div>
        {showDropdown && (
          <div className="absolute top-[75px] left-0 bg-[#FFF] w-[18rem] h-[7.625rem] flex flex-wrap overflow-y-auto rounded-xl">
            {loadingCategories ? (
              <div>Loading...</div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="px-4 py-2 rounded-[1.875rem] m-2 cursor-pointer"
                  onClick={() => handleCategorySelect(category)}
                  style={{
                    color: category.text_color,
                    backgroundColor: category.background_color,
                  }}
                >
                  {category.title}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormCategories;
