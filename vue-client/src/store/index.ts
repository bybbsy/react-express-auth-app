import { logout, login, signup, refresh } from "@/services/authService";
import axios from "axios";
import { defineStore } from "pinia";

export interface IUser {
  email: string,
  password: string
}

export interface ITokens {
  accessToken: string,
  refreshToken: string
}

export interface IUserData {
  user: IUser,
  tokens: ITokens
}

export type INullableUser = IUser | null

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null as INullableUser,
    isAuth: false
  }),
  actions: {
    async login(email: string, password: string) {
      const inputData = {
        email,
        password
      }

      const { user, tokens }  = await login(inputData)
      localStorage.setItem('accessToken', tokens.accessToken)

      this.isAuth = true  
      this.user = user
    },
    async logout() {
      await logout()
      localStorage.removeItem('accessToken')
      this.user = null
      this.isAuth = false
    },
    async checkAuth() {
      try { 
        const { user, tokens } : IUserData = await refresh()
        localStorage.setItem('accessToken', tokens.accessToken)
        
        this.user = user
        this.isAuth = true
      } catch (e) {
        console.log('Unauth error', e)
      }
    },
    async signup(email: string, password: string) {
      const inputData = {
        email,
        password
      }

      const { user, tokens } = await signup(inputData)
      localStorage.setItem('accessToken', tokens.accessToken)

      this.user = user;
      this.isAuth = true
    },
    getters: {
      auth(): boolean {
        return this.isAuth;
      }
    }
  }
})
