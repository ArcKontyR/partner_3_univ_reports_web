import type { Deadlines, Direction, Practice, Report, Student, Supervisor, University, User } from '@/interfaces';
import api from '@/main';
import { defineStore } from 'pinia';

const defaultPractice ={
        id: "",
        type: "",
        Deadlines: {
            id: "",
            start: new Date(),
            end: new Date()
        } as Deadlines,
        Direction: {
            id: "",
            code: "",
            title: ""
        } as Direction,
        Report: {} as Report,
        Student: {
            id: "",
            course: 1,
            group: "",
            User: {
                id: "",
                name: "",
                surname: "",
                patronymic: "",
                email: ""
            } as User
        } as Student,
        Supervisor: {
            id: "",
            job_title: "",
            User: {
                id: "",
                name: "",
                surname: "",
                patronymic: "",
                email: ""
            } as User
        } as Supervisor,
        University: {} as University
    } as Practice
  
export const usePracticeStore = defineStore('practice', {
    state: () => ({
        practice: defaultPractice,
        practices: [] as Practice[]
    }),
    getters: {
    },
    actions: {
        async sendInfo() {
            await api.post('practice', this.practice);
        },
        async getPractices(){
            const response = await api.get('practice');
            this.practices = response.data;
        },
        async getPractice(id: string){
            this.practice = this.practices.filter(u => u.id == id)[0]
        },
        async clearData(){
            this.practice = defaultPractice;
        }
    },
});