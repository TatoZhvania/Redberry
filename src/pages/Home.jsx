/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { truncate } from 'lodash';
import Header from '../components/Header';
import Categories from '../components/Categories';
import arrow from '../assets/Arrow.png';
import blogBg from '../assets/Blog-1024x355 1.svg';

const Home = () => {
  const baseURL = 'https://api.blog.redberryinternship.ge/api/blogs';
  const tocken =
    'Bearer 8e0c25f0c19bf5ba93c19aabb0f1f8a793e3577444df4ab1d3013f0076cdf24f';

  const storedCategories =
    JSON.parse(localStorage.getItem('selectedCategories')) || [];
  const [blogs, setBlogs] = useState([]);
  const [selectedCategories, setSelectedCategories] =
    useState(storedCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseURL}`, {
      headers: {
        Authorization: `${tocken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      const updatedCategories = prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId];

      localStorage.setItem(
        'selectedCategories',
        JSON.stringify(updatedCategories)
      );

      return updatedCategories;
    });
  };

  const filteredBlogs = selectedCategories.length
    ? blogs.filter((blog) =>
        blog.categories.some((category) =>
          selectedCategories.includes(category.id)
        )
      )
    : blogs;

  return (
    <>
      <Header />
      {loading ? (
        <div className="text-7xl text-center">Loading...</div>
      ) : (
        <>
          <div className="flex justify-between items-center px-[5.5625rem] bg-[#F3F2FA]">
            <div>
              <h1 className="text-[#1A1A1F] text-3xl md:text-6xl font-bold">
                ბლოგი
              </h1>
            </div>
            <div>
              <img src={blogBg} alt="blog-bg" />
            </div>
          </div>

          <Categories
            selectedCategories={selectedCategories}
            onSelectCategory={toggleCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-[4.0625rem] container mx-auto ">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="flex flex-col gap-4 items-start sm:w-80 md:w-auto "
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="sm:w-[18.75rem] md:w-full h-96 object-cover rounded-xl"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-xl text-[#1A1A1F] font-bold ">
                    {blog.author}
                  </p>
                  <p className="text-[0.75rem] text-[#85858D] ">
                    {blog.publish_date}
                  </p>
                </div>
                <div className="min-h-[3.5rem]">
                  <h2 className="text-[1.25rem] text-[#1A1A1F] font-bold">
                    {truncate(blog.title, { length: 65 })}
                  </h2>
                </div>

                <div>
                  <ul className="flex flex-wrap gap-4 mb-auto">
                    {blog.categories.map((category) => (
                      <li
                        key={category.id}
                        className="w-auto px-4 py-2 rounded-[1.875rem]"
                        style={{
                          color: category.text_color,
                          backgroundColor: category.background_color,
                        }}
                      >
                        {category.title}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="min-h-[3.5rem]">
                  <p className="text-[1rem] font-normal">
                    {truncate(blog.description, { length: 90 })}
                  </p>
                </div>

                <Link
                  to={`/blog/${blog.id}`}
                  className="text-[#5D37F3] text-[1rem] flex items-center gap-1"
                >
                  სრულად ნახვა
                  <img src={arrow} alt="arrow" />
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
