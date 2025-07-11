import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { services } from '../../services/services';
import type {
    ErrorResponse,
    StudentByEnrollmentResponse,
    StudentByNameResponse,
} from '../../interface';
import StudentCard from '../Card/StudentCard';


export function isSuccessResponse<T extends { success: boolean }>(data: any): data is T {
    return data && typeof data === 'object' && data.success === true;
}

function isErrorResponse(data: any): data is ErrorResponse {
    return data && typeof data === 'object' && data.success === false && typeof data.message === 'string';
}



function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [program, setProgram] = useState("");
    const [visibleCount, setVisibleCount] = useState(3);

    const isEnrollment = /^\d{3}$/.test(searchTerm.trim());

    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if (bottom) {
                setVisibleCount((prev) => prev + 3); // show next 3 results
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const {
        data: enrollmentData,
        error: enrollmentError,
        refetch: refetchEnrollment,
        isFetching: isFetchingEnrollment,
    } = useQuery<StudentByEnrollmentResponse | ErrorResponse>({
        queryKey: ['search-enrollment', searchTerm],
        queryFn: () => services.getStudentByEnrollment(searchTerm),
        enabled: false,
    });

    const {
        data: nameData,
        error: nameError,
        refetch: refetchName,
        isFetching: isFetchingName,
    } = useQuery<StudentByNameResponse | ErrorResponse>({
        queryKey: ['search-name', searchTerm],
        queryFn: () => services.getStudentsByName(searchTerm, program),
        enabled: false,
    });

    const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!searchTerm.trim()) return;
        isEnrollment ? refetchEnrollment() : refetchName();
    };

    const loading = isFetchingEnrollment || isFetchingName;

    return (
        <div className="min-h-screen bodyBg flex flex-col items-center rounded-2xl border border-green-300 w-full p-6">
            <div className="text-center max-w-3xl">
                <h1 className="text-5xl font-bold text-green-800 my-6">Student Search</h1>
                <p className="text-lg font-medium text-green-900">
                    Search by enrollment number for direct profile or by name for all matches.
                </p>
            </div>

            {/* Search Bar */}
            <form className="grid sm:flex items-center justify-center gap-4 my-6 w-full max-w-3xl" onSubmit={(e) => e.preventDefault()}>
                <select
                    disabled={isEnrollment}
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="px-4 py-2 text-center rounded-lg accent text-white text-lg font-semibold bg-green-700 disabled:bg-gray-300"
                >
                    {["BCA", "BCOM", "BBA"].map((prog) => (
                        <option key={prog} value={prog} className="text-black">
                            {prog}
                        </option>
                    ))}
                </select>

                <div className="flex-grow flex items-center border border-green-300 rounded-lg px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-green-400">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-green-700 mr-3" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter enrollment number or name..."
                        className="w-full text-gray-900 text-lg placeholder-gray-500 focus:outline-none"
                    />
                </div>

                <button
                    onClick={handleSearch}
                    className="px-5 py-3 bg-green-700 hover:bg-green-800 text-white text-lg font-semibold rounded-lg transition"
                >
                    Search
                </button>
            </form>

            {loading && (
                <p className="loader"></p>
            )}

            {/* Error Handling */}
            {isErrorResponse(enrollmentData) && (
                <div className="bg-yellow-100 text-red-800 px-4 py-2 rounded mt-4 max-w-3xl">
                    <p>{enrollmentData.message || "No student found with this enrollment number."}</p>
                </div>
            )}

            {isErrorResponse(nameData) && (
                <div className="bg-yellow-100 text-red-800 px-4 py-2 rounded mt-4 max-w-3xl">
                    <p>{nameData.message || "No students found with this name."}</p>
                </div>
            )}


            {(isSuccessResponse(enrollmentData) || isSuccessResponse(nameData)) && (
                <div className="w-full max-w-3xl  border border-green-300 shadow-2xl rounded-2xl p-6 mt-4">
                    <h2 className="text-2xl font-semibold font-serif text-green-700 mb-4 text-center">Search Results</h2>

                    {isSuccessResponse<StudentByNameResponse>(nameData) && nameData.data.length > 0 && (
                        <>
                            {nameData.data.slice(0, visibleCount).map((student, idx) => (
                                <StudentCard key={idx} student={student} />
                            ))}

                            {visibleCount >= nameData.data.length && (
                                <p className="text-center text-green-700 mt-4 font-medium">
                                    You've reached the end of the results.
                                </p>
                            )}
                        </>
                    )}


                </div>
            )}
        </div>

    );
}

export default Search;

