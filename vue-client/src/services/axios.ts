import { IUser, IUserData } from "@/store";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class AxiosClient {
    client: AxiosInstance

    constructor(baseURL: string) {
        this.client = axios.create({
            withCredentials: true,
            baseURL
        })
    }

    async get<T>(url: string, params?: AxiosRequestConfig): Promise<T> {
        const res = await this.client.get(url, params);
        return res.data;
    }

    async post<T>(url: string, data: IUser, params?: AxiosRequestConfig): Promise<T> {
        const res = await this.client.post(url, data, params);
        return res.data;
    }
    
    async emptyPost<T>(url: string, data: null, params?: AxiosRequestConfig): Promise<T> {
        const res = await this.client.post(url, data, params);
        return res.data;
    }
}