import { HttpCodes } from "../utils/http-code";

export class ErrorModel {
    code: number;
    message: string;
    body: any;

    constructor(code?: number, message?: string, body?: any) {
        this.code = code ?? HttpCodes.UNKNOWN;
        this.message = message ?? 'UNKNOWN';
        this.body = body;
    }
}