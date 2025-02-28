import { AppConfig } from "../../common/config/app.config";
import { ServiceCore } from "../../common/service/service.core";
import { AuthModel } from "../model/auth.model";

export class AuthService {
    private serviceCore: ServiceCore = new ServiceCore();
    private appConfig: AppConfig = new AppConfig();

    async signIn(data: AuthModel) {
        try {
            const domain = this.appConfig.getDomain();
            const response = await this.serviceCore.POST(
                `${domain}`,
                `login`,
                data
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

}