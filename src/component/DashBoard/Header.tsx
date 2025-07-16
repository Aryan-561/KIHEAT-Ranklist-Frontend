import type { StudentByEnrollmentResponse } from '../../interface';
import {programmeCodes} from '../../constant/constant'
import { useLocation } from "react-router-dom";
import type { FC } from "react";
import {
    faGraduationCap,
    faBookOpen,
    faStar,
    faChartLine,
    faMedal,
    faCircleUser
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
        <div className="bg-emerald-900 m-6 text-white p-6 rounded-xl shadow-lg grid grid-col-1 sm:grid-cols-3 w-[95%]  mx-auto gap-6 font-rubik">
            <div className=" flex flex-col sm:flex-row  sm:col-span-2 items-center gap-2">
                
                <div className=''>
                    <div className='pb-1'>
                        <div className='flex  flex-col sm:flex-row justify-start items-center gap-3'>
                            <FontAwesomeIcon icon={faCircleUser} className='text-5xl' />
                        <div>
                        <h1 className="text-xl sm:text-3xl font-bold text-center sm:text-start mb-1">{student.name}</h1>
                        <p className="text-sm lg:text-lg  mb-1 sm:text-start text-center"><span className="font-semibold">{student.enrollment}</span></p>
                        </div>
                        </div>
                    <p className="text-xs sm:text-sm lg:text-lg uppercase font-medium text-gray-200   sm:text-start text-center">{student.programme} ({programmeCodes[student?.prgCode]})</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-green-100 font-medium items-start justify-center sm:justify-start  border-t-3 pt-3">
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

            <div className="text-center   md:text-right ">
                <div className="flex  sm:flex-row items-center justify-center sm:justify-end gap-2 sm:gap-4">
                    <h2 className="text-white  p-1 px-3 text-xl sm:text-3xl font-extrabold  leading-tight">{student.cgpa?.toFixed(3)} <span className='text-lg sm:text-1xl'>CGPA</span></h2>
                    {/* <p className="text-lg font-semibold text-green-100"></p> */}
                </div>
                <p className="text-sm sm:text-base text-green-200 mt-1 sm:mt-2">{student.percentage}% Overall</p>
                <div className="mt-4 flex justify-center md:justify-end gap-2">
                    {/* <button className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Export Report
                    </button> */}
                    <button onClick={handleShare} className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-1 cursor-pointer text-xs  sm:text-base">
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
        {
            title: "Highest Scored Subject",
            value: `${details.highestScore.name}`,
            description: `Marks: ${details.highestScore.total}`,
            icon: faChartLine,
        },
    ];

    return (
        <section className="flex flex-wrap justify-center place-items-center  gap-4 p-4 font-lexend font-semibold my-6">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className={`flex flex-col items-center justify-center w-full sm:w-[32%] lg:w-[22%] cursor-pointer min-h-[160px] text-center hover:border-green-600 rounded-2xl shadow-md p-4 bg-green-50 border border-green-300 text-green-900 transition hover:shadow-lg`}
                >
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <FontAwesomeIcon icon={card.icon} className="text-green-700 text-2xl" />
                        <h3 className="text-base font-lexend">
                            {card.title}
                        </h3>
                    </div>

                    <p className="text-base font-bold font-gabarito">
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

