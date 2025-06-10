import mammoth from "mammoth";
import { Key, Practice, Report } from "../interfaces";
import { readFileSync } from "node:fs";

export default class ReportService {
    public static buildPrismaSelect(fields: Key[]): Record<string, any> {
        const result: Record<string, any> = {};

        fields.forEach(field => {
            const parts = field.value.split('.');
            let currentLevel = result;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                const isLast = i === parts.length - 1;

                if (part.endsWith('s') && !currentLevel[part]) {
                    currentLevel[part] = { select: {} };
                    currentLevel = currentLevel[part].select;
                    continue;
                }

                if (!currentLevel[part]) {
                    currentLevel[part] = isLast ? true : { select: {} };
                }

                if (!isLast) {
                    currentLevel = currentLevel[part] === true
                        ? (currentLevel[part] = { select: {} }).select
                        : currentLevel[part].select;
                }
            }
        });

        return result;
    }

    private static createHTMLTable(data: any[], selectedFields: Key[]) {
        const headers = selectedFields.map(field => {
            return `<th>${ReportService.getFieldLabel(field.value)}</th>`;
        }).join('');
        if (!data){
            data = []
        }
        const rows = data.map(row => {
            const cells = selectedFields.map(field => {
                let value = row[field.value] || '';

                if (value instanceof Date) {
                    value = value.toLocaleDateString('ru-RU');
                } else if (Array.isArray(value)) {
                    value = value.join(', ');
                } else if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }

                return `<td>${value}</td>`;
            }).join('');

            return `<tr>${cells}</tr>`;
        }).join('');

        return `
            <table>
                <tr>${headers}</tr>
                ${rows}
            </table>
        `;
    }

    public static async generateHtml(
        reports: Report,
        selectedFields: Key[],
        samplePath: string
    ) {
        const templateBuffer = readFileSync(samplePath);


        const tableData = ReportService.formatReportData(reports, selectedFields);
        const htmlTable = ReportService.createHTMLTable(tableData, selectedFields);

        const result = await mammoth.convertToHtml({ buffer: templateBuffer });
        const modifiedHtml = result.value.replace('#table#', htmlTable);
        return modifiedHtml
    }

    private static getFieldLabel(fieldPath: string): string {
        const fieldMap: Record<string, string> = {
            'Practices.type': 'Тип практики',
            'Practices.Deadlines.start': 'Начало практики',
            'Practices.Deadlines.end': 'Окончание практики',
            'Practices.Direction.code': 'Код направления',
            'Practices.Direction.title': 'Название направления',
            'Practices.Student.course': 'Курс',
            'Practices.Student.group': 'Группа',
            'Practices.Student.User.name': 'Имя студента',
            'Practices.Student.User.surname': 'Фамилия студента',
            'Practices.Student.User.patronymic': 'Отчество студента',
            'Practices.Supervisor.job_title': 'Должность руководителя',
            'Practices.Supervisor.User.name': 'Имя руководителя',
            'Practices.Supervisor.User.surname': 'Фамилия руководителя',
            'Practices.Supervisor.User.patronymic': 'Отчество руководителя'
        };

        return fieldMap[fieldPath] || fieldPath.split('.').pop() || fieldPath;
    }
    private static formatReportData(report: Report, selectedFields: Key[]): Record<string, any>[] {
        const formattedData: Record<string, any>[] = [];
        if (!report.Practices || report.Practices.length === 0) {
            const row: Record<string, any> = {};
            selectedFields.forEach(field => {
                row[field.value] = ReportService.getNestedValue(report, field.value);
            });
            formattedData.push(row);
            return;
        }

        report.Practices.forEach((practice: Practice) => {
            const row: Record<string, any> = {};

            selectedFields.forEach(field => {
                let source: any = report;
                let fieldPath = field.value;

                if (field.value.startsWith('Practices.')) {
                    source = practice;
                    fieldPath = field.value.replace('Practices.', '');
                }

                row[field.value] = ReportService.getNestedValue(source, fieldPath);
            });

            formattedData.push(row);
        });


        return formattedData;
    }

    private static getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((acc, key) => {
            if (acc === null || acc === undefined) return '';

            if (Array.isArray(acc)) {
                if (acc.length === 0) return '';
                return ReportService.getNestedValue(acc[0], key);
            }
            return acc[key] ?? '';
        }, obj);
    }
}