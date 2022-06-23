import { defineStore } from "pinia";

export interface IError {
    status?: number,
    message: string,
    id: Date
}

export const useErrorStore = defineStore('error-store', {
    state: () => ({
        errors: [] as IError[]
    }),
    actions: {
        addError(error: IError) {
            this.errors.push(error)
        },
        clearErrors() {
            this.errors = []
        },
        messageInArray(message: string): boolean {
            return this.errors.some((val: IError) => val.message.trim() === message.trim());
        },
        deleteMessage(message: string) {
           this.errors = this.errors.filter(val => val.message.trim() !== message.trim())
        }
    }
})
