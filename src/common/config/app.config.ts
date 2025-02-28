import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export class AppConfig {

    private domain: string = "https://tingting-api.finatech.io/v1/api";
    private preImage: string = "https://tingting-api.finatech.io/v1/api";

    constructor() { }

    setDomain(domain: string) {
        this.domain = domain;
    }

    getDomain() {
        return this.domain;
    }

    setPreImage(preImage: string) {
        this.preImage = preImage;
    }

    getPreImage() {
        return this.preImage;
    }

    async setAccessToken(accessToken: string) {
        await AsyncStorage.setItem('access-token', accessToken);
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem('access-token');
        if (!accessToken) {
            return null;
        }
        return accessToken;
    }

    async setRefreshToken(refreshToken: string) {
        await AsyncStorage.setItem('refresh-token', refreshToken);
    }

    async getRefreshToken() {
        const refreshToken = await AsyncStorage.getItem('refresh-token');
        if (!refreshToken) {
            return null;
        }
        return refreshToken;
    }

}