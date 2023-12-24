/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Modal from 'react-modal';
import addBtn from '../assets/add.svg';
import tick from '../assets/tick-circle.svg';
import { Link } from 'react-router-dom';

const FormModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Blog Submission Modal"
      className="w-[480px] h-[18.75rem] rounded-xl bg-[#FFF] text-[#1A1A1F] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-[#1A1A1F] bg-opacity-50"
    >
      <button className="absolute right-5 top-5" onClick={closeModal}>
        <img src={addBtn} alt="add-btn" />
      </button>

      <div className="mx-10 my-10 mt-16">
        <div className="flex flex-col gap-4 text-center items-center">
          <img src={tick} alt="tick" className="w-16 h-16" />
          <p className="text-[#1A1A1F] text-xl font-bold">
            ჩანაწი წარმატებით დაემატა
          </p>
          <Link
            to="/"
            className="bg-[#5D37F3] text-sm w-full py-3 rounded-lg mt-6 text-[#fff]"
            onClick={closeModal}
          >
            <button>მთავარ გვერდზე დაბრუნება</button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;
