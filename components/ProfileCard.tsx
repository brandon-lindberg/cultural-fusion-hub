import React from 'react';
import Image from 'next/image';

export default function ProfileCard(props) {
  return (
    <div className="card bg-white shadow rounded-lg p-6 max-w-xs mx-auto h-72">
      <div className="flex flex-col items-center mb-4">
        <Image
          src={props.image}
          alt="pic"
          height={50}
          width={50}
          className="rounded-full"
          quality={100}
        />
        <h1 className="text-lg mt-2">{props.name}</h1>
      </div>

      <div className="border-t border-gray-200 mt-2 mb-4"></div>

      <div className="mb-4">
        <h3 className="title text-center mb-2">{props.position}</h3>
        <p className="mx-4 text-center">{props.description}</p>
      </div>

      <div className="flex justify-center gap-2">
        <a href={props.instagram}>
          <i className="fa fa-instagram"></i>
        </a>
        <a href={props.twitter}>
          <i className="fa fa-twitter"></i>
        </a>
        <a href={props.linkedin}>
          <i className="fa fa-linkedin"></i>
        </a>
        <a href={props.facebook}>
          <i className="fa fa-facebook"></i>
        </a>
      </div>
    </div>
  );
}
