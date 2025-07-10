import { faFileInvoiceDollar, faComputer , faBriefcase, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

type CardProps = {
  fields: Record<string, React.ReactNode>[];
  title?: string;
};

const icons: Record<string, IconDefinition> = {
  BCA: faComputer,
  BBA: faBriefcase,
  BCom: faFileInvoiceDollar
}

const Card: React.FC<CardProps> = ({ fields, title }) => {
  return (
    <div className="bg-emerald-100 flex flex-col justify-center items-center border-2 border-green-600 p-4 py-6 shadow-lg rounded-2xl w-full font-roboto-flex">
      <h2 className="font-gabarito-600 text-base sm:text-2xl mb-3 sm:mb-4 text-center text-green-800 font-bold">{title}</h2>
      <ul className="flex flex-wrap gap-3 w-full">
        {fields.map((item, index) => {
          const key = Object.keys(item)[0];
          // console.log("key",key);

          return (
            <Link to={`/${key.toLowerCase()}`}
              key={index}
              className="flex-1 flex flex-col gap-2 min-w-[120px] px-3 py-14 text-center text-xs sm:text-base font-semibold border-2 border-green-300 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 hover:border-green-700 hover:scale-102 hover:text-emerald-800 cursor-pointer transition-colors"
            >
              <FontAwesomeIcon icon={icons[key]} size="xl" />
              <div>{item[key]}</div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Card;
