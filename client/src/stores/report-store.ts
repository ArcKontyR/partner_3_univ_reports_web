import type { Report } from '@/interfaces';
import api from '@/main';
import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useReportStore = defineStore('report', {
    state: () => ({
        reports: [] as Report[]
    }),
    getters: {

    },
    actions: {
        async sendInfo(universityId: number) {
            await api.post('supervisor/report', { id: universityId });
        },
        async getReports(universityId: number) {
            const response = await api.get('supervisor/report', { params: { id: universityId } });
            this.reports = response.data;
        },
    },
});