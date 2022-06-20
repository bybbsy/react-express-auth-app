module.exports = class AuthServiceError {
    constructor(status, message, errors) {
        this.status = status;
        this.message = message
        this.errors = errors
    }

    static Unauthorized() {
        return new AuthServiceError(401, 'User is not authorized')
    }

    static InvalidRequest(message) {
        return new AuthServiceError(422, message)
    }

    static BadRequest(message, errors) {
        return new AuthServiceError(400, message, errors)
    }
}