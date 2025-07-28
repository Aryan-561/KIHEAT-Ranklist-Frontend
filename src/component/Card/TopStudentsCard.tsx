import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services/services";
import type { TopStudentsResponse } from "../../interface";
import { programmeCodes } from "../../constant/constant";
import {
  faBook,
  faBuildingColumns,
  faCalendar,
  faIdCard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StateMessage from "../StateMessage/StateMessage";

const TopStudentsCard: React.FC = () => {
  const { data, isLoading, error } = useQuery<TopStudentsResponse>({
    queryKey: ["topStudents"],
    queryFn: () => services.getTopStudents(),
  });

  if (isLoading) {
    return (
      <StateMessage
        text="Loading Students..."
        className="text-gray-300 animate-pulse"
      />
    );
  }

  if (error) {
    return (
      <StateMessage
        text="Failed to load Top Ranking Students. Please try again later."
        className="text-red-400"
      />
    );
  }

  return (
    <section className="relative  z-10 py-16 px-4 bg-transparent">
      {/* <div className="max-w-6xl mx-auto text-center mb-12 font-roboto-flex">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">🏆 Top Performing Students</h2>
        <p className="text-emerald-300 mt-2">Academic excellence across all programs</p>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data?.data.map(({ topStudent }) => (
          <Link
            key={topStudent.enrollment}
            to={`/student/${topStudent.enrollment}`}
            className=" group rounded-2xl bg-conic from-emerald-700/10 via-black/30 to-emerald-800/10 border xl:max-w-96 border-emerald-400/20 backdrop-blur-md p-5 transition-all hover:scale-105 hover:shadow-emerald-500/30 hover:border-emerald-300 duration-300 text-white"
          >
            <div className="flex flex-col items-center gap-2 font-rubik">
              <div className="text-xs uppercase tracking-wide text-emerald-300 font-semibold">
                {programmeCodes[topStudent.prgCode]}
              </div>

              <div className="text-lg font-bold flex items-center gap-2 text-white">
                <FontAwesomeIcon icon={faUser} className="text-emerald-400" />
                {topStudent.name}
              </div>

              <div className="bg-emerald-600/30 px-3 py-1 text-sm rounded-full text-emerald-100 font-semibold">
                CGPA: {topStudent.cgpa}
              </div>
            </div>

            <div className="font-lexend mt-4 border-t border-emerald-400/20 pt-4 space-y-2 text-sm text-emerald-100">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faIdCard} className="text-emerald-400" />
                <span className="font-medium">Enrollment:</span>
                <span className="text-white/80 font-light">{topStudent.enrollment}</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBook} className="text-emerald-400" />
                <span className="font-medium">Programme:</span>
                <span className="text-white/80 font-light">
                  {programmeCodes[topStudent.prgCode]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} className="text-emerald-400" />
                <span className="font-medium">Batch:</span>
                <span className="text-white/80 font-light">{topStudent.batch}</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBuildingColumns} className="text-emerald-400" />
                <span className="font-medium">Institute:</span>
                <span className="text-white/80 font-light">{topStudent.instCode}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopStudentsCard;
