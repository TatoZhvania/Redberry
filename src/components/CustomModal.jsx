/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Modal from 'react-modal';
import addBtn from '../assets/add.svg';
import tick from '../assets/tick-circle.svg';
import infoCircle from '../assets/info-circle.svg';

const CustomModal = ({
  isOpen,
  onRequestClose,
  isAuthenticated,
  closeModal,
  email,
  setEmail,
  emailError,
  handleLogin,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      className="w-[480px] min-h-[18.75rem] rounded-xl bg-[#FFF] text-[#1A1A1F] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
                className="bg-[#5D37F3] hover:bg-[#512BE7] text-sm w-full py-3 rounded-lg mt-6 text-[#fff]"
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
                  emailError
                    ? 'border-[#EA1919] bg-[#FAF2F3]'
                    : 'border-[#5D37F3]'
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
              className="bg-[#5D37F3] hover:bg-[#512BE7] w-full py-3 rounded-lg mt-6 text-[#fff] text-sm "
              onClick={handleLogin}
            >
              შესვლა
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default CustomModal;
