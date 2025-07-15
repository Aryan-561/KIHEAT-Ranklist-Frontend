import { useParams } from "react-router-dom";
import type { StudentByEnrollmentResponse } from "../../interface";
import { services } from "../../services/services";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import Chart, { ResultInsights } from "./Chart";
import { Achievments } from "./Header";
export type Student = StudentByEnrollmentResponse['data'];
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type FiltersProps = {
    student: Student;
    search: string;
    setSearch: (val: string) => void;
    sub: string;
    setSub: (val: string) => void;
    sem: string;
    setSem: (val: string) => void;
};



const Filters = ({
    student,
    search,
    setSearch,
    sub,
    setSub,
    sem,
    setSem,
}: FiltersProps) => {
    const [filteredCount, setFilteredCount] = useState(0);

    useEffect(() => {
        let total = 0;

        student.semesters.forEach((s) => {
            if (sem && s.sem.toString() !== sem) return;

            s.subjects.forEach((subject) => {
                const matchType =
                    sub === "" ||
                    (sub === "practical"
                        ? subject.paperName.toLowerCase().includes("practical")
                        : !subject.paperName.toLowerCase().includes("practical"));

                const matchSearch =
                    search === "" ||
                    subject.paperName.toLowerCase().includes(search.toLowerCase()) ||
                    subject.paperCode.toLowerCase().includes(search.toLowerCase());

                if (matchType && matchSearch) total += 1;
            });
        });

        setFilteredCount(total);
    }, [student, sem, sub, search]);

    return (
        <section className="bg-green-50/55 bg-gradient-to-tl from-green-300/40 to-blue-200/10 border border-black/15 shadow-2xs p-6 rounded-lg">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
                    <i className="fas fa-filter text-green-800"></i>
                    Advanced Search & Filters
                </h2>
                <p className="text-sm text-green-700">
                    Find and analyze specific subjects with powerful filtering options
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <input
                    type="text"
                    placeholder="Search subjects by name, code, or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 text-black min-w-[250px] px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <select
                    value={sem}
                    onChange={(e) => setSem(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-green-300 bg-white text-green-800"
                >
                    <option value="">All Semesters</option>
                    {student.semesters.map((s, i) => (
                        <option key={i} value={s.sem}>{`${s.sem} Semester`}</option>
                    ))}
                </select>

                <select
                    value={sub}
                    onChange={(e) => setSub(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-green-300 bg-white text-green-800"
                >
                    <option value="theory">Theory</option>
                    <option value="practical">Practical</option>
                </select>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <span className="px-3 py-1 text-sm rounded-full bg-white border border-green-300 text-green-900">
                    {filteredCount} subjects found
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-white border border-green-300 text-green-900">
                    {sub.toUpperCase()}
                </span>
            </div>
        </section>
    );
};

export default function DashBoard() {
    const { enroll } = useParams();

    const {
        data: enrollmentData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['search-enrollment', enroll],
        queryFn: () => services.getStudentByEnrollment(String(enroll)),
        enabled: !!enroll,
    });

    const [search, setSearch] = useState("");
    const [sub, setSub] = useState("theory");
    const [sem, setSem] = useState("");

    const [activeTab, setActiveTab] = useState<"overall" | "semester" | "analysis">("overall");

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (isError || !enrollmentData?.data) {
        return <p>Error loading student data or student not found.</p>;
    }

    const student = enrollmentData.data;

    return (
        <div className="w-full min-h-screen">
            <Header student={student} />
            <Achievments student={student} />

            <div className="flex w-full border cursor-pointer border-green-600 rounded-md py-0.5 bg-green-50 my-2">
                {[
                    { label: "Overview", key: "overall" },
                    { label: "Semesters", key: "semester" },
                    { label: "Insights", key: "analysis" }
                ].map((item) => (
                    <span
                        key={item.key}
                        onClick={() => setActiveTab(item.key as typeof activeTab)}
                        className={`w-full whitespace-nowrap text-sm sm:text-base py-1 text-center rubik rounded-md mx-0.5 ${activeTab === item.key ? "bg-green-700 font-semibold" : "hover:bg-black/5 text-black"
                            }`}
                    >
                        {item.label}
                    </span>
                ))}
            </div>

            {/* CONDITIONAL FILTERS */}
            {activeTab === "semester" && (
                <Filters
                    student={student}
                    search={search}
                    setSearch={setSearch}
                    sub={sub}
                    setSub={setSub}
                    sem={sem}
                    setSem={setSem}
                />
            )}

            {/* CONDITIONAL VIEWS */}
            {activeTab === "overall" && (
                <Chart student={student} />
            )}

            {activeTab === "semester" && (
                <div>
                    <p className="text-center font-semibold text-lg mb-2">Semester-wise Performance</p>
                    {/* <Chart student={student}  /> */}
                </div>
            )}

            {activeTab === "analysis" && (
                <div  className="overflow-auto">
                    <ResultInsights student={student} />
                </div>
            )}
        </div>
    );
}


