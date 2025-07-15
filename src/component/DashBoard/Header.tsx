import type { StudentByEnrollmentResponse } from '../../interface';
import { useLocation } from "react-router-dom";
import type { FC } from "react";
import {
    faGraduationCap,
    faBookOpen,
    faStar,
    faChartLine,
    faMedal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export type Student = StudentByEnrollmentResponse['data'];



export default function Header({ student }: { student: Student }) {
    const location = useLocation();
    const currentUrl = window.location.origin + location.pathname;

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            alert("Link copied to clipboard!");
        } catch (err) {
            alert("Failed to copy the link.");
        }
    };
    return (
        <div className="bg-green-800 text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between w-full  mx-auto gap-6">
            <div className=" flex  sm:flex-row flex-col  items-center gap-4">
                <div className="bg-white  text-green-800 p-3 rounded-full">
                    {/* Icon */}
                    <svg xmlns="/icon.png" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0118 13.5c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-.61.14-1.184.384-1.707L12 14z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-center sm:text-start">{student.name}</h1>
                    <p className="text-sm  sm:text-start text-center">Enrollment: <span className="font-semibold">{student.enrollment}</span></p>
                    <p className="text-sm uppercase font-medium text-gray-200 whitespace-nowrap  sm:text-start text-center">{student.programme}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-sm text-green-100 font-medium items-start">
                        <span className="text-center bg-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                            Batch {student.batch}
                        </span>
                        <span className="text-center bg-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                            All {student.semestersCount} semesters
                        </span>
                        <span className="text-center bg-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                            {student.totalCredits} Credits
                        </span>
                    </div>

                </div>
            </div>

            <div className="text-center md:text-right w-full">
                <div className="flex  md:flex-row items-center justify-center md:justify-end gap-2 md:gap-4">
                    <h2 className="text-5xl font-extrabold text-white leading-tight">{student.cgpa}</h2>
                    <p className="text-lg font-semibold text-green-100">CGPA</p>
                </div>
                <p className="text-sm text-green-200 mt-1 md:mt-2">{student.percentage}% Overall</p>
                <div className="mt-4 flex justify-center md:justify-end gap-2">
                    <button className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Export Report
                    </button>
                    <button onClick={handleShare} className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-1">
                        {/* Share Icon */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M12 12h.01" />
                        </svg>
                        Share Results
                    </button>
                </div>
            </div>
        </div>
    )
}


export const Achievments: FC<{ student: Student }> = ({ student }) => {

    const computeDetails = () => {
        const allSubjects = student.semesters.flatMap((sem) => sem.subjects);
        const theoryCount = allSubjects.filter((s) => s.type.toLowerCase() === "theory").length;
        const practicalCount = allSubjects.filter((s) => s.type.toLowerCase() === "practical").length;

        const subjectMarks = allSubjects.map((sub) => ({
            total: sub.total,
            name: sub.paperName,
        }));

        const sortedMarks = subjectMarks.sort((a, b) => b.total - a.total);
        const totalSubjects = sortedMarks.length;
        const highestScore = sortedMarks[0];
        const ninetyPlusSubjects = sortedMarks.filter((s) => s.total >= 90).length;

        return {
            CGPA: student.cgpa,
            totalSubjects,
            theoryCount,
            practicalCount,
            highestScore,
            ninetyPlusSubjects,
            totalCredits: student.totalCredits,
            maxCredits: student.maxCredits

        };
    };

    const details = computeDetails();

    const cards = [
        {
            title: "Overall CGPA",
            value: details.CGPA.toFixed(3),
            description: "Out of 10.0",
            icon: faGraduationCap,
        },
        {
            title: "Total Subjects",
            value: details.totalSubjects,
            description: `Theory: ${details.theoryCount}, Practical: ${details.practicalCount}`,
            icon: faBookOpen,
        },
        {
            title: "Highest Scored Subject",
            value: `${details.highestScore.name}`,
            description: `Marks: ${details.highestScore.total}`,
            icon: faChartLine,
        },
        {
            title: "90+ Marks Subjects",
            value: details.ninetyPlusSubjects,
            description: "Subjects with ≥ 90 marks",
            icon: faStar,
        },
        {
            title: `${details.maxCredits} Max Credits`,
            value: details.totalCredits,
            description: "Total Earned Credits",
            icon: faMedal,
        },
    ];

    return (
        <section className="flex flex-wrap justify-between gap-4 p-4 font-rubik">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className="w-full cursor-pointer hover:border-green-600 sm:w-[48%] lg:w-[19%] min-w-0 rounded-2xl shadow-md p-5 bg-green-50 border border-green-300 text-green-900 transition hover:shadow-lg"
                >
                    <div className="flex items-center justify-between mb-3">
                        <FontAwesomeIcon icon={card.icon} className="text-green-700 text-2xl" />
                        <h3 className="text-lg font-lexend">
                            {card.title}
                        </h3>
                    </div>

                    <p className="text-xl font-bold font-gabarito">
                        {card.value}
                    </p>

                    <p className="text-sm font-roboto-flex text-green-700 mt-1">
                        {card.description}
                    </p>
                </div>
            ))}
        </section>



    );
};

