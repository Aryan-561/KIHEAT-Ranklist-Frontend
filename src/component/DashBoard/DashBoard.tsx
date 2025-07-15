import { useParams } from "react-router-dom";
import type { StudentByEnrollmentResponse } from "../../interface";
import { services } from "../../services/services";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import Chart from "./Chart";
import { Achievments } from "./Header";
export type Student = StudentByEnrollmentResponse['data'];
import { useEffect, useState } from "react";
import {
    FaMagnifyingGlassChart,
    FaRegChartBar,
    FaSignal,
} from "react-icons/fa6"

import { motion } from "framer-motion";
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { FaTrophy, FaArrowDown, FaRankingStar } from 'react-icons/fa6';
import { GiSpiderWeb } from "react-icons/gi";
import { FaBolt } from "react-icons/fa";
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

const ResultInsights = ({ student }: { student: Student }) => {
    const allSubjects = student.semesters.flatMap((sem) =>
        sem.subjects.map((sub) => ({
            name: sub.paperName,
            code: sub.paperCode,
            marks: sub.total,
            sem: sem.sem,
        }))
    );

    const sortedSubjects = [...allSubjects].sort((a, b) => b.marks - a.marks);
    const top3 = sortedSubjects.slice(0, 3);
    const bottom3 = sortedSubjects.slice(-3).reverse();

    const radarLabels = [...top3, ...bottom3].map(
        (s) => `${s.name} (Sem ${s.sem})`
    );
    const radarValues = [...top3, ...bottom3].map((s) => s.marks);

    const radarData = {
        labels: radarLabels,
        datasets: [
            {
                label: "Subject Scores",
                data: radarValues,
                backgroundColor: "rgba(34,197,94,0.2)",
                borderColor: "rgba(34,197,94,1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(34,197,94,1)",
            },
        ],
    };

    const radarOptions = {
        responsive: true,
        scales: {
            r: {
                beginAtZero: true,
                max: Math.ceil(Math.max(...radarValues) / 10) * 10,
                ticks: {
                    stepSize: 20,
                    backdropColor: "transparent",
                    color: "#6b7280",
                },
                pointLabels: {
                    font: { size: 13 },
                    color: "#000000",
                },
                grid: {
                    color: "#e5e7eb",
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    // Best & Worst Sem
    const percentages = student.semesters.map((s) => ({
        sem: s.sem,
        percentage:
            s.subjects.reduce((acc, sub) => acc + sub.total, 0) /
            s.subjects.length,
    }));
    const highestSem = percentages.reduce((a, b) => (a.percentage > b.percentage ? a : b));
    const lowestSem = percentages.reduce((a, b) => (a.percentage < b.percentage ? a : b));

    const avg = percentages.reduce((acc, curr) => acc + curr.percentage, 0) / percentages.length;
    const stdDev = Math.sqrt(
        percentages.reduce((acc, curr) => acc + Math.pow(curr.percentage - avg, 2), 0) / percentages.length
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-green-50 rounded-xl">

            {/* Radar Chart */}
            <div className="p-4 bg-white rounded-xl shadow">
                <h2 className="text-lg font-semibold text-black mb-2 flex items-center gap-2">
                    <GiSpiderWeb className="text-green-600" />
                    Top & Bottom Subjects Radar
                </h2>
                <Radar data={radarData} options={radarOptions} />
            </div>

            {/* Highlights */}
            <div className="p-4 bg-white rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2 text-black">
                    Performance Highlights
                </h2>

                <div className="mb-4">
                    <h3 className="text-black font-semibold mb-1 flex items-center gap-2">
                        <FaTrophy className="text-green-500" /> Top Achievements
                    </h3>
                    {top3.map((s, i) => (
                        <div
                            key={s.code}
                            className="flex justify-between items-center bg-green-100 text-green-900 px-3 py-2 rounded-lg mb-2"
                        >
                            <span>
                                #{i + 1} {s.name} ({s.code} - Sem {s.sem})
                            </span>
                            <span className="font-bold text-lg">{s.marks}</span>
                        </div>
                    ))}
                </div>

                <div>
                    <h3 className="text-black font-semibold mb-1 flex items-center gap-2">
                        <FaArrowDown className="text-red-500" /> Growth Opportunities
                    </h3>
                    {bottom3.map((s, i) => (
                        <div
                            key={s.code}
                            className="flex justify-between items-center bg-red-100 text-red-900 px-3 py-2 rounded-lg mb-2"
                        >
                            <span>
                                #{i + 1} {s.name} ({s.code} - Sem {s.sem})
                            </span>
                            <span className="font-bold text-lg">{s.marks}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Deep Analysis */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="col-span-1 md:col-span-2 p-6 bg-white rounded-2xl shadow-md border border-gray-200"
            >
                <h2 className="text-lg font-bold mb-4 text-black flex items-center gap-2">
                    <FaMagnifyingGlassChart className="text-indigo-600" />
                    Performance Deep Dive
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-800">
                    <div className="flex cursor-pointer hover:bg-green-200/50  items-start gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                        <FaRegChartBar className="text-blue-500 text-xl mt-1" />
                        <div>
                            <strong>Best Semester:</strong>
                            <br />
                            Semester <strong>{highestSem.sem}</strong> with{" "}
                            <strong>{highestSem.percentage.toFixed(2)}%</strong>
                        </div>
                    </div>

                    <div className="flex cursor-pointer hover:bg-green-200/50  items-start gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                        <FaSignal className="text-red-500 text-xl mt-1" />
                        <div>
                            <strong>Lowest Semester:</strong>
                            <br />
                            Semester <strong>{lowestSem.sem}</strong> with{" "}
                            <strong>{lowestSem.percentage.toFixed(2)}%</strong>
                        </div>
                    </div>

                    <div className="flex cursor-pointer hover:bg-green-200/50  items-start gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                        <FaBolt className="text-yellow-500 text-xl mt-1" />
                        <div>
                            <strong>Consistency Score:</strong>
                            <br />
                            {stdDev.toFixed(2)}{" "}
                            <span className="text-xs text-gray-500">(Lower = more consistent)</span>
                        </div>
                    </div>

                    <div className=" flex cursor-pointer hover:bg-green-200/50   items-start gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                        <FaRankingStar className="text-purple-600 text-xl mt-1" />
                        <div>
                            <strong>CGPA:</strong> {student.cgpa} / 10 <br />
                            <strong>Remark:</strong>{" "}
                            {student.cgpa >= 9
                                ? "🌟 Exceptional – Dean’s List"
                                : student.cgpa >= 8.5
                                    ? "🎓 Excellent – Honors Candidate"
                                    : student.cgpa >= 7.5
                                        ? "✅ Very Good – Keep building"
                                        : student.cgpa >= 6.5
                                            ? "🟡 Decent – Improve weaker terms"
                                            : student.cgpa >= 5.5
                                                ? "⚠️ Below Average – Focus more"
                                                : student.cgpa >= 4
                                                    ? "🔴 Poor – Critical improvement needed"
                                                    : "❌ CGPA Error – Please check"}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
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
                    { label: "Overall Performance", key: "overall" },
                    { label: "Semester Wise", key: "semester" },
                    { label: "Deep Analysis", key: "analysis" }
                ].map((item) => (
                    <span
                        key={item.key}
                        onClick={() => setActiveTab(item.key as typeof activeTab)}
                        className={`w-full whitespace-nowrap text-sm sm:text-base px-0.5 py-1 text-center rubik rounded-md mx-1 ${activeTab === item.key ? "bg-green-700 font-semibold" : "hover:bg-black/5 text-black"
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
                <div>
                    <ResultInsights student={student} />
                </div>
            )}
        </div>
    );
}


