import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { StudentByEnrollmentResponse } from "../../interface";
import { services } from "../../services/services";
import Header from "./Header";

export default function DashBoard() {
    const { enroll } = useParams();

    const {
        data: enrollmentData,
        isLoading,
        isError,
    } = useQuery<StudentByEnrollmentResponse>({
        queryKey: ['search-enrollment', enroll],
        queryFn: () => services.getStudentByEnrollment(String(enroll)),
        enabled: !!enroll,
    });

    if (isLoading) return <p>Loading student data...</p>;
    if (isError || !enrollmentData?.data) return <p>Error loading student data or student not found.</p>;

    const student = enrollmentData.data;

    const transformedSemesters = student.semesters.map((sem) => {
        let internalMarks = 0;
        let externalMarks = 0;

        sem.subjects.forEach((subject) => {
            internalMarks += subject.internal || 0;
            externalMarks += subject.external || 0;
        });

        const totalMarks = internalMarks + externalMarks;
        const maxMarks = sem.subjects.length * 100;
        const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;

        return {
            sem: parseInt(sem.semester, 10),
            sgpa: sem.gpa ?? 0,
            percentage,
            internalMarks,
            externalMarks,
            subjects: sem.subjects || [],
        };
    });

    return (
        <div className="w-full min-h-screen">
            <Header student={student} />
        </div>
    );
}
