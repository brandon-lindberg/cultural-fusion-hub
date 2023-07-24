// Modal.tsx

import React from 'react';
import styles from '../styles/Modal.module.scss';

const Modal = ({ isOpen, onClose, onOpenMaps, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {children}
        <div className={styles.buttonContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
          <button onClick={onOpenMaps} className={styles.mapsButton}>
            Open in Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
