import type { StudentByEnrollmentResponse } from '../../interface';
import {
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
    ComposedChart,
    BarChart,
    Radar,
    RadarChart,

    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from "recharts";

import { Radar as RadarChartJS } from 'react-chartjs-2';


import { FaTrophy, FaArrowDown, FaRankingStar } from 'react-icons/fa6';
import { GiSpiderWeb } from "react-icons/gi";
import { FaBolt } from "react-icons/fa";
import {
    FaMagnifyingGlassChart,
    FaRegChartBar,
    FaSignal,
} from "react-icons/fa6"

import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip as ChartToolTip,
    Legend as ChartLegend,
} from 'chart.js';
export type Student = StudentByEnrollmentResponse['data'];
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    ChartToolTip,
    ChartLegend
);

const gradeColorMap: Record<string, string> = {
    "O": "#30A17B",
    "A+": "#3AB795",
    "A": "#2E8B70",
    "B+": "#28775F",
    "B": "#1F604D",
    "C": "#195344",
    "P": "#12453A",
    "F": "#E74C3C",
};

const getColor = (grade: string) => gradeColorMap[grade] || "#CBD5E1";

export default function Chart({ student }: { student: Student }) {
    const chartData = () => {
        return student.semesters.map((stu) => ({
            sem: stu.sem,
            sgpa: stu.sgpa,
            percentage: stu.percentage,
            internal: stu.subjects.reduce((sum, s) => sum + s.internal, 0),
            external: stu.subjects.reduce((sum, s) => sum + s.external, 0),
            Grade: stu.subjects.reduce((acc: { [key: string]: number }, subject) => {
                const grade = subject.grade.trim().toUpperCase();
                acc[grade] = (acc[grade] || 0) + 1;
                return acc;
            }, {})
        }));
    };

    const data = chartData();

    const combinedGradeCounts: { [key: string]: number } = {};
    data.forEach((sem) => {
        if (sem.Grade) {
            Object.entries(sem.Grade).forEach(([grade, count]) => {
                combinedGradeCounts[grade] = (combinedGradeCounts[grade] || 0) + count;
            });
        }
    });

    const gradeData = Object.entries(combinedGradeCounts).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <div className="p-1 sm:p-4  font-lexend grid grid-cols-1 place-items-center lg:grid-cols-2 gap-4 min-h-screen">
            {/* 1. SGPA & Percentage Chart */}
            <div className="bg-green-50 h-full hover:shadow-xl border-2 border-black w-full sm:w-[90%] lg:w-full  p-3 sm:p-4 rounded-lg shadow-md">
                <h2 className="font-semibold text-base sm:text-lg mb-2  text-black">Academic Performance Journey</h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                    Your SGPA progression shows consistent improvement across semesters
                </p>
                <ResponsiveContainer width="100%" height={250}>
                    <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="sem" />
                        <YAxis yAxisId="left" domain={[1, 10]} />
                        <YAxis yAxisId="right" orientation="right" domain={[1, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="right" dataKey="percentage" fill="#9AE6B4" barSize={40} />
                        <Line yAxisId="left" type="monotone" dataKey="sgpa" stroke="#2F855A" strokeWidth={2} dot={{ r: 4 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* 2. Internal vs External Chart */}
            <div className="bg-green-50 h-full sm:w-[90%] lg:w-full border-2 border-black  p-3 sm:p-4 rounded-lg shadow-md hover:shadow-xl">
                <h2 className="font-semibold text-base sm:text-lg mb-2 rubik text-black">Internal vs External Performance</h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                    Comparison of internal assessment and external exam performance
                </p>
                <ResponsiveContainer className={``} width="100%" height={250}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sem" />
                        <YAxis
                            domain={[
                                0,
                                Math.ceil(
                                    (Math.max(...data.map(item => item.internal + item.external)) ) / 100
                                ) * 100
                            ]}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="internal" fill="#38A169" />
                        <Bar dataKey="external" fill="#2F855A" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 3. Grade Pie Chart + Breakdown */}
            <div className="bg-green-50 h-full p-3 sm:p-4 w-full sm:w-[90%] lg:w-full  border-2 border-black rounded-lg shadow-md col-span-1 lg:col-span-2">
                <h2 className="font-semibold text-base sm:text-lg mb-2 text-black">Comprehensive Grade Analysis</h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">
                    Detailed breakdown of your grade distribution across all subjects
                </p>

                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                    {/* Pie Chart */}
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={gradeData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                label
                            >
                                {gradeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Grade Breakdown */}
                    <div className="w-full md:w-1/2 space-y-2">
                        {gradeData.map((grade, index) => {
                            const color = getColor(grade.name);
                            return (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-3 rounded-md shadow-sm"
                                    style={{
                                        backgroundColor: `${color}33`,
                                        color,
                                    }}
                                >
                                    <span className="font-medium" style={{ color }}>
                                        Grade {grade.name}
                                    </span>
                                    <span className="text-sm">{grade.value} subjects</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const ResultInsights = ({ student }: { student: Student }) => {

    const useIsMobile = () => {
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth < 640);
            };

            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return isMobile;
    };

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
    const isMobile = useIsMobile();

    const radarLabels = [...top3, ...bottom3].map(
        (s) => isMobile
            ? [s.code, `(Sem ${s.sem})`]
            : [s.name, `(Sem ${s.sem})`]
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
            <div className="p-4 bg-green-50 font-lexend rounded-xl shadow">
                <h2 className="text-lg font-semibold text-black mb-2 flex items-center gap-2">
                    <GiSpiderWeb className="text-green-600" />
                    Top & Bottom Subjects Radar
                </h2>
                <RadarChartJS data={radarData} options={radarOptions} />
            </div>

            {/* Highlights */}
            <div className="p-4 bg-green-50 font-lexend rounded-xl shadow">
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
                            className="flex justify-between capitalize items-center bg-green-100 text-green-900 px-3 py-2 rounded-lg mb-2"
                        >
                            <span>
                                #{i + 1} {s.name.toLowerCase()} ({s.code} - Sem {s.sem})
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
                            className="flex justify-between capitalize items-center bg-red-100 text-red-900 px-3 py-2 rounded-lg mb-2"
                        >
                            <span>
                                #{i + 1} {s.name.toLowerCase()} ({s.code} - Sem {s.sem})
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
                className="col-span-1 md:col-span-2 p-6 bg-green-50 rounded-2xl shadow-md border border-gray-200"
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
                                                    : "🕵️‍♂️ So low even Sherlock can't find it!"
                            }
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

interface SubjectData {
    subjectname: string;
    internal: number;
    external: number;
    subjectCode: string
}

interface SemesterData {
    semesterNum: number | string;
    semesterWiseSubjectData: SubjectData[];
}

export const RadarChartSingleSemester = ({ graphData }: { graphData: SemesterData | null }) => {
    const subjects = graphData?.semesterWiseSubjectData || [];

    // Convert to Recharts data format
    const radarData = subjects.map((subject) => ({
        subject: subject.subjectname,
        subjectCode: subject.subjectCode,
        Internal: subject.internal,
        External: subject.external,
    }));

    return (
        <div className="w-full  p-4 rounded-2xl  max-w-3xl mx-auto">
            <h2 className="text-white text-xl font-semibold text-center mb-4">
                Semester {graphData?.semesterNum} – Internal vs External Marks
            </h2>
            <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#a7f3d0" />
                    <PolarAngleAxis dataKey="subjectCode" tick={{ fill: "white", fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 60]} tick={{ fill: "#ecfdf5" }} />
                    <Tooltip
                        formatter={(value: number, name: string) =>
                            [`${value}`, name === "Internal" ? "Internal Marks" : "External Marks"]
                        }
                        labelFormatter={(label: string) => {
                            const fullName = radarData.find(d => d.subjectCode === label)?.subject;
                            return fullName ? `Subject: ${fullName}` : `Subject Code: ${label}`;
                        }}
                        contentStyle={{
                            backgroundColor: "#064e3b",
                            borderColor: "#10b981",
                            color: "#fff",
                        }}
                        itemStyle={{ color: "#d1fae5" }}
                    />
                    <Radar
                        name="Internal"
                        dataKey="Internal"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.4}
                    />
                    <Radar
                        name="External"
                        dataKey="External"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
