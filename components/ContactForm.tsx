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
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-2"
            htmlFor="grid-last-name"
          >
            {t('last-name')}
          </label>
          <input
            className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-[color:var(--ring)]"
            id="grid-last-name"
            type="text"
            placeholder="Yamada"
            value={formState.lastName}
            onChange={handleInput}
            name="lastName"
            required
          />
        </div>
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-2"
            htmlFor="grid-first-name"
          >
            {t('first-name')}
          </label>
          <input
            className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-[color:var(--ring)]"
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
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-2"
          htmlFor="message"
        >
          {t('message')}
        </label>
        <textarea
          className="h-48 w-full resize-none rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-[color:var(--ring)]"
          id="message"
          value={formState.message}
          onChange={handleInput}
          name="message"
          required
        ></textarea>
      </div>
      <div className="flex items-center justify-end">
        <button className="btn-primary" type="submit">
          {t('send')}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
