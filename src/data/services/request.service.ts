import { AppConfig } from "../../common/config/app.config";
import { ServiceCore } from "../../common/service/service.core";
import { RequestModel } from "../model/request.model";


export class RequestService {
    private serviceCore: ServiceCore = new ServiceCore();
    private appConfig: AppConfig = new AppConfig();

    async getRequests(): Promise<RequestModel[]> {
        try {
            const domain = this.appConfig.getDomain();
            const resultAPI = await this.serviceCore.GET(
                `${domain}`,
                `get-requests`
            );
            const response: RequestModel[] = resultAPI?.data?.map(
                (record: any) => new RequestModel().convertObj(record)
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

}