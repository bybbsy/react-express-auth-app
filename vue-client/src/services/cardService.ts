import { getAuthorizationString } from "@/helpers/auth";
import { ICard } from "@/store/cardStore";
import axios from './axios';

export const getCards = async (): Promise<ICard[]> => {
    return axios.get('/cards', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getAuthorizationString()
        }
    })
}