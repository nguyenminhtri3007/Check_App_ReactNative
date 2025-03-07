import { AppConfig } from "../../common/config/app.config"
import { ServiceCore } from "../../common/service/service.core"
import { ReportModel } from "../model/report.model"

export class ReportService {
    private serviceCore: ServiceCore = new ServiceCore();
    private appConfig: AppConfig = new AppConfig();

    async sendReport(report: ReportModel) {
        try {
            const token = await this.appConfig.getAccessToken();
            if (!token) {
                throw new Error("Người dùng chưa đăng nhập. Không có token.");
            }

            console.log("Token sử dụng:", token);
            console.log("Dữ liệu gửi lên server:", JSON.stringify(report, null, 2));

            const domain = await this.appConfig.getDomain();
            const response = await this.serviceCore.POST(
                `${domain}`,
                `send-request`,
                report,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            console.log("Dữ liệu được trả về:", JSON.stringify(response, null, 2));

        } catch (error) {
            console.error("Lỗi khi gửi báo cáo:", error);
            throw (error);
        }
    }
}

