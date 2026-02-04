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
    <div className="card-surface reveal rounded-3xl p-6 md:p-8">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-44 w-44 md:h-52 md:w-52 lg:h-60 lg:w-60">
          <div className="absolute inset-0 rounded-[32px] bg-accent/10"></div>
          <Image
            src={props.image}
            alt="Profile portrait"
            fill
            className="rounded-[32px] object-cover ring-1 ring-black/5"
            quality={100}
            sizes="(max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
          />
        </div>
        <h1 className="font-display text-2xl mt-4 text-ink">{props.name}</h1>
        <div className="mt-2 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
          {props.position}
        </div>
      </div>
      <div className="border-t border-black/5 mt-4 mb-4"></div>

      <div
        ref={descriptionRef}
        className="mx-2 text-justify text-sm leading-relaxed text-muted overflow-auto max-h-52 no-scrollbar"
      >
        {props.description && (
          <div dangerouslySetInnerHTML={{ __html: props.description }} />
        )}
      </div>

      <div className="flex justify-center items-center mt-5 relative">
        <a
          href={props.instagram}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary text-sm"
        >
          <i className="fa fa-instagram mr-2"></i>
          Instagram
        </a>
        <div className="absolute right-0 flex flex-col items-center gap-2">
          {canScrollUp && (
            <button
              className="h-8 w-8 rounded-full border border-black/10 bg-white/80 text-muted shadow-sm transition hover:text-ink"
              onClick={handleScrollUp}
              aria-label="Scroll up"
            >
              <i className="fa fa-arrow-up"></i>
            </button>
          )}
          {canScrollDown && (
            <button
              className="h-8 w-8 rounded-full border border-black/10 bg-white/80 text-muted shadow-sm transition hover:text-ink"
              onClick={handleScrollDown}
              aria-label="Scroll down"
            >
              <i className="fa fa-arrow-down"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
