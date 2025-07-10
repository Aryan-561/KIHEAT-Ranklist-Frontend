import type { SemestersCount, Course, Year } from "./../interface/index";

export const courses: Course[] = [
    { BCA: "Bachelor of Computer Applications" },
    { BCom: "Bachelor of Commerce (Honours)" },
    { BBA: "Bachelor of Business Administration" },
];

export const semesters: SemestersCount[] = [
    { semester: "1st Semester" },
    { semester: "2nd Semester" },
    { semester: "3rd Semester" },
    { semester: "4th Semester" },
    { semester: "5th Semester" },
    { semester: "6th Semester" },
]

export const years: Year[] = [
    { year: "2024" },
    { year: "2023" },
    { year: "2022" },
    { year: "2021" },
]


export const programmeCodes : Course = {
    "020": "BCA",
    "888": "B.Com (H)",
    "017": "BBA",
}

