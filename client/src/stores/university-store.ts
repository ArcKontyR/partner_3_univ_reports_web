import type { University } from '@/interfaces';
import api from '@/main';
import { defineStore } from 'pinia';

export const useUniversityStore = defineStore('university', {
    state: () => ({
        university: {
            id: -1,
            abbreviation: '',
            title: '',
            address: '',
            contact_number: '',
            sample_path: '/',
            Direction: [],
            Report: []

        } as University,
        universities: [] as University[]
    }),
    getters: {
        
    },
    actions: {
        async sendInfo() {
            await api.post('supervisor/university', this.university);
        },
        async getUniversities(){
            const response = await api.get('supervisor/university');
            this.universities = response.data;
        }
    },
});