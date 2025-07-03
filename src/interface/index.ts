export interface Student {
  enrollment: string;
  name: string;
  sid: string;
  schemeID: string;
  instCode: string;
  batch: string;
  prgCode: string;
  programme: string;
  totalMarks: number;
  maxMarks: number;
  totalCreditMarks: number;
  maxCreditMarks: number;
  totalCredits: number;
  maxCredits: number;
  semestersCount: number;
  gpa: number;
  semesters: Semester[];
}

interface Semester {
  semester: string;
  subjectsCount: number;
  totalMarks: number;
  maxMarks: number;
  totalCreditMarks: number;
  maxCreditMarks: number;
  totalCredits: number;
  maxCredits: number;
  gpa: number;
  subjects: Subject[];
}

interface Subject{
    paperId: string;
    paperName: string;
    paperCode: string;
    credits: number;
    type: string;
    internal: number;
    external: number;
    total: number;
    reapper: boolean;
    backlog: boolean;
    grade: string;
}

//getStudentByEnrollment response
export interface StudentByEnrollmentResponse {
  status: string;
  message: string;
  data: Student;
}

// getProgrammeResult response
export interface Programme{
    status: string;
    message: string;
    data: [Student]
}


export interface StudentList{
  enrollment: string;
  name: string;
  sid: string;
  schemeID: string;
  instCode: string;
  batch: string;
  prgCode: string;
  programme: string;
}

// getStudentByName response
export interface StudentByNameResponse {
  status: string;
  message: string;
  data: StudentList[] | [];
}

export interface ErrorResponse {
  status: string;
  message: string;
}
