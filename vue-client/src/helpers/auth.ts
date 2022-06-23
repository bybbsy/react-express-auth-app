export const clearCookieAndLS = () => {
    localStorage.removeItem('accessToken')
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export const getAuthorizationString = (): string => {
    return `Bearer ${localStorage.getItem('accessToken')}`
}