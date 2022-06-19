const AuthServiceError = require('../models/error')

module.exports = function(err, req, res, next) {
    if(err instanceof AuthServiceError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        })        
    }
    
    return res.status(500).json({
        message: 'Server side errror, try again later',
    })
}