import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Carousel.module.scss';

const Carousel = () => {
  const images = ['two.jpg', 'three.jpg', 'four.jpg', 'five.jpg'];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(
        (prevActiveImage) => (prevActiveImage + 1) % images.length,
      );
    }, 3000); // change images every 3 seconds

    return () => clearInterval(interval); // clean up on component unmount
  }, []);

  const fixedHeight = 500; // Specify the height
  const fixedWidth = 2000; // Specify the width

  return (
    <div className="relative w-full">
      {' '}
      {/* You can adjust the height according to your needs */}
      <Image
        src={`/${images[activeImage]}`}
        alt="carousel-image"
        width={fixedWidth}
        height={fixedHeight} // dummy value
        quality={100}
      />
    </div>
  );
};

export default Carousel;
