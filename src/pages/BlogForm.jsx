/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import logo from '../assets/LOGO-02 3.svg';
import backArrow from '../assets/greyArrow.svg';
import { Link } from 'react-router-dom';
import FormModal from '../components/FormModal';
import FormCategories from '../components/FormCategories';
import infoCircle from '../assets/info-circle.svg';
import axios from 'axios';

const BlogForm = () => {
  const [saveImage, setSaveImage] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    publish_date: '',
    category_id: '',
    email: '',
  });

  const [validation, setValidation] = useState({
    author: null,
    title: null,
    description: null,
    publish_date: null,
    email: null,
    category_id: null,
  });

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let isValid = true;

    switch (name) {
      case 'image':
        const file = e.target.files[0];
        console.log(file);

        setSaveImage(file);

        // if (file && file.type.startsWith('image/')) {
        //   ((prevFormData) => ({
        //     ...prevFormData,
        //     image: file,
        //   }));
        // }
        // else {
        //   isValid = false;
        // }
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
        isValid = /^[a-zA-Z0-9._-]+@redberry\.ge$/.test(value);
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

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const isFormValid = Object.values(validation).every(
    (status) => status === 'success'
  );

  const handleSubmit = async (e) => {
    console.log(formData.category_id);

    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key == 'category_id') {
        formDataToSubmit.append('categories', '[' + value + ']');
      } else {
        formDataToSubmit.append(key, value);
      }
    });

    formDataToSubmit.append('image', saveImage);

    const url = 'https://api.blog.redberryinternship.ge/api/blogs';
    const token =
      'Bearer 8e0c25f0c19bf5ba93c19aabb0f1f8a793e3577444df4ab1d3013f0076cdf24f';

    try {
      const response = await axios.post(url, formDataToSubmit, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status >= 200 && response.status < 300) {
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
    <>
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
              className="absolute left-[76px] top-[40px] rounded-full bg-[#E4E3EB] hover:bg-[#D9D8E0]"
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
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleInputChange}
                required
              />
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
                  value={formData.author}
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
                  value={formData.title}
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
                value={formData.description}
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
                  value={formData.publish_date}
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
            <div className="flex flex-col gap-2 relative">
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
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Example@redberry.ge"
              />
              {formData.email.length > 0 && validation.email !== 'success' && (
                <p
                  className={`flex gap-2 text-normal absolute top-20 ${
                    validation.email === 'error' ? 'text-error' : 'hidden'
                  }`}
                >
                  <img src={infoCircle} alt="info-circle" />
                  მეილი უნდა მთავრდებოდეს @redberry.ge-ით
                </p>
              )}
            </div>
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className={`w-72 text-[#FFF] text-sm py-[0.625rem] px-5 rounded-lg ${
                  isFormValid
                    ? 'bg-[#5D37F3] hover:bg-[#512BE7] active:bg-[#4721DD]'
                    : 'bg-[#E4E3EB]'
                }`}
              >
                გამოქვეყნება
              </button>
            </div>
          </div>
        </div>
      </form>
      <FormModal isOpen={showModal} closeModal={closeModal} />
    </>
  );
};

export default BlogForm;
