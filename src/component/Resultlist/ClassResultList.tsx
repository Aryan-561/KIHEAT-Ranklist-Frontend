import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { useParams } from "react-router-dom";
import type { Programme, Semester, Student } from "../../interface";
import { services } from "../../services/services";
import { useState } from "react";
import StateMessage from "../StateMessage/StateMessage";


import StudentMarksheet from "./StudentMarksheet";

const ClassResultList:React.FC = () => {

    const [sem, setSem] = useState<string>("overall");
    const [marksheet, setMarksheet] = useState<any>()
    const {course, batch} =  useParams<{course?:string, batch?:string}>();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const  open = ():void=> setIsOpen(true)
    const  close = ():void=> setIsOpen(false)

   
    

    const {data, isLoading, error} = useQuery<Programme>({
        queryKey: ['classResultList', course, batch],
        queryFn: () => services.getProgrammeResult(course || '', batch || ''),
        enabled: !!course && !!batch,
    })

    if(isLoading) {
        return <StateMessage text="Loading Result..." className="text-gray-600 animate-pulse" />;
    }

    if(error) {
        return <StateMessage text={`${error.message}`} className="text-red-600" />;
    }

   

    const semesterData  = data?.data.filter((student: Student)=>{
         if(sem == "overall") return true;
         return student.semesters.some((semester: Semester) => sem == semester.sem);
    }).map((student: Student) => {
        if (sem === "overall") {
            return student
        }

        const semester = student.semesters.find((semesters:Semester) => String(semesters.sem) === sem);

        return{
            name: student.name,
            enrollment: student.enrollment,
            sid: student.sid,
            schemeID: student.schemeID, 
            instCode: student.instCode,
            batch: student.batch,
            totalMarks: semester?.totalMarks || 0,
            maxMarks: semester?.maxMarks || 0,
            totalCreditMarks: semester?.totalCreditMarks || 0,
            maxCreditMarks: semester?.maxCreditMarks || 0,
            totalCredits: semester?.totalCredits || 0,
            maxCredits: semester?.maxCredits || 0,
            percentage: semester?.percentage ||0,
            gpa: semester?.sgpa || 0,
            semester:semester
        }

    })
    
    

  
    const sortData = semesterData?.sort((a: any, b: any) => {
        return b?.cgpa - a?.cgpa || b?.gpa - a?.gpa; 
    })
    

    let currentRank = 1;
    let prevGpa: number | null = null;
    let rankCounter = 1;

    const rankedData = sortData?.map((student: any) => {
        const gpa = student.cgpa || student.gpa;

        if (prevGpa !== null && gpa !== prevGpa) {
            currentRank = rankCounter;
        }

        prevGpa = gpa;
        rankCounter++;

        return {
            ...student,
            rank: currentRank,
        };
    });
    
    return (<div className="relative">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8 min-h-screen">
            <div>
                <h1 className="font-rubik  text-2xl sm:text-4xl lg:text-5xl font-bold text-green-800 m-2 text-center">
                    {course?.toUpperCase()} - {batch?.toUpperCase()} Result List
                </h1>
            </div>

            <div>
                <div className="flex flex-col justify-center items-center gap-4 mb-2">
                    <label htmlFor="semester" className="sm:text-lg font-medium text-gray-700">Select Semester:</label>
                    <div className="font-lexend flex flex-wrap gap-2 justify-center text-xs sm:text-base">

                    <button  onClick={() => setSem("overall")} value={"overall"} className={`px-2  sm:px-4 py-2 rounded-md cursor-pointer ${sem === "overall" ? 'bg-green-800 text-white' : 'bg-green-200 border text-black  hover:bg-green-300 border-gray-500'}`}>overall</button>
                    {data?.data[0].semesters.map((semster:Semester)=>(
                        <button 
                        key={semster.sem} 
                        value={semster.sem} 
                        onClick={() => setSem(String(semster.sem))}
                        className={`px-4  py-2 rounded-md cursor-pointer  ${sem == semster.sem ? 'bg-green-800 border-white text-white' : 'bg-green-200 border text-black hover:bg-green-300  border-gray-500'}`}
                        >
                            Sem {semster.sem}
                        </button>
                    ))}
                    </div>
                   
                </div>
            </div>
            
            <div className=" w-full sm:w-9/12  mx-auto">
                <div className="bg-emerald-400 rounded-lg overflow-hidden py-2 border-2 border-emerald-800">
                    {/* Table Header */}
                    <div className="font-rubik text-[10px] sm:text-base grid grid-cols-10 place-items-center gap-2 p-2 sm:p-3 m-2 rounded-md sm:rounded-xl bg-emerald-800 text-white  font-medium">
                        <div className="col-span-2">Enrollment</div>
                        <div className="col-span-4">Name</div>
                        <div className="col-span-2">Marks</div>
                        <div className="col-span-1">GPA</div>
                        <div className="col-span-1">Rank</div>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y-2 bg-none divide-gray-600 flex flex-col gap-1 p-2 px-3">

                       {rankedData?.map((student:any)=>{ 
                       
                        return(<div
                            key={student.enrollment}
                            className="font-lexend cursor-pointer bg-emerald-100 rounded-lg sm:rounded-xl  grid grid-cols-10 place-items-center gap-4 p-2 px-3  text-green-800 hover:bg-green-200 hover:scale-102 text-[8px] sm:text-sm font-medium"
                            onClick={()=>{setMarksheet(student); open(); }}
                        >
                            <div className="font-mono font-semibold col-span-2 ">{student.enrollment}</div>
                            <div className=" col-span-4 ">{student.name}</div>
                            <div className="col-span-2 ">{`${student.totalMarks} / ${student.maxMarks}`}</div>
                            <div className="col-span-1 ">{student?.gpa?.toFixed(3) || student.cgpa?.toFixed(3)}</div>
                            <div className="col-span-1 ">{student.rank}</div>
                        </div>)})}
                        {/* Add more rows as needed */}
                    </div>
                </div>
            </div>
            
        </div>
        <StudentMarksheet isOpen={isOpen} onClose={close} marksheet={marksheet} sem={sem} />  
    </div>)
}
export default ClassResultList;