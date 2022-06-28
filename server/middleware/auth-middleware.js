const AuthServiceError = require('../models/error')
const TokenService = require('../service/token-service')

module.exports = function(req, res, next) {
    try {
         
        const accessToken = req.headers['authorization'].split(' ')[1]
        if(!accessToken) {
            return next(AuthServiceError.Unauthorized())
        }

        const accessTokenIsValid = TokenService.validateAccessToken(accessToken)
         
        if(!accessTokenIsValid) {
            return next(AuthServiceError.Unauthorized())
        } 

        req.user = accessTokenIsValid
        next()
    } catch(e) {
        next(e)
    }
}