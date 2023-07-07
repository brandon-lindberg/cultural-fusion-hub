import React from 'react';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = () => {
  return (
    <Carousel
      autoPlay
      interval={2000}
      infiniteLoop
      useKeyboardArrows
      showThumbs={false}
    >
      <div>
        <img src="/one.jpg" alt="" />
      </div>
      <div>
        <img src="/two.jpg" alt="" />
      </div>
      <div>
        <img src="/three.jpg" alt="" />
      </div>
      <div>
        <img src="/four.jpg" alt="" />
      </div>
      <div>
        <img src="/five.jpg" alt="" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
