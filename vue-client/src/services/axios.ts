import { IUser, IUserData } from "@/store";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class AxiosClient {
    client: AxiosInstance

    constructor(baseURL: string) {
        this.client = axios.create({
            withCredentials: true,
            baseURL
        })

        this.client.interceptors.response.use(
            config => config,
            async (error) => {
                const origialRequest = error.config;

                if(error.response.status == 403 && !error.config._isRetry) {
                    origialRequest._isRetry = true
                    try {
                        const res = await axios.post('http://localhost:3000/api/refresh', null, {
                            withCredentials: true,
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                                }
                            });
            
                            
                        const { user, tokens } : IUserData = res.data;
        
                        localStorage.setItem('accessToken', tokens.accessToken)
        
                        return this.client.request(origialRequest)
                    } catch (e) {
                        console.log("User is unauthorized")

                        // Remove accessToken and refreshToken to prevent from reloading page
                        // if refreshToken is expired
                        localStorage.removeItem('accessToken')
                        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                    }
                }
                throw error;
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