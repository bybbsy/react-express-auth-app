import { IUser, IUserData } from "@/store/authStore";
import axios from "axios";
import { AxiosClient } from ".";

const authServiceClient = new AxiosClient('http://localhost:3000/api/auth/oauth2/')

export interface IAuthData {
    auth: {
        url: string
    }
}

export const login = (): Promise<IAuthData> => {
    return authServiceClient.get('/sign-in');
}