import type { Student } from '@/interfaces';
import api from '@/main';
import { defineStore } from 'pinia';

export const useStudentStore = defineStore('student', {
    state: () => ({
        student: {
            course: 1,
            group: '',
            User: {
                name: '',
                surname: '',
                patronymic: '',
                email: '',
            }
        } as Student,
    }),
    getters: {
        
    },
    actions: {
        async sendInfo() {
            await api.post('student/new', this.student);
        }
    },
});