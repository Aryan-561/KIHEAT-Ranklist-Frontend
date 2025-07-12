import React from "react";
import { FaGraduationCap, FaCalendarAlt } from "react-icons/fa";
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
    cgpa?: string;
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
        <Link to={`${student.enrollment}`}>
            <div className="cardBg shadow-md rounded-xl hover:bg-green-100 hover:border-l-4 hover:border-green-700 p-6 w-full max-w-2xl mx-auto mb-6 transition duration-200 border border-green-200">
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <div className="bg-green-200 p-3 rounded-full h-fit">
                            <HiOutlineUser size={36} className="text-green-800" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-green-800">{student.name}</h2>
                            <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-800">
                                <span className="flex items-center gap-1">#{student.enrollment}</span>
                                <span className="flex items-center gap-1">
                                    <FaGraduationCap />
                                    {getShortProgramme(student.programme)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt /> Batch {student.batch}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-700">
                                <span>🆔 ID: {student.sid}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                        {student.cgpa && (
                            <div className="bg-lime-100 text-lime-800 font-semibold px-3 py-1 rounded-full text-sm">
                                CGPA: {student.cgpa}
                            </div>
                        )}
                        {student.rank && (
                            <div className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm">
                                Rank: #{student.rank}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-4 text-sm text-gray-700 flex-wrap">
                    <span className="bg-gray-100 rounded-full px-3 py-1">Scheme: {student.schemeID}</span>
                    <span className="bg-gray-100 rounded-full px-3 py-1">Program: {student.prgCode}</span>
                    <span className="bg-gray-100 rounded-full px-3 py-1">Institute: {student.instCode}</span>
                </div>
            </div>
        </Link>

    );
};

export default StudentCard;
