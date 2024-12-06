import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

const ContactForm = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    message: '',
  });

  const handleInput = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailtoLink = `mailto:culturalfusionhub@gmail.com?subject=Contact form submission from ${formState.lastName} ${formState.firstName}&body=${formState.message}`;
    window.location.href = mailtoLink;

    setFormState({
      firstName: '',
      lastName: '',
      message: '',
    });
  };
  const { t} = useTranslation();

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            {/* Last Name */}
            {t('last-name')}
          </label>
          <input
            className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-last-name"
            type="text"
            placeholder="Yamada"
            value={formState.lastName}
            onChange={handleInput}
            name="lastName"
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            {/* First Name */}
            {t('first-name')}
          </label>
          <input
            className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            type="text"
            placeholder="Taro"
            value={formState.firstName}
            onChange={handleInput}
            name="firstName"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            {/* Message */}
            {t('message')}
          </label>
          <textarea
            className="no-resize appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
            id="message"
            value={formState.message}
            onChange={handleInput}
            name="message"
            required
          ></textarea>
        </div>
      </div>
      <div className="md:flex md:items-center justify-end">
        <div className="md:w-1/3">
          <button
            className="shadow bg-subGreen hover:bg-subGreen focus:shadow-outline focus:outline-none text-zinc-400 py-2 px-4 rounded"
            type="submit"
          >
            {t('send')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
