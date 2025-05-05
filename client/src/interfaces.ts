import type { RequestStatuses } from "./enums";

export interface PracticeForm {
    Student: Student;
    practiceType: string;
    practiceStartDate: string;
    practiceEndDate: string;
    studyDirection: string;
    supervisor: string;
    institution: string;
    
  }

  export interface Student{
    course: number,
    group: string,
    User: User
}

export interface User{
    name: string,
    surname: string,
    patronymic: string,
    email: string;
}

