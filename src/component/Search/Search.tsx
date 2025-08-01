import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { services } from '../../services/services';
import type {
    ErrorResponse,
    StudentByEnrollmentResponse,
    StudentByNameResponse,
} from '../../interface';
import StudentCard from '../Card/StudentCard';
import { IoIosArrowDropdown } from "react-icons/io";

export function isSuccessResponse<T extends { success: boolean }>(data: any): data is T {
    return data && typeof data === 'object' && data.success === true;
}

function isErrorResponse(data: any): data is ErrorResponse {
    return data && typeof data === 'object' && data.success === false && typeof data.message === 'string';
}



function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [program, setProgram] = useState("BCA");
    const [visibleCount, setVisibleCount] = useState(3);

    const isEnrollment = /^\d+$/.test(searchTerm.trim());
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        inputRef.current?.focus();
    })

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
    const [showDropdown, setShowDropdown] = useState(false);

    const {
        data: enrollmentData,
        refetch: refetchEnrollment,
        isFetching: isFetchingEnrollment,
    } = useQuery<StudentByEnrollmentResponse | ErrorResponse>({
        queryKey: ['search-enrollment', searchTerm],
        queryFn: () => services.getStudentByEnrollment(searchTerm),
        enabled: false,
    });

    const {
        data: nameData,
        refetch: refetchName,
        isFetching: isFetchingName,
    } = useQuery<StudentByNameResponse | ErrorResponse>({
        queryKey: ['search-name', searchTerm,program],
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
        <div className="min-h-screen bodyBg flex flex-col items-center rounded-2xl border border-green-300 w-full p-2 sm:p-6">
            <div className="text-center max-w-3xl font-rubik">
                <h1 className="text-3xl sm:text-5xl font-bold text-green-800 my-4 sm:my-6">Student Search</h1>
                <p className="text-sm sm:text-lg font-medium text-green-900">
                    Search by enrollment number for direct profile or by name for all matches.
                </p>
            </div>

            {/* Search Bar */}
            <form className="grid grid-cols-1 place-items-center space-y-2 sm:flex flex-row sm:items-start sm:justify-center sm:gap-4 my-6 w-full max-w-3xl font-roboto-flex" onSubmit={(e) => e.preventDefault()}>   
                <div className="relative w-22 sm:w-28 flex items-center justify-center text-lg ">
                    <button
                        type="button"
                        disabled={isEnrollment}
                        onClick={() => setShowDropdown(!showDropdown)}
                        className={`w-full flex justify-between items-center px-4 py-2 text-xs sm:text-lg font-semibold text-white rounded-lg text-center cursor-pointer ${isEnrollment ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'
                            }`}
                    >
                        {program}  {!showDropdown ?
                            <IoIosArrowDropdown className='transition  hover:animate-pulse' /> : <IoIosArrowDropdown className='transition-shadow hover:animate-pulse rotate-180' />}
                    </button>

                    {!isEnrollment && showDropdown && (
                        <ul className="absolute top-full z-10 mt-2 w-full bg-white border border-green-300 rounded-lg shadow-lg">
                            {["BCA", "BCOM", "BBA"].map((prog) => (
                                <li
                                    key={prog}
                                    onClick={() => {
                                        setProgram(prog);
                                        setShowDropdown(false);
                                    }}
                                    className={`px-4 sm:px-4 py-2 text-sm sm:text-lg font-roboto-flex text-center items-start text-gray-900 cursor-pointer hover:bg-green-100 ${program === prog ? "font-semibold text-green-700" : ""
                                        }`}
                                >
                                    {prog}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                

                <div className=' flex gap-2 w-full sm:w-[60%] '>           
                <div className=" flex-grow flex items-center  gap-2 border-2 border-green-600 rounded-lg px-2 sm:px-4 py-1 bg-green-50  focus-within:ring-2 focus-within:ring-green-400">
                    <label htmlFor="searchbar">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-green-700 cursor-pointer" />
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        id='searchbar'
                        ref={inputRef}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter enrollment number or name..."
                        className="w-full text-gray-900 text-sm  sm:text-lg placeholder-gray-500 focus:outline-none"
                    />
                </div>

                <button
                    onClick={handleSearch}
                    className="px-2 sm:px-5 sm:py-2 bg-green-700 hover:bg-green-800 text-white text-xs sm:text-lg font-semibold rounded-lg transition cursor-pointer"
                >
                    Search
                </button>
                </div>
            </form>

            {loading && (
                <p className="loader"></p>
            )}

            {/* Error Handling */}
            {isErrorResponse(enrollmentData) && (
                <div className="bg-yellow-100 text-red-800 px-2 sm:px-4 py-2 rounded mt-4 max-w-3xl">
                    <p>{enrollmentData.message || "No student found with this enrollment number."}</p>
                </div>
            )}

            {isErrorResponse(nameData) && (
                <div className="bg-yellow-100 text-red-800 px-4 py-2 rounded mt-4 max-w-3xl">
                    <p>{nameData.message || "No students found with this name."}</p>
                </div>
            )}


            {(isSuccessResponse(enrollmentData) || isSuccessResponse(nameData)) && (
                <div className="w-full max-w-3xl  border border-green-300 shadow-2xl rounded-2xl p-3 sm:p-6 mt-4">
                    <h2 className="text-2xl font-semibold font-gabarito text-green-700 mb-4 text-center">Search Results</h2>


                    {isSuccessResponse<StudentByEnrollmentResponse>(enrollmentData) && enrollmentData.data && (
                        <StudentCard student={enrollmentData.data} />
                    )}
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

