import { useParams } from "react-router-dom";
import type { StudentByEnrollmentResponse } from "../../interface";
import { services } from "../../services/services";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import Chart, { RadarChartSingleSemester, ResultInsights } from "./Chart";
import { Achievments } from "./Header";
export type Student = StudentByEnrollmentResponse['data'];
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Subject {
    subjectname: string;
    subjectCode: string;
    internal: number;
    external: number;
    total: number;
    credit: number;
    grade: string;
    backlog?: boolean;
}

interface SemesterData {
    totalMarks: number;
    maxMarks: number;
    totalCreditMarks: number;
    maxCreditMarks: number;
    totalCredits: number;
    maxCredits: number;
    percentage: number;
    gpa: number;
    semesterNum: number | string;
    semesterWiseSubjectData: Subject[];
}

interface Marksheet {
    earnTotal: number;
    totalMarks: number;
    earnCredits: number;
    totalCredits: number;
    percentage: number;
    cgpa: number;
    OverAllSemesterData: SemesterData[];
}

const MarkSheet: React.FC<{ marksheet: Marksheet }> = ({ marksheet }) => {
    const [sem, setSem] = useState<string>("overall");

    const currentSemData =
        sem !== "overall"
            ? marksheet?.OverAllSemesterData?.[Number(sem) - 1]
            : null;

    return (
        marksheet && (
            <motion.div
                layout // Enables smooth height animation
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-black my-4 bg-green-900 border-black border-2 w-full sm:w-10/12 mx-auto flex flex-col items-center justify-center gap-4 p-4 rounded-2xl relative">

                <AnimatePresence mode="wait">
                    {sem !== "overall" && (
                        <motion.div
                            key={sem}
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <RadarChartSingleSemester graphData={currentSemData} />
                        </motion.div>

                    )}
                </AnimatePresence>



                {/* Header */}
                <h2 className="font-gabarito font-bold text-center text-2xl sm:text-3xl border-b-4 border-white pb-2 text-white">
                    Student MarkSheet
                </h2>

                {/* Toggle Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {/* Overall Button */}
                    <button
                        key="overall"
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
                        border-2 shadow-sm 
                        ${sem === "overall"
                                ? "bg-green-200 text-green-900 border-green-400"
                                : "bg-white text-green-800 border-green-500 hover:bg-green-50"
                            }`}
                        onClick={() => setSem("overall")}
                    >
                        Overall
                    </button>

                    {/* Semester Buttons */}
                    {marksheet.OverAllSemesterData.map((semester) => {
                        const selected = sem === String(semester.semesterNum);
                        return (
                            <button
                                key={semester.semesterNum}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
                                border-2 shadow-sm
                                ${selected
                                        ? "bg-green-300/90 text-green-900 border-green-600"
                                        : "bg-white text-green-800 border-green-500 hover:bg-green-50"
                                    }`}
                                onClick={() => setSem(String(semester.semesterNum))}
                            >
                                Sem {semester.semesterNum}
                            </button>
                        );
                    })}
                </div>



                {/* Summary Section */}
                <div className="w-full flex flex-col justify-center items-center bg-emerald-200 py-4 rounded-2xl  border-2">
                    <div className="w-[90%] sm:w-10/12 grid gap-2  grid-cols-3 sm:grid-cols-4 text-xs sm:text-sm font-lexend">
                        <div className="flex flex-col  border-black  border-2 justify-center items-center p-2 rounded-xl font-semibold">
                            <div>Marks</div>
                            <div>{
                                sem === "overall"
                                    ? `${marksheet?.earnTotal}/${marksheet?.totalMarks}`
                                    : `${currentSemData?.totalMarks}/${currentSemData?.maxMarks}`
                            }</div>
                        </div>
                        <div className="flex flex-col border-black   border-2 justify-center items-center p-2 rounded-xl font-semibold">
                            <div>Credits</div>
                            <div>
                                {

                                    sem === "overall"
                                        ? `${marksheet?.earnCredits}/${marksheet?.totalCredits}`
                                        : `${currentSemData?.totalCredits}/${currentSemData?.maxCredits}`
                                }
                            </div>
                        </div>
                        <div className="flex flex-col border-black  border-2 justify-center items-center p-2 rounded-xl font-semibold">
                            <div>Percentage</div>
                            <div>{sem === "overall"
                                ? marksheet?.percentage?.toFixed(2)
                                : currentSemData?.percentage?.toFixed(2)}%</div>
                        </div>
                        <div className="flex flex-col border-2  border-black   justify-center items-center p-2 rounded-xl font-semibold">
                            <div>{sem === "overall" ? "CGPA" : "SGPA"}</div>
                            <div>
                                {sem === "overall"
                                    ? marksheet?.cgpa
                                    : currentSemData?.gpa?.toFixed(3)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section with smooth height animation */}
                <motion.div
                    layout
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full min-h-[33rem] flex flex-col gap-2 bg-emerald-200 p-3 rounded-2xl border-2"
                >
                    {sem === "overall" ? (
                        <>
                            {/* Overall Table */}
                            <div className="font-rubik text-[10px] sm:text-base grid grid-cols-4 gap-6 my-2 p-3 rounded-xl bg-green-900 text-white font-medium text-center">
                                <div>Semester</div>
                                <div>Marks</div>
                                <div>Percentage</div>
                                <div>SGPA</div>
                            </div>

                            {marksheet?.OverAllSemesterData?.map((semester) => (
                                <motion.div
                                    layout
                                    key={semester.semesterNum}
                                    className="font-lexend font-semibold cursor-pointer bg-emerald-100 rounded-xl grid grid-cols-4 gap-6 p-2 px-3 text-green-800 hover:bg-green-200 hover:scale-102 text-[8px] sm:text-sm border-2 text-center border-green-800"
                                >
                                    <div>{`Sem ${semester.semesterNum}`}</div>
                                    <div>{`${semester.totalMarks}/${semester.maxMarks}`}</div>
                                    <div>{`${semester.percentage?.toFixed(3)}%`}</div>
                                    <div>{semester.gpa?.toFixed(3)}</div>
                                </motion.div>
                            ))}
                        </>
                    ) : (
                        <>
                            {/* Semester Table */}
                            <div className="font-rubik text-[10px] sm:text-base grid grid-cols-10 gap-x-2  sm:gap-6 my-2 p-3 rounded-xl bg-green-800 text-white font-medium">
                                <div className="col-span-4">Subject (credits)</div>
                                <div className="text-center col-span-2">Course Code</div>
                                <div className="text-center col-span-2">Int.|Ext.</div>
                                <div className="text-center col-span-2">Marks</div>
                            </div>

                            {currentSemData?.semesterWiseSubjectData?.map((subject) => (
                                <motion.div
                                    layout
                                    key={subject.subjectCode}
                                    className="font-lexend cursor-pointer bg-emerald-100 rounded-xl grid grid-cols-10 gap-x-2 sm:gap-6 p-2 px-3 text-green-800 hover:bg-green-200 hover:scale-102 text-[8px] sm:text-sm font-medium border-2 border-green-800"
                                >
                                    <div className="col-span-4 ">
                                        {subject.subjectname} ({subject.credit})
                                    </div>
                                    <div className="text-center col-span-2">{subject.subjectCode}</div>
                                    <div className="text-center col-span-2">
                                        {subject.internal}|{subject.external}
                                    </div>
                                    <div className="col-span-2 flex justify-center items-center gap-1 flex-wrap">
                                        <span>{`${subject.total} (${subject.grade})`}</span>
                                        {subject.backlog && (
                                            <span className="text-[8px] sm:text-xs text-white px-1 bg-red-500 rounded-sm">
                                                Backlog
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </>
                    )}
                </motion.div>
            </motion.div>
        )
    );
};


export default function DashBoard() {
    const { enroll } = useParams();

    const {
        data: enrollmentData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['search-enrollment', enroll],
        queryFn: () => services.getStudentByEnrollment(String(enroll)),
        enabled: !!enroll,
    });


    const [activeTab, setActiveTab] = useState<"overall" | "semester" | "analysis">("overall");

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (isError || !enrollmentData?.data) {
        return <div className="w-full flex items-center justify-center">
            <span className="px-2.5 text-red-700 border-black/30 py-1.5  border rounded-2xl">{error?.message}</span>
        </div>
    }

    const student = enrollmentData.data;
    const marksheet = () => {
        return {

            earnTotal: student.totalMarks,
            totalMarks: student.maxMarks,
            totalCredits: student.maxCredits,
            earnCredits: student.totalCredits,
            percentage: student.percentage,
            cgpa: student.cgpa,
            OverAllSemesterData: student.semesters.map((semester) => {
                return {
                    totalMarks: semester?.totalMarks || 0,
                    maxMarks: semester?.maxMarks || 0,
                    totalCreditMarks: semester?.totalCreditMarks || 0,
                    maxCreditMarks: semester?.maxCreditMarks || 0,
                    totalCredits: semester?.totalCredits || 0,
                    maxCredits: semester?.maxCredits || 0,
                    percentage: semester?.percentage || 0,
                    gpa: semester?.sgpa || 0,
                    semesterNum: semester.sem || "",
                    semesterWiseSubjectData: semester.subjects.map((sub) => ({
                        subjectname: sub.paperName,
                        subjectCode: sub.paperCode,
                        internal: sub.internal || 0,
                        external: sub.external || 0,
                        total: sub.total || 0,
                        credit: sub.credits || 0,
                        grade: sub.grade,
                        backlog: sub.backlog
                    }))
                }
            })
        }
    }
    const StudentDashbaordData = marksheet()

    return (
        <div className="w-full min-h-screen">
            <Header student={student} />
            <Achievments student={student} />

            <div className="w-full flex flex-col items-center justify-center gap-2 sm:gap-4 mb-3.5">
                <div className="flex w-full lg:max-w-7xl mb-10 border cursor-pointer border-green-600 rounded-md py-0.5 bg-green-50 my-2">
                    {[
                        { label: "Overview", key: "overall" },
                        { label: "Semesters", key: "semester" },
                        { label: "Insights", key: "analysis" }
                    ].map((item) => (
                        <span
                            key={item.key}
                            onClick={() => setActiveTab(item.key as typeof activeTab)}
                            className={`w-full whitespace-nowrap text-sm sm:text-base py-1 text-center rubik rounded-md mx-0.5 ${activeTab === item.key ? "bg-green-800/90 font-semibold" : "hover:bg-black/5 text-black"
                                }`}
                        >
                            {item.label}
                        </span>
                    ))}
                </div>
            </div>


            {/* CONDITIONAL VIEWS */}
            {activeTab === "overall" && (
                <Chart student={student} />
            )}

            {activeTab === "semester" && (
                <div className="min-h-screen">
                    <MarkSheet marksheet={StudentDashbaordData} />
                </div>
            )}

            {activeTab === "analysis" && (
                <div className="overflow-auto">
                    <ResultInsights student={student} />
                </div>
            )}
        </div>
    );
}

