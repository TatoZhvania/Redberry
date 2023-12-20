/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Modal from 'react-modal';
import logo from '../assets/LOGO-02 3.svg';
import addBtn from '../assets/add.svg';
import tick from '../assets/tick-circle.svg';
import infoCircle from '../assets/info-circle.svg';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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
        // console.log('Response status:', response.status);
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          setIsAuthenticated(true);
          setEmailError('');
          return {};
        } else {
          throw new Error('Invalid response from the server');
        }
      })
      .then((data) => {
        // console.log('data:', data);
        if (!isAuthenticated && data.exists) {
          setIsAuthenticated(true);
          setEmailError('');
        } else if (!isAuthenticated) {
          setEmailError('ელ-ფოსტა არ მოიძებნა');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setEmailError('დაფიქსირდა შეცდომა');
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
              <button
                className="bg-[#5D37F3] rounded-lg text-white px-4 py-3 text-sm"
                onClick={openModal}
              >
                დაამატე ბლოგი
              </button>
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
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Login Modal"
          className="w-[480px] h-80 rounded-xl bg-[#FFF] text-[#1A1A1F]
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  
          "
          overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-[#1A1A1F] bg-opacity-50"
        >
          {isAuthenticated ? (
            <>
              <button className="absolute right-5 top-5" onClick={closeModal}>
                <img src={addBtn} alt="add-btn" />
              </button>

              <div className="mx-10 my-10 mt-16">
                <div className="flex flex-col gap-4 text-center items-center">
                  <img src={tick} alt="tick" className="w-16 h-16" />
                  <p className="text-[#1A1A1F] text-xl font-bold">
                    წარმატებული ავტორიზაცია
                  </p>
                  <button
                    className="bg-[#5D37F3] text-sm w-full py-3 rounded-lg mt-6 text-[#fff]"
                    onClick={closeModal}
                  >
                    კარგი
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <button className="absolute right-5 top-5" onClick={closeModal}>
                <img src={addBtn} alt="add-btn" />
              </button>

              <div className="mx-10 my-10 mt-16">
                <p className="text-[#1A1A1F] text-2xl font-bold text-center mb-6">
                  შესვლა
                </p>
                <div className="flex flex-col gap-4">
                  <p className="text-[#1A1A1F] text-sm font-medium">ელ-ფოსტა</p>
                  <input
                    placeholder="Example@redberry.ge"
                    type="text"
                    className={`rounded-xl bg-[#F7F7FF] h-11 text-[#85858D] text-sm border-[1.5px] ${
                      emailError ? 'border-red-500' : 'border-[#5D37F3]'
                    } outline-none p-4`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-[#EA1919] text-sm font-normal flex items-center gap-2">
                      <img src={infoCircle} alt="info-circle" />
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  className="bg-[#5D37F3] w-full py-3 rounded-lg mt-6 text-[#fff] text-sm "
                  onClick={handleLogin}
                >
                  შესვლა
                </button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Header;
