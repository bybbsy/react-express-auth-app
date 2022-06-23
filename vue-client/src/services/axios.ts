import { clearCookieAndLS } from "@/helpers/auth";
import { IUserData } from "@/store";
import { AxiosClient } from "./index";
import axios, { AxiosRequestConfig } from "axios";

const axiosClient = new AxiosClient('http://localhost:3000/api');

axiosClient.client.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})


axiosClient.client.interceptors.response.use(
    config => config,
    async (error) => {
        const origialRequest = error.config; 
        if(error.response.status == 401 && error.config && !error.config._isRetry) {
            origialRequest._isRetry = true            
            try {
                const res = await axios.post('http://localhost:3000/api/refresh', null, {
                    withCredentials: true
                });
    
                console.log('res', res.data)
                localStorage.setItem('accessToken', res.data.tokens.accessToken)
  
                return axiosClient.client.request(origialRequest)
            } catch (e) {
                console.log("User is unauthorized")
  
                // Remove accessToken and refreshToken to prevent from sending this request when page reloads
                // if refreshToken is expired
                clearCookieAndLS()
            }
        }
        throw error;
    })

export default axiosClient