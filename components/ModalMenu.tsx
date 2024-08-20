import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import styles from '../styles/ModalMenu.module.scss';

const customStyles = {
  content: {
    top: '10px',
    left: 'auto',
    right: '10px',
    bottom: 'auto',
  },
};

interface ModalMenuProps {
  isOpen: boolean;
  onRequestClose: () => void;
  t: Function;
}

const ModalMenu: React.FC<ModalMenuProps> = ({ isOpen, onRequestClose, t }) => {
  const { i18n } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Menu Modal"
      style={customStyles}
      className={`${styles.modalMenu} bg-zinc-50 w-40 h-auto bg-white rounded-lg p-4 space-y-4 text-center`}
    >
      <nav>
        <ul className="space-y-2 text-zinc-400">
          <li>
            <Link href="/"> {t('home')}</Link>
          </li>
          <li>
            <Link href="/about">{t('about')}</Link>
          </li>
          <li>
            <Link href="/profile">{t('profile')}</Link>
          </li>
          <li>
            <Link href="/contact">{t('contact')}</Link>
          </li>
          <li>
            <Link href="/blog">{t('blogMenu')}</Link>
          </li>
        </ul>
        <div className="flex justify-evenly mt-4">
          <button
            onClick={() => i18n.changeLanguage('en')}
            className="focus:outline-none mr-2 px-1 py-1"
          >
            <span className="flag-icon flag-icon-gb"></span>
          </button>
          <button
            onClick={() => i18n.changeLanguage('ja')}
            className="focus:outline-none ml-2 px-1 py-1"
          >
            <span className="flag-icon flag-icon-jp"></span>
          </button>
        </div>
      </nav>
      <button
        onClick={onRequestClose}
        className="mt-4 bg-buttonColor2 text-zinc-400 px-4 py-2 rounded"
      >
        Close
      </button>
    </Modal>
  );
};

export default ModalMenu;