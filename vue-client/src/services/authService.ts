import { IUser, IUserData } from "@/store";
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
  return authServiceClient.emptyPost('http://localhost:3000/api/refresh', null, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
}
