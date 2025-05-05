export interface User {
    id: number,
    name: string,
    surname: string,
    patronymic: string,
    email: string;
}

export interface Student {
    id: number,
    course: number,
    group: string,
    User: User
}

export interface Supervisor {
    id: number
    job_title: string
    User: User
}

export interface University {
    id: number,
    title: string,
    abbreviation: string,
    address: string,
    contact_number: string,
    sample_path: string,

    Direction: Direction[]
    Report: Report[]
}

export interface Direction {
    id: number,
    code: string,
    title: String
}

export interface Practice {
    id: number,
    type: string,
    Report: Report,
    Direction: Direction,
    Student: Student,
    Supervisor: Supervisor,
    Deadlines: Deadlines[],
}

export interface Deadlines {
    id: number,
    start: Date,
    end: Date
}

export interface Report {
    id: number,
    university_id: number
}