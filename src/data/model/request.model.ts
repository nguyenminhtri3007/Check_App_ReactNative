
export class RequestModel {
    id?: string;
    type_request?: string;
    date_request?: string;
    reason_request?: string;

    constructor(
        id?: string,
        type_request?: string,
        date_request?: string,
        reason_request?: string
    ) {
        this.id = id ?? '';
        this.type_request = type_request ?? '';
        this.date_request = date_request ? this.formatDateWithWeekday(date_request) : '';
        this.reason_request = reason_request ?? '';
    }
    /** Hàm chuyển đổi ngày ISO thành "Thứ Tư, 02/07/2025" */
    private formatDateWithWeekday(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }
    convertObj(obj: any) {
        const model = new RequestModel()
        model.id = obj?.id ?? '';
        model.type_request = obj?.type ?? '';
        model.date_request = obj?.date ? this.formatDateWithWeekday(obj.date) : '';
        model.reason_request = obj?.reason ?? '';

        return model;
    }
}