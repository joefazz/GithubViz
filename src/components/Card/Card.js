import React from 'react';

function Card({title, data, children}) {
  return (
    <div className="w-1/3 min-h-full p-2 mx-2 bg-gray-100 shadow-md rounded-lg">
      <h1 className="text-xl text-gray-900  font-hairline">{title}</h1>
      <section>
        {children}
      </section>
    </div>
  );
}

export default Card;
