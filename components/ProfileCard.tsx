import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProfileCard(props) {
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  const handleScrollDown = () => {
    descriptionRef.current?.scrollBy({ top: 100, behavior: 'smooth' });
  };

  const handleScrollUp = () => {
    descriptionRef.current?.scrollBy({ top: -100, behavior: 'smooth' });
  };

  const checkScrollPosition = () => {
    const node = descriptionRef.current;
    if (!node) {
      setCanScrollUp(false);
      setCanScrollDown(false);
      return;
    }

    setCanScrollUp(node.scrollTop > 0);
    setCanScrollDown(node.scrollHeight - node.scrollTop !== node.clientHeight);
  };

  useEffect(() => {
    const node = descriptionRef.current;
    if (!node) return;

    node.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();

    return () => {
      node.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    <div className="card bg-gray-50 shadow rounded-lg p-6 max-w-xs mx-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="flex flex-col items-center">
        <div className="relative h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64 max-w-full max-h-full">
          <Image
            src={props.image}
            alt="pic"
            fill
            className="rounded-full object-cover"
            quality={100}
            sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 256px"
          />
        </div>
        <h1 className="text-lg mt-2 md:text-xl lg:text-2xl">{props.name}</h1>
      </div>
      <h3 className="title text-center mb-2 md:text-lg lg:text-xl">{props.position}</h3>
      <div className="border-t border-gray-200 mt-2 mb-4"></div>

      <div ref={descriptionRef} className="mx-4 text-justify text-center overflow-auto max-h-48 no-scrollbar">
        {props.description && (
          <div dangerouslySetInnerHTML={{ __html: props.description }} />
        )}
      </div>

      <div className="flex justify-center items-center mt-4 relative">
        <a href={props.instagram} target="_blank" rel="noreferrer" className="z-10">
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
