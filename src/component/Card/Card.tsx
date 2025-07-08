import React from "react";
import { Link } from "react-router-dom";

type CardProps = {
  fields: Record<string, React.ReactNode>[];
  title?: string;
};

const Card: React.FC<CardProps> = ({ fields, title }) => {
  return (
    <div className="bg-green-50 min-h-80 flex-col  flex justify-center items-center border-green-300 p-6 shadow-lg rounded-2xl w-full">
      <h2 className="text-2xl font-bold mb-4 text-center font-serif text-green-800">{title}</h2>
      <ul className="flex flex-wrap gap-3 w-full">
        {fields.map((item, index) => {
          const key = Object.keys(item)[0];
          // console.log("key",key);

          return (
            <Link to={`/${key.toLowerCase()}`}
              key={index}
              className="flex-1 min-w-[120px] px-3 py-14 border text-center font-semibold border-green-300 rounded-lg bg-stone-100 text-green-800 hover:bg-green-700 hover:text-white cursor-pointer transition-colors"
            >
              {item[key]}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Card;
