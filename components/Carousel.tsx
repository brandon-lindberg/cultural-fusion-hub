import React from 'react';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Carousel
        autoPlay
        interval={2000}
        infiniteLoop
        useKeyboardArrows
        showThumbs={false}
        showStatus={false}
      >
        <div className="relative h-60 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] w-full">
          <Image
            src="/one.jpg"
            alt="Cultural event showcasing diversity"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative h-60 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] w-full">
          <Image
            src="/two.jpg"
            alt="Community gathering at Cultural Fusion Hub"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-60 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] w-full">
          <Image
            src="/three.jpg"
            alt="Children participating in cultural activities"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-60 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] w-full">
          <Image
            src="/four.jpg"
            alt="Multicultural celebration event"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-60 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] w-full">
          <Image
            src="/five.jpg"
            alt="Diverse group of people at Cultural Fusion Hub"
            fill
            className="object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;