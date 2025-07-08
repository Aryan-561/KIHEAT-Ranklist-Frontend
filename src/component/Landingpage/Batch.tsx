import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services/services";
import type { ProgrammeBatchesResponse } from "../../interface";
import { courses } from "../../constant/constant";

const Batch: React.FC = () => {
    const { course } = useParams();

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

    if (batches.length === 0) {
        return <CenteredMessage text="No batches available for this course." className="text-gray-500" />;
    }

    return (
        <div className="min-h-screen p-8 border border-black/10 rounded-2xl flex flex-col items-center justify-start gap-6 bg-white">
            <h1 className="text-4xl font-bold text-black/90 text-center">
                {courseName}
            </h1>
            <h2 className="text-2xl font-semibold font-serif text-green-700 text-center">
                Select a Batch
            </h2>

            <div className="w-full max-w-5xl flex flex-wrap justify-center gap-4 mt-4  p-2.5">
                {batches.map((year, index) => (
                    <Link
                        to={`${year}`}
                        key={index}
                        className="px-32 py-14 bg-green-100 border border-green-300 rounded-lg text-green-800 font-medium hover:bg-green-200 hover:scale-105 transition-all duration-200 shadow-sm"
                    >
                        {year}
                    </Link>
                ))}
            </div>
        </div>

    );
};

export default Batch;
