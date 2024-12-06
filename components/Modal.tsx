// Modal.tsx

import React from 'react';
import styles from '../styles/Modal.module.scss';

const Modal = ({ isOpen, onClose, onOpenMaps, children, event }) => {
  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (event.stream) {
      window.open(event.instagramUrl, '_blank');
    } else {
      onOpenMaps();
    }
  };

  return (
    <div className={styles.modal}>
      <p id="event-start-time"></p>
      <p id="event-location"></p>
      <div className={styles.modalContent}>
        {children}
        <div className={styles.buttonContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
          {((event.stream && event.instagramUrl) || (!event.stream && event.googleMapsUrl)) && (
            <button onClick={handleButtonClick} className={styles.mapsButton}>
              {event.stream ? 'Open Instagram' : 'Open Google Maps'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
