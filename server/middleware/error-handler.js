const AuthServiceError = require('../models/error')

module.exports = function(err, req, res) {
    if(err instanceof AuthServiceError) {
        return res.status(err.status).json({
            message: err.message
        })        
    }
    
    return res.status(500).json({
        message: 'Server side error, try again later',
    })
}