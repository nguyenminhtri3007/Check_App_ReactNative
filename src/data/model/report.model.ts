

export class ReportModel {
    type_request: string;
    date_request: string;
    reason_request: string;

    constructor(type_request: string, date_request: string, reason_request: string) {
        this.type_request = type_request;
        this.date_request = this.formatDateWithWeekday(date_request);
        this.reason_request = reason_request;
    }

    private formatDateWithWeekday(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }
}