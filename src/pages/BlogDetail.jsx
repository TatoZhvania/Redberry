/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import backArrow from '../assets/Arrow.svg';
import CustomSlider from '../components/CustomSlider';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    fetch(`https://api.blog.redberryinternship.ge/api/blogs/${id}`, {
      headers: {
        Authorization:
          'Bearer 8e0c25f0c19bf5ba93c19aabb0f1f8a793e3577444df4ab1d3013f0076cdf24f',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
      })
      .catch((error) => console.error('Error fetching blog details:', error));
  }, [id]);

  return (
    <>
      <Header />
      <div className="flex flex-col w-full min-h-screen items-center relative">
        <Link to="/">
          <img
            src={backArrow}
            alt="back-arrow"
            className="absolute left-[4.75rem] top-10 "
          />
        </Link>

        <div className="mt-10 max-w-2xl">
          <img
            src={blog?.image}
            alt={blog?.title}
            className="w-full h-80 mb-10 object-cover rounded-xl"
          />
          <p className="text-[#1A1A1F] text-base mb-2 font-[500]">
            {blog?.author}
          </p>
          <div className="flex gap-3 text-[#85858D] text-xs mb-6">
            <p>{blog?.publish_date}</p>
            <p>{blog?.email}</p>
          </div>

          <h1 className="text-[#1A1A1F] text-[2rem] font-bold mb-6 ">
            {blog?.title}
          </h1>

          <div className="flex gap-4 mb-10 ">
            {blog.categories?.map((category) => (
              <p
                key={category.id}
                className="h-7"
                style={{
                  color: category.text_color,
                  backgroundColor: category.background_color,
                  padding: '6px 10px',
                  borderRadius: '1.875rem',
                }}
              >
                {category?.name}
              </p>
            ))}
          </div>
          <p className="text-[#404049] text-base leading-7">
            {blog?.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-[80.5rem] mx-auto mt-[6.125rem]">
        <h1 className="text-[#1A1A1F] text-[2rem] font-bold text-start">
          მსგავსი სტატიები
        </h1>
        <div className="flex flex-col mt-10">
          <CustomSlider categoryId={blog.categories?.[0]?.id} />
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
