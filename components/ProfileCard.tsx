import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProfileCard(props) {
  const descriptionRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  const handleScrollDown = () => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };

  const handleScrollUp = () => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollBy({ top: -100, behavior: 'smooth' });
    }
  };

  const checkScrollPosition = () => {
    if (descriptionRef.current) {
      setCanScrollUp(descriptionRef.current.scrollTop > 0);
      setCanScrollDown(
        descriptionRef.current.scrollHeight - descriptionRef.current.scrollTop !==
          descriptionRef.current.clientHeight
      );
    }
  };

  useEffect(() => {
    const currentRef = descriptionRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
      return () => {
        currentRef.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  return (
    <div className="card bg-gray-50 shadow rounded-lg p-6 max-w-xs mx-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="flex flex-col items-center">
        <div className="relative h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64 max-w-full max-h-full">
          <Image
            src={props.image}
            alt="pic"
            fill
            className="object-cover rounded-full"
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h1 className="text-lg mt-2 md:text-xl lg:text-2xl">{props.name}</h1>
      </div>
      <h3 className="title text-center mb-2 md:text-lg lg:text-xl">{props.position}</h3>
      <div className="border-t border-gray-200 mt-2 mb-4"></div>

      <div ref={descriptionRef} className="mx-4 text-center overflow-auto max-h-48 no-scrollbar">
        {props.description && (
          <div dangerouslySetInnerHTML={{ __html: props.description }} />
        )}
      </div>

      <div className="flex justify-center items-center mt-4 relative">
        <a href={props.instagram} target="_blank" className="z-10">
          <i className="fa fa-instagram text-mainPink"></i>
        </a>
        <div className="absolute right-0 flex flex-col items-center">
          {canScrollUp && (
            <i
              className="fa fa-arrow-up text-gray-400 animate-bounce cursor-pointer"
              onClick={handleScrollUp}
            ></i>
          )}
          {canScrollDown && (
            <i
              className="fa fa-arrow-down text-gray-400 animate-bounce cursor-pointer"
              onClick={handleScrollDown}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
}
