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
} from "recharts";

export type Student = StudentByEnrollmentResponse['data'];

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
        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-screen">
            {/* 1. SGPA & Percentage Chart */}
            <div className="bg-white hover:shadow-xl w-full p-4 rounded-lg shadow-md">
                <h2 className="font-semibold text-lg mb-2 rubik text-black">Academic Performance Journey</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Your SGPA progression shows consistent improvement across semesters
                </p>
                <ResponsiveContainer width="100%" height={250}>
                    <ComposedChart data={data} margin={{ top: 20, right: 30, bottom: 10, left: 10 }}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="sem" />
                        <YAxis yAxisId="left" domain={[6, 10]} />
                        <YAxis yAxisId="right" orientation="right" domain={[60, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="right" dataKey="percentage" fill="#9AE6B4" barSize={40} />
                        <Line yAxisId="left" type="monotone" dataKey="sgpa" stroke="#2F855A" strokeWidth={2} dot={{ r: 4 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* 2. Internal vs External Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl">
                <h2 className="font-semibold text-lg mb-2 rubik text-black">Internal vs External Performance</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Comparison of internal assessment and external exam performance
                </p>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sem" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="internal" fill="#38A169" />
                        <Bar dataKey="external" fill="#2F855A" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 3. Grade Pie Chart + Breakdown */}
            <div className="bg-white p-4 rounded-lg shadow-md col-span-1 lg:col-span-2">
                <h2 className="font-semibold text-lg mb-2 text-black">Comprehensive Grade Analysis</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Detailed breakdown of your grade distribution across all subjects
                </p>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Pie Chart */}
                    <ResponsiveContainer width="50%" height={250}>
                        <PieChart>
                            <Pie
                                data={gradeData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
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


