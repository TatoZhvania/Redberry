/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { truncate } from 'lodash';
import { Link } from 'react-router-dom';
import arrow from '../assets/Arrow.png';
import blueArrowRight from '../assets/blue-arrow-right.png';
import blueArrowLeft from '../assets/blue-arrow-left.png';
import greyArrowRight from '../assets/grey-arrow-right.png';
import greyArrowLeft from '../assets/grey-arrow-left.png';

const CustomPrevArrow = ({ onClick, className }) => (
  <img
    src={className === 'slick-disabled' ? greyArrowLeft : blueArrowLeft}
    alt="prev-arrow"
    className={`slick-arrow  ${className} absolute top-[-3.938rem] left-[90%]`}
    onClick={onClick}
  />
);

const CustomNextArrow = ({ onClick, className }) => (
  <img
    src={className === 'slick-disabled' ? greyArrowRight : blueArrowRight}
    alt="next-arrow"
    className={`slick-arrow  ${className} absolute top-[-3.938rem] right-5`}
    onClick={onClick}
  />
);

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const CustomSlider = ({ categoryId }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.blog.redberryinternship.ge/api/blogs?category=${categoryId}`,
      {
        headers: {
          Authorization:
            'Bearer 8e0c25f0c19bf5ba93c19aabb0f1f8a793e3577444df4ab1d3013f0076cdf24f',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Related Blogs API Response:', data);
        setRelatedBlogs(data.data || []);
      })
      .catch((error) => console.error('Error fetching related blogs:', error));
  }, [categoryId]);

  return (
    <Slider {...sliderSettings} className="w-[80.5rem] h-auto">
      {relatedBlogs.map((relatedBlog) => (
        <div key={relatedBlog.id}>
          <img
            src={relatedBlog.image}
            alt={relatedBlog.title}
            className="w-[25.5rem] h-[20.5rem] object-cover mb-2 rounded-xl"
          />
          <p className="text-[#1A1A1F] text-base mb-2 font-[500]">
            {relatedBlog.author}
          </p>
          <div className="flex gap-3 text-[#85858D] text-xs mb-4">
            <p>{relatedBlog.publish_date}</p>
            <p>{relatedBlog.email}</p>
          </div>

          <h1 className="text-[#1A1A1F] text-xl font-bold  w-[25.5rem] h-[3.5rem] mb-4">
            {truncate(relatedBlog.title, { length: 60 })}
          </h1>

          <div className="flex gap-4 mb-4">
            {relatedBlog.categories?.map((category) => (
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
                {category.name}
              </p>
            ))}
          </div>

          <p className="text-[1rem] font-normal w-[25.5rem] h-[3.5rem] mb-4">
            {truncate(relatedBlog.description, { length: 90 })}
          </p>
          <Link
            to={`/blog/${relatedBlog.id}`}
            className="text-[#5D37F3] text-[1rem] flex items-center gap-1"
          >
            სრულად ნახვა
            <img src={arrow} alt="arrow" />
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
