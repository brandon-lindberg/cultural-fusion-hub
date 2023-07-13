import React from 'react';
import Image from 'next/image';

export default function ProfileCard(props) {
  return (
    <div className="card bg-gray-50 shadow rounded-lg p-6 max-w-xs mx-auto">
      <div className="flex flex-col items-center">
        <Image
          src={props.image}
          alt="pic"
          height={150}
          width={150}
          className="rounded-full"
          quality={100}
        />
        <h1 className="text-lg mt-2">{props.name}</h1>
      </div>
      <h3 className="title text-center mb-2">{props.position}</h3>
      <div className="border-t border-gray-200 mt-2 mb-4"></div>

      <div className="mb-4">
        <p className="mx-4 text-justify text-center overflow-auto max-h-48 no-scrollbar">
          {props.description}
        </p>
      </div>

      <div className="flex justify-center gap-2">
        <a href={props.instagram} target="_blank">
          <i className="fa fa-instagram text-mainPink"></i>
        </a>
        {/* <a href={props.twitter} target="_blank">
          <i className="fa fa-twitter text-mainPink"></i>
        </a>
        <a href={props.linkedin} target="_blank">
          <i className="fa fa-linkedin text-mainPink"></i>
        </a>
        <a href={props.facebook} target="_blank">
          <i className="fa fa-facebook text-mainPink"></i>
        </a> */}
      </div>
    </div>
  );
}
