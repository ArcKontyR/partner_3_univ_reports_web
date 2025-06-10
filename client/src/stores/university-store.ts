import type { Direction, University, Report, Key } from '@/interfaces';
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
    Report: [] as Report[],
    Keys: [] as Key[]
} as University

export const useUniversityStore = defineStore('university', {
    state: () => ({
        university: defaultUniversity,
        universities: [] as University[],
        initialUniversity: defaultUniversity,
        templateExists: false
    }),
    getters: {
        hasChanges: function (state) {
            return JSON.stringify(state.university) !== JSON.stringify(state.initialUniversity);
        }
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
            if (this.universities.length == 0) {
                this.getUniversities()
            }
            this.university = this.universities.filter(u => u.id === id)[0]
            this.initialUniversity = { ...this.university }
            const response = await api.get(`supervisor/${this.university.id}`);
            this.templateExists = Boolean(response.data);
        },
        clearData() {
            this.university = defaultUniversity;
            this.universities = [] as University[];
            this.templateExists = false
        },
        async updateInfo() {
            await api.patch('supervisor/university', this.university);
            const response = await api.get(`supervisor/${this.university.id}`);
            this.templateExists = Boolean(response.data);
            this.initialUniversity = { ...this.university }
        }
    }

});