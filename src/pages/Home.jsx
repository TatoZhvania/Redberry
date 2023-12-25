/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import blogBg from '../assets/Blog-1024x355 1.svg';
import Header from '../components/Header';
import arrow from '../assets/Arrow.png';
import { Link } from 'react-router-dom';
import { truncate } from 'lodash';
import Categories from '../components/Categories';

const Home = () => {
  const baseURL = 'https://api.blog.redberryinternship.ge/api/blogs';
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}`, {
      headers: {
        Authorization:
          'Bearer 8e0c25f0c19bf5ba93c19aabb0f1f8a793e3577444df4ab1d3013f0076cdf24f',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setBlogs(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <Header />
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

      <Categories />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-[4.0625rem] container mx-auto">
        {blogs.map((blog) => (
          <div key={blog.id} className="flex flex-col gap-[1rem] items-start">
            <img
              src={blog.image}
              alt={blog.title}
              className="sm:w-[18.75rem] md:w-full h-96 object-cover rounded-xl"
            />
            <p className="text-xl text-[#1A1A1F] font-bold ">{blog.author}</p>
            <p className="text-[0.75rem] text-[#85858D] ">
              {blog.publish_date}
            </p>
            <h2 className="text-[1.25rem] text-[#1A1A1F] font-bold h-14">
              {truncate(blog.title, { length: 65 })}
            </h2>

            <div className="flex gap-4">
              {blog.categories.map((category) => (
                <p
                  key={category.id}
                  className="h-7 w-full"
                  style={{
                    color: category.text_color,
                    backgroundColor: category.background_color,
                    padding: '6px 10px',
                    borderRadius: '30px',
                  }}
                >
                  {category.name}
                </p>
              ))}
            </div>
            <p className="mb-4 text-[1rem] font-normal h-14">
              {truncate(blog.description, { length: 90 })}
            </p>
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
  );
};

export default Home;
