import React from 'react';

function Card({ title, data, children }) {
  return (
    <div className="p-2 mx-2 bg-gray-100 shadow-md rounded-lg">
      <div className="w-full inline-flex flex-col items-stretch">
        <h1 className="text-xl text-gray-900 px-2 pt-2">{title}</h1>
        <section className="w-full">{children}</section>
      </div>
    </div>
  );
}

export default Card;
