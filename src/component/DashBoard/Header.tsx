import type { StudentByEnrollmentResponse } from '../../interface';

// In interface.ts or locally:
export type Student = StudentByEnrollmentResponse['data'];


function Header({student}:{student:Student}) {
    return (
        <div className="bg-green-800 text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between w-full  mx-auto gap-6">
            <div className="flex items-start gap-4">
                <div className="bg-white text-green-800 p-3 rounded-full">
                    {/* Icon */}
                    <svg xmlns="/icon.png" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0118 13.5c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-.61.14-1.184.384-1.707L12 14z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{student.name}</h1>
                    <p className="text-sm">Enrollment: <span className="font-semibold">{student.enrollment}</span></p>
                    <p className="text-sm uppercase font-medium text-gray-200">{student.programme}</p>
                    <div className="flex gap-2 mt-2 text-sm text-green-100 font-medium">
                        <span className="bg-green-700 px-3 py-1 rounded-full">Batch {student.batch}</span>
                        <span className="bg-green-700 px-3 py-1 rounded-full"> Total {student.semestersCount} semesters</span>
                        <span className="bg-green-700 px-3 py-1 rounded-full">{student.totalCredits} Credits</span>
                    </div>
                </div>
            </div>

            <div className="text-center md:text-right">
                <h2 className="text-5xl font-extrabold text-white">{student.cgpa}</h2>
                <p className="text-lg font-semibold">CGPA</p>
                <p className="text-sm text-green-200">{student.percentage}% Overall</p>
                <div className="mt-4 flex justify-center md:justify-end gap-2">
                    <button className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Export Report
                    </button>
                    <button className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-1">
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

export default Header
