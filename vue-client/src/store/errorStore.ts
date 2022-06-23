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
        }
    }
})
