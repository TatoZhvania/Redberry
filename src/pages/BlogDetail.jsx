/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import backArrow from '../assets/Arrow.svg';

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
            className="absolute left-[76px] top-[40px]"
          />
        </Link>

        <div className="mt-[40px] max-w-2xl">
          <img
            src={blog?.image}
            alt={blog?.title}
            className="w-full h-[320px] mb-[40px]"
          />
          <p className="text-[#1A1A1F] text-[16px] mb-[8px] font-[500]">
            {blog?.author}
          </p>
          <div className="flex gap-3 text-[#85858D] text-[12px] mb-[24px]">
            <p>{blog?.publish_date}</p>
            <p>liekvaracxelai@redberry</p>
          </div>

          <h1 className="text-[#1A1A1F] text-[32px] font-bold mb-[24px]">
            {blog?.title}
          </h1>

          <div className="flex gap-[16px] mb-[40px]">
            {blog?.categories?.map((category) => (
              <span
                key={category?.id}
                style={{
                  color: category?.text_color,
                  backgroundColor: category?.background_color,
                  padding: '4px',
                  margin: '2px',
                  borderRadius: '4px',
                }}
              >
                {category?.name}
              </span>
            ))}
          </div>
          <p className="text-[#404049] text-[16px]">{blog?.description}</p>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
