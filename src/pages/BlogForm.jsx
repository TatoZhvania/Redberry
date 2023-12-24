/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import logo from '../assets/LOGO-02 3.svg';
import backArrow from '../assets/greyArrow.svg';
import { Link, useNavigate } from 'react-router-dom';
import FormModal from '../components/FormModal';
import FormCategories from '../components/FormCategories';

const BlogForm = () => {
  const [formData, setFormData] = useState(new FormData());
  const [validation, setValidation] = useState({
    author: null,
    title: null,
    description: null,
    publish_date: null,
    email: null,
    category_id: null,
  });

  // const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    switch (name) {
      case 'image':
        const fileInput = document.getElementById('image');
        const file = fileInput.files[0];

        if (file && file.type.startsWith('image/')) {
          formData.append('image', file);
        } else {
          isValid = false;
        }
        break;

      case 'author':
        const isMinLength = value.length >= 4;
        const words = value.split(/\s+/);
        const isTwoWords = words.length >= 2;
        const isGeorgian = /^[\u10A0-\u10FF\s]+$/.test(value);
        isValid = isMinLength && isTwoWords && isGeorgian;
        break;

      case 'title':
        isValid = value.length >= 2;
        break;

      case 'description':
        isValid = value.length >= 2;
        break;

      case 'publish_date':
        isValid = value.trim() !== '';
        break;

      case 'email':
        isValid = /@redberry\.ge$/.test(value);
        break;

      case 'category_id':
        isValid = value !== '';
        break;

      default:
        break;
    }

    setValidation((prevValidation) => ({
      ...prevValidation,
      [name]: isValid ? 'success' : 'error',
    }));

    formData.set(name, value);
  };

  const isFormValid = Object.values(validation).every(
    (status) => status === 'success'
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    try {
      const response = await fetch(
        'https://api.blog.redberryinternship.ge/api/blogs',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer 8e0c25f0c19bf5ba93c19aabb0f1f8a793e3577444df4ab1d3013f0076cdf24f',
          },
          body: formData,
        }
      );

      if (response.ok) {
        setShowModal(true);
      } else {
        console.error(
          'Failed to submit blog:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error('Error submitting blog:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-20 w-full px-16 py-7 flex justify-center bg-[#fff]">
        <div>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="flex justify-center relative">
        <Link to="/">
          <img
            src={backArrow}
            alt="back-arrow"
            className="absolute left-[76px] top-[40px]"
          />
        </Link>
        <div className="flex flex-col gap-6 w-[600px] h-[928px] text-left items-start mt-10">
          <h1 className="text-[#1A1A1F] text-[2rem] font-bold mb-5">
            ბლოგის დამატება
          </h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="input-heading">
              ატვირთეთ ფოტო
            </label>
            <input type="file" id="image" name="image" required />
          </div>

          {/* Author */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="author" className="input-heading">
                ავტორი *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className={`input ${
                  validation.author === 'success'
                    ? 'input-success'
                    : validation.author === 'error'
                    ? 'input-error'
                    : ''
                }`}
                value={formData.get('author')}
                onChange={handleInputChange}
                required
                placeholder="შეიყვნეთ ავტორი"
              />
              <ul className=" list-disc list-inside text-[#85858D] text-xs leading-5">
                <li
                  className={`${
                    validation.author === 'success'
                      ? 'text-success'
                      : validation.author === 'error'
                      ? 'text-error'
                      : ''
                  }`}
                >
                  მინიმუმ 4 სიმბოლო
                </li>
                <li
                  className={`${
                    validation.author === 'success'
                      ? 'text-success'
                      : validation.author === 'error'
                      ? 'text-error'
                      : ''
                  }`}
                >
                  მინიმუმ ორი სიტყვა
                </li>
                <li
                  className={`${
                    validation.author === 'success'
                      ? 'text-success'
                      : validation.author === 'error'
                      ? 'text-error'
                      : ''
                  }`}
                >
                  მხოლოდ ქართული სიმბოლოები
                </li>
              </ul>
            </div>
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="input-heading">
                სათური *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`input ${
                  validation.title === 'success'
                    ? 'input-success'
                    : validation.title === 'error'
                    ? 'input-error'
                    : ''
                }`}
                value={formData.get('title')}
                onChange={handleInputChange}
                required
                placeholder="შეიყვნეთ სათაური"
              />
              <p
                className={`text-normal ${
                  validation.title === 'success'
                    ? 'text-success'
                    : validation.title === 'error'
                    ? 'text-error'
                    : ''
                }`}
              >
                მინიმუმ 2 სიმბოლო
              </p>
            </div>
          </div>

          {/* Blog Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="input-heading">
              აღწერა *
            </label>
            <textarea
              id="description"
              name="description"
              className={`w-[37.5rem] h-[7.75rem] bg-[#FCFCFD] text-[#85858D] outline-[#5D37F3] px-4 py-3 rounded-xl ${
                validation.description === 'success'
                  ? 'input-success'
                  : validation.description === 'error'
                  ? 'input-error'
                  : ''
              }`}
              value={formData.get('description')}
              onChange={handleInputChange}
              required
              placeholder="შეიყვანეთ აღწერა"
            />
            <p
              className={`text-normal ${
                validation.description === 'success'
                  ? 'text-success'
                  : validation.description === 'error'
                  ? 'text-error'
                  : ''
              }`}
            >
              მინიმუმ 2 სიმბოლო
            </p>
          </div>

          {/* Date of Publication */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="publish_date" className="input-heading">
                გამოქვეყნების თარიღი *
              </label>
              <input
                type="date"
                id="publish_date"
                name="publish_date"
                className={`input ${
                  validation.publish_date === 'success'
                    ? 'input-success'
                    : validation.publish_date === 'error'
                    ? 'input-error'
                    : ''
                }`}
                value={formData.get('publish_date')}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Category */}
            <FormCategories
              formData={formData}
              handleInputChange={handleInputChange}
              validation={validation}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="input-heading">
              ელ-ფოსტა
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={`input ${
                validation.email === 'success'
                  ? 'input-success'
                  : validation.email === 'error'
                  ? 'input-error'
                  : ''
              }`}
              value={formData.get('email')}
              onChange={handleInputChange}
              placeholder="Example@redberry.ge"
            />
            <p
              className={`text-normal ${
                validation.email === 'success'
                  ? 'text-success'
                  : validation.email === 'error'
                  ? 'text-error'
                  : ''
              }`}
            >
              მეილი უნდა მთავრდებოდეს @redberry.ge-ით
            </p>
          </div>

          <div className="flex w-full justify-end">
            <button
              type="submit"
              className={`w-72 text-[#FFF] text-sm py-[0.625rem] px-5 rounded-lg ${
                isFormValid ? 'bg-[#5D37F3]' : 'bg-[#E4E3EB]'
              }`}
            >
              გამოქვეყნება
            </button>
          </div>
          <FormModal isOpen={showModal} closeModal={closeModal} />
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
