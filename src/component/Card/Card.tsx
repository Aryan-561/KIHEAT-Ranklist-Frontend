import React from "react";

type CardProps = {
  fields: Record<string, string>[];
  title?: string;
};

const Card: React.FC<CardProps> = ({ fields, title }) => {
  return (
    <div className="bg-green-50 border border-green-300 p-6 w-96 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-green-800">{title}</h2>
      <ul className="space-y-4">
        {fields.map((item, index) => {
          const key = Object.keys(item)[0];
          return (
            <li
              key={index}
              className="px-3 py-14 border text-center font-semibold border-green-300 rounded-lg bg-stone-100 text-green-800 hover:bg-green-700 hover:text-white cursor-pointer transition-colors"
            >
              {item[key]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Card;
