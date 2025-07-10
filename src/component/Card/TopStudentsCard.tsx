import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services/services";
import type { TopStudentsResponse } from "../../interface";
import { programmeCodes } from "../../constant/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBuildingColumns, faCalendar, faIdCard, faUser } from "@fortawesome/free-solid-svg-icons";
import StateMessage from "../StateMessage/StateMessage";

const TopStudentsCard: React.FC = () => {
  const { data, isLoading, error } = useQuery<TopStudentsResponse>({
    queryKey: ["topStudents"],
    queryFn: () => services.getTopStudents(),
  });

  if (isLoading) {
        return <StateMessage text="Loading Students..." className="text-gray-600 animate-pulse" />;
    }

    if (error) {
        return <StateMessage text="Failed to load Top Ranking Students. Please try again later." className="text-red-600" />;
    }

  return (
    <>
      {data?.data && (
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap:4 p-4">
          {data.data.map((details) => (
            <>
              <div
                key={details.topStudent.enrollment}
                className="flex flex-col items-center justify-center gap-1"
              >
                <div className="font-rubik text-green-800">
                  {programmeCodes[details.topStudent.prgCode]}
                </div>
                <Link
                  to={`/student/${details.topStudent.enrollment}`}
                  key={details.topStudent.enrollment}
                  className="text-green-700 w-64 m-1 font-roboto-flex rounded-lg shadow-md border border-gray-200 hover:bg-emerald-100 hover:scale-102 hover:border-green-300 hover:cursor-pointer transition-all duration-200 flex flex-col items-center justify-between bg-green-100 px-2"
                >
                  <div className="flex flex-col items-center justify-center gap-2 p-4">
                    <div className="flex items-center justify-center gap-2 text-green-800 font-semibold">
                      <FontAwesomeIcon icon={faUser} />
                      <div className="font-rubik text-base sm:text-lg">
                        {details.topStudent.name}
                      </div>
                    </div>
                    <div className="text-slate-900 font-semibold text-base bg-lime-100 px-2 rounded-2xl">
                      CGPA: {details.topStudent.cgpa}
                    </div>
                  </div>
                  <div
                className="flex flex-col gap-2 p-4 border-t-2 border-green-700 text-green-700"
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <FontAwesomeIcon icon={faIdCard} />
                  <span className="font-medium">Enrollment:</span>
                  <span className="text-muted-foreground text-xs sm:text-sm"
                    >{details.topStudent.enrollment}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <FontAwesomeIcon icon={faBook} />  
                  <span className="font-medium">Programme: </span>
                  <span className="text-muted-foreground text-xs">{programmeCodes[details.topStudent.prgCode]}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span className="font-medium">Batch:</span>
                  <span className="text-muted-foreground text-xs">{details.topStudent.batch}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <FontAwesomeIcon icon={faBuildingColumns} />
                    <span className="font-medium">Institute Code:</span>
                    <span className="text-muted-foreground text-xs">{details.topStudent.instCode}</span>
                </div>
              </div>
                </Link>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default TopStudentsCard;
