import axios from "axios";
import { ErrorModel } from "../model/error.model";
import { AppConfig } from "../config/app.config";

export class ServiceCore {

    private appConfig = new AppConfig();

    async GET(domain: string, url: string, config?: any): Promise<any> {
        try {
            const accessToken = await this.appConfig.getAccessToken();
            const configDefault = {
                headers: {
                    Authorization: `Beare ${accessToken}`
                }
            }
            const response = await axios.get(
                `${domain}/${url}`,
                config ?? configDefault
            );
            return response.data;
        } catch (error: any) {
            throw new ErrorModel(
                error?.status,
                error?.message,
                error?.body
            )
        }
    }

    async POST(domain: string, url: string, data: any, config?: any): Promise<any> {
        try {
            const accessToken = await this.appConfig.getAccessToken();
            const configDefault = {
                headers: {
                    Authorization: `Beare ${accessToken}`
                }
            }
            const response = await axios.post(
                `${domain}/${url}`,
                data,
                config ?? configDefault
            );
            return response.data;
        } catch (error: any) {
            throw new ErrorModel(
                error?.status,
                error?.message,
                error?.body
            )
        }
    }

    async PUT(domain: string, url: string, data: any, config?: any): Promise<any> {
        try {
            const accessToken = await this.appConfig.getAccessToken();
            const configDefault = {
                headers: {
                    Authorization: `Beare ${accessToken}`
                }
            }
            const response = await axios.put(
                `${domain}/${url}`,
                data,
                config ?? configDefault
            );
            return response.data;
        } catch (error: any) {
            throw new ErrorModel(
                error?.status,
                error?.message,
                error?.body
            )
        }
    }

    async PATCH(domain: string, url: string, data: any, config?: any): Promise<any> {
        try {
            const accessToken = await this.appConfig.getAccessToken();
            const configDefault = {
                headers: {
                    Authorization: `Beare ${accessToken}`
                }
            }
            const response = await axios.patch(
                `${domain}/${url}`,
                data,
                config ?? configDefault
            );
            return response.data;
        } catch (error: any) {
            throw new ErrorModel(
                error?.status,
                error?.message,
                error?.body
            )
        }
    }

    async DELETE(domain: string, url: string, config?: any): Promise<any> {
        try {
            const accessToken = await this.appConfig.getAccessToken();
            const configDefault = {
                headers: {
                    Authorization: `Beare ${accessToken}`
                }
            }
            const response = await axios.delete(
                `${domain}/${url}`,
                config ?? configDefault
            );
            return response.data;
        } catch (error: any) {
            throw new ErrorModel(
                error?.status,
                error?.message,
                error?.body
            )
        }
    }
}