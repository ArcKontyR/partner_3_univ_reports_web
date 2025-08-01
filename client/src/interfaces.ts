export interface User {
    id: string,
    name: string,
    surname: string,
    patronymic: string,
    email: string;
}

export interface Student {
    id: string,
    course: number,
    group: string,
    User: User
}

export interface Supervisor {
    id: string
    job_title: string
    login: string
    password: string
    User: User
}

export interface University {
    id: string,
    title: string,
    abbreviation: string,
    address: string,
    contact_number: string,
    sample_path: string,

    Direction?: Direction[]
    Keys?: Key[]
}

export interface Direction {
    id: string,
    code: string,
    title: String
}

export interface Practice {
    id: string,
    type: string,
    Report?: Report,
    Direction?: Direction,
    Student?: Student,
    University?: University,
    Supervisor?: Supervisor,
    Deadlines?: Deadlines,
}

export interface Deadlines {
    id: string,
    start: Date,
    end: Date
}

export interface Report{
    id: string,
    creation_date?: Date,
    University?: University,
    Practices?: Practice[]
}

export interface Key{
    id: string,
    value: string,
    
    University?: University,
}