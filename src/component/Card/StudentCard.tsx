import React from "react";
import { FaGraduationCap, FaCalendarAlt, FaIdCard   } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { Link } from "react-router-dom";

interface Student {
    name: string;
    enrollment: string;
    programme: string;
    prgCode: string;
    instCode: string;
    schemeID: string;
    sid: string;
    batch: string;
    sem?: string;
    cgpa?: number;
    rank?: string;
    department?: string;
}



// Optional: Smart shortener based on keywords (if programme text isn't exact match)
const getShortProgramme = (programme: string) => {
    const lower = programme.toLowerCase();
    if (lower.includes("computer")) return "BCA";
    if (lower.includes("business")) return "BBA";
    if (lower.includes("commerce")) return "B.COM";
    return programme; // fallback: original full name
};

const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
    return (
        <Link to={`/student/${student.enrollment}`}>
            <div className="font-rubik cardBg shadow-md rounded-xl hover:bg-green-100 hover:border-l-4 hover:scale-102 hover:border-green-700 p-2 sm:p-6 w-full max-w-2xl mx-auto mb-6 transition duration-200 border border-green-200">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:items-start">
                    <div className="flex flex-col items-center sm:flex-row gap-4 ">
                        <div className="bg-green-200 flex justify-center w-fit p-3 rounded-full h-fit border border-green-800">
                            <HiOutlineUser  className="text-green-800 text-2xl sm:text-4xl" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-2xl font-bold text-green-800">{student.name}</h2>
                            <div className="flex flex-col gap-1 mt-1 text-sm text-emerald-800 font-lexend">
                                <span className="flex items-center justify-center sm:justify-start text-base gap-1"><FaIdCard/>{student.enrollment}</span>
                                {/* <span className="flex items-center gap-1">
                                    <FaGraduationCap />
                                    {getShortProgramme(student.programme)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt /> Batch {student.batch}
                                </span> */}
                            </div>

                            {/* <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-700">
                                <span>🆔 ID: {student.sid}</span>
                            </div> */}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 items-end font-lexend">
                        {student.cgpa && (
                            <div className="bg-yellow-100 text-lime-800 font-semibold px-3 py-1 rounded-full text-sm">
                                CGPA: {student.cgpa}
                            </div>
                        )}
                        {/* {student.rank && (
                            <div className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm">
                                Rank: #{student.rank}
                            </div>
                        )} */}
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-green-700  flex justify-center sm:justify-start items-center gap-4 text-xs sm:text-sm text-gray-700  font-lexend">
                    {/* <span className="bg-gray-100 rounded-full px-3 py-1">Scheme: {student.schemeID}</span> */}
                    <span className="bg-green-200 flex items-center gap-1 rounded-full px-3 py-1"><FaGraduationCap />
                                    {getShortProgramme(student.programme)}</span>
                    <span className="bg-green-200 flex items-center gap-1 rounded-full px-3 py-1"><FaCalendarAlt /> Batch {student.batch}</span>
                </div>
            </div>
        </Link>

    );
};

export default StudentCard;
