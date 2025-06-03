import type { Direction, University, Report } from '@/interfaces';
import api from '@/main';
import { defineStore } from 'pinia';

const defaultUniversity = {
    id: "",
    abbreviation: '',
    title: '',
    address: '',
    contact_number: '',
    sample_path: '/',
    Direction: [] as Direction[],
    Report: [] as Report[]
} as University

export const useUniversityStore = defineStore('university', {
    state: () => ({
        university: defaultUniversity,
        universities: [] as University[]
    }),
    getters: {
    },
    actions: {
        async sendInfo() {
            await api.post('supervisor/university', this.university);
        },
        async getUniversities() {
            const response = await api.get('supervisor/university');
            this.universities = response.data;
        },
        async getUniversity(id: string) {
            if (this.universities.length == 0){
                this.getUniversities()
            }
            this.university = this.universities.filter(u => u.id === id)[0]
        },
        async clearData() {
            this.university = defaultUniversity;
            this.universities = [] as University[]
        }
    }
    
});