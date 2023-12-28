/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import backArrow from '../assets/Arrow.svg';
import CustomSlider from '../components/CustomSlider';

const BlogDetail = () => {
  const baseURL = 'https://api.blog.redberryinternship.ge/api/blogs';
  const tocken =
    'Bearer 8e0c25f0c19bf5ba93c19aabb0f1f8a793e3577444df4ab1d3013f0076cdf24f';
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseURL}/${id}`, {
      headers: {
        Authorization: `${tocken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-7xl text-center">Loading...</p>;
  }
  return (
    <>
      <Header />
      <div className="flex flex-col w-full  items-center relative">
        <Link to="/">
          <img
            src={backArrow}
            alt="back-arrow"
            className="absolute left-0 md:left-[4.75rem] top-10 "
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
          <div className="flex gap-3 text-[#85858D] text-xs mb-6 ">
            <p>{blog?.publish_date}</p>
            <p>•</p>
            <p>{blog?.email}</p>
          </div>

          <h1 className="text-[#1A1A1F] text-[2rem] font-bold mb-6 ">
            {blog?.title}
          </h1>

          <div className="flex gap-4 mb-10 ">
            <ul className="flex flex-wrap gap-4 mb-auto">
              {blog.categories?.map((category) => (
                <li
                  key={category.id}
                  className="px-[0.625rem] py-[0.375rem] rounded-[1.875rem] text-xs "
                  style={{
                    color: category.text_color,
                    backgroundColor: category.background_color,
                  }}
                >
                  {category?.title}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[#404049] text-base leading-7 ">
            {blog?.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-[80.5rem] mx-auto mt-[6.125rem] pb-40">
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
