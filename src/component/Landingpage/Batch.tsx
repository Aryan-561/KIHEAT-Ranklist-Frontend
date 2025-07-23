import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services/services";
import type { ProgrammeBatchesResponse } from "../../interface";
import { courses } from "../../constant/constant";
import {SelectBatch} from "../Select/Select";
import ClassResultList from "../Resultlist/ClassResultList";
const Batch: React.FC = () => {
    const { course, batch } = useParams();

    const findCourseName = (course: string) => {

        const el = courses.find((c) => Object.keys(c)[0].toLowerCase() === course.toLowerCase())
        console.log("el", el);
        return el ? Object.values(el) : "NO course found with this Name"

    }
    const courseName = findCourseName(course!);
    const { data, error, isLoading } = useQuery<ProgrammeBatchesResponse>({
        queryKey: ['years', course],
        queryFn: () => services.getProgrammeBatches(course || ''),
        enabled: !!course,
    });

    const CenteredMessage = ({ text, className }: { text: string, className?: string }) => (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
            <div className="loader" />
            <div className={`text-3xl font-semibold text-center ${className}`}>{text}</div>
        </div>
    );

    if (isLoading) {
        return <CenteredMessage text="Loading batches..." className="text-gray-600 animate-pulse" />;
    }

    if (error) {
        return <CenteredMessage text="Failed to load batches. Please try again later." className="text-red-600" />;
    }

    const batches = data?.data || [];

    const bacthOption = batches?.map((batch:string)=>{
       return {value:batch,
        label:batch}
    })

    if (batches.length === 0) {
        return <CenteredMessage text="No batches available for this course." className="text-gray-500" />;
    }

    return (<div className={`min-h-screen`}>
        <div className={`p-6 sm:p-8 border-2 m-4 my-8 bg-emerald-200 border-black rounded-2xl flex flex-col items-center justify-start gap-5 `}>
            <h1 className="text-lg sm:text-4xl font-bold text-black/90 text-center font-rubik">
                {courseName}
            </h1>

            <div className="flex flex-col items-center gap-2">
                <h2 className=" sm:text-2xl font-semibold font-serif text-green-700 text-center font-lexend">
                    Batch
                </h2>

                <SelectBatch options={bacthOption} />
            </div>

        </div>
        {
            batch && <ClassResultList/>
        }
        

    </div>);
};

export default Batch;
