import type { Supervisor } from '@/interfaces';
import api from '@/main';
import { defineStore } from 'pinia';

export const useSupervisorStore = defineStore('supervisor', {
    state: () => ({
        supervisor: {
            job_title: '',
            User: {
                name: '',
                surname: '',
                patronymic: '',
                email: '',
            }
        } as Supervisor,
        supervisors: [] as Supervisor[],
        token: null
    }),
    getters: {},
    actions: {
        async login(login: string, password: string) {
            const response = await api.post('/supervisor/login', { login, password });
            this.token = response.data.token;
        },
        logout() {
            this.token = null;
        },
        async sendInfo() {
            await api.post('supervisor', this.supervisor);
        },
        async getSupervisors() {
            const response = await api.get('supervisor');
            this.supervisors = response.data
        },
    },
});