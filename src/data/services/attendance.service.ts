import { AppConfig } from "../../common/config/app.config";
import { ServiceCore } from "../../common/service/service.core";
import { AuthModel } from "../model/auth.model";

export class AttendanceService {
    private serviceCore: ServiceCore = new ServiceCore();
    private appConfig: AppConfig = new AppConfig();

    async checkIn() {
        try {
            const domain = this.appConfig.getDomain();
            const response = await this.serviceCore.POST(
                `${domain}`,
                `do-checkin`,
                {},
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async checkOut() {
        try {
            const domain = this.appConfig.getDomain();
            const response = await this.serviceCore.POST(
                `${domain}`,
                `do-checkout`,
                {},
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}