import type { Report } from '@/interfaces';
import api from '@/main';
import { defineStore } from 'pinia';

export const useReportStore = defineStore('report', {
    state: () => ({
        report: {} as Report,
        reports: [] as Report[]
    }),
    getters: {
        reverse: function (state) {
            return [...state.reports].reverse();
        }
    },
    actions: {
        async createReport(universityId: string) {
            await api.post('supervisor/report', { id: universityId });
        },
        async getReports(universityId: string) {
            const response = await api.get('supervisor/report', { params: { id: universityId } });
            this.reports = response.data;
        },
        getReport(id: string) {
            this.report = this.reports.filter(r => r.id === id)[0]
        },
        async deleteReport(id: string) {
            await api.delete(`supervisor/report/${id}`)

            if (this.report.id === id) {
                this.report = {} as Report;
                this.reports = this.reports.filter(r => r.id !== id)
            }
        },
        async clearData() {
            this.report = {} as Report,
                this.reports = [] as Report[]
        }
    }
});