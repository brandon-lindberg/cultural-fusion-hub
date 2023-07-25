import React from 'react';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = () => {
  return (
    <Carousel
      autoPlay
      interval={2000}
      infiniteLoop
      useKeyboardArrows
      showThumbs={false}
      showStatus={false}
    >
      <div className="relative h-60 sm:h-96 md:h-128 lg:h-160 xl:h-192 w-full">
        <Image
          src="/one.jpg"
          alt="Image One Description"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative h-60 sm:h-96 md:h-128 lg:h-160 xl:h-192 w-full">
        <Image
          src="/two.jpg"
          alt="Image Two Description"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative h-60 sm:h-96 md:h-128 lg:h-160 xl:h-192 w-full">
        <Image
          src="/three.jpg"
          alt="Image Three Description"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative h-60 sm:h-96 md:h-128 lg:h-160 xl:h-192 w-full">
        <Image
          src="/four.jpg"
          alt="Image Four Description"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative h-60 sm:h-96 md:h-128 lg:h-160 xl:h-192 w-full">
        <Image
          src="/five.jpg"
          alt="Image Five Description"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
