export const clearCookieAndLS = () => {
    localStorage.removeItem('accessToken')
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export const getAuthorizationString = (): string => {
    return `Bearer ${localStorage.getItem('accessToken')}`
}

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i

export const checkValidEmail = (email: string) => emailRegex.test(email)

export const checkValidPassword = (pwd: string) => pwd.trim().length > 7