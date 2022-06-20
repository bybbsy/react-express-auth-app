import { IUser, IUserData } from "@/store";
import axios from "axios";
import { AxiosClient } from "./axios";

const authServiceClient = new AxiosClient('http://localhost:3000/api')

export const login = (user: IUser): Promise<IUserData> => {
  return authServiceClient.post('/sign-in', user, {
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }});
}

export const signup = async (user: IUser): Promise<IUserData> => {
  return authServiceClient.post('/sign-up', user, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }});
}

export const logout = async () => {
  return authServiceClient.emptyPost('/sign-out', null);
}

export const refresh = async():  Promise<IUserData> => {
  return authServiceClient.emptyPost('/refresh', null, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
}

authServiceClient.client.interceptors.response.use(
  config => config,
  async (error) => {
      const origialRequest = error.config;

      if(error.response.status == 401 && !error.config._isRetry) {
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

              return authServiceClient.client.request(origialRequest)
          } catch (e) {
              console.log("User is unauthorized")

              // Remove accessToken and refreshToken to prevent from sending this request when page reloads
              // if refreshToken is expired
              localStorage.removeItem('accessToken')
              document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          }
      }
      throw error;
  })
