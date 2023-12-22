/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import logo from '../assets/LOGO-02 3.svg';
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedEmail && storedIsAuthenticated) {
      setEmail(storedEmail);
      setIsAuthenticated(storedIsAuthenticated === 'true');
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEmail('');
    setEmailError('');
  };

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith('@redberry.ge')) {
      setEmailError('მეილი უნდა მთავრდებოდეს @redberry.ge');
      return;
    }

    fetch('https://api.blog.redberryinternship.ge/api/login', {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer 8e0c25f0c19bf5ba93c19aabb0f1f8a793e3577444df4ab1d3013f0076cdf24f',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.status === 204) {
          setIsAuthenticated(true);
          setEmailError('');
          return {};
        } else {
          throw new Error('Invalid response from the server');
        }
      })
      .then((data) => {
        if (!isAuthenticated && data.exists) {
          setIsAuthenticated(true);
          setEmailError('');
        } else if (!isAuthenticated) {
          setEmailError('დაფიქსირდა შეცდომა');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setEmailError(' ელ-ფოსტა არ მოიძებნა');
      });
  };

  return (
    <>
      <div className="h-20 w-full px-16 py-7 flex justify-between items-center bg-[#fff] relative">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="modal-form">
                <button
                  className="bg-[#5D37F3] rounded-lg text-white px-4 py-3 text-sm"
                  onClick={openModal}
                >
                  დაამატე ბლოგი
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                className="bg-[#5D37F3] rounded-lg text-white px-4 py-3 text-sm"
                onClick={openModal}
              >
                შესვლა
              </button>
            </>
          )}
        </div>
      </div>

      <div className="absolute top-1">
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          isAuthenticated={isAuthenticated}
          closeModal={closeModal}
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          handleLogin={handleLogin}
        />
      </div>
    </>
  );
};

export default Header;
