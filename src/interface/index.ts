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
  statusCode: number;
  message: string;
  data: Student;
  success: boolean;
}

// getProgrammeResult response
export interface Programme{
    statusCode: number;
    message: string;
    data: [Student];
    success: boolean;
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
  statusCode: number;
  message: string;
  data: StudentList[] | [];
  success: boolean;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data?: any;
}
