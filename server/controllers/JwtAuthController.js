const AuthServiceError = require('../models/error')
const UserModel = require('../models/user')
const TokenModel = require('../models/token')
const { createTokens, saveRefreshToken, validateRefreshToken, validateAccessToken } = require('../service/token-service')

class JwtAuthController {
    constructor() {}

    async singUp(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
        
            const candidate = await UserModel.findOne({email})
            
            if(!email) {
                throw AuthServiceError.InvalidRequest('Email was not provided')
            }
    
            if(!password) {
                throw AuthServiceError.InvalidRequest('Password was not provided')
            }
    
            if(candidate) {
                throw AuthServiceError.InvalidRequest('User already exists!')
            }
        
            const user = await UserModel.create({ email, password })
        
            const tokens = createTokens(user.toJSON())
    
            const tokenData = await TokenModel.findOne({ user: user._id })
            
            await saveRefreshToken(tokenData, user, tokens.refreshToken);
        
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });
        
            res.send({ user, tokens })
    
        } catch (e) {
            return res.status(e.status).json({msg: e.message});   
        }
    }

    async signIn (req, res) {
        try {
            const { email, password } = req.body;
    
            console.log(req.body)
            if(!email) {
                throw AuthServiceError.InvalidRequest('Email was not provided')
            }
    
            if(!password) {
                throw AuthServiceError.InvalidRequest('Password was not provided')
            }
    
            const user = await UserModel.findOne({email});
            if(!user) {
                throw AuthServiceError.Unauthorized();
            }
    
            const tokens = createTokens(user.toJSON())
    
            const tokenData = await TokenModel.findOne({ user: user._id })
    
            await saveRefreshToken(tokenData, user, tokens.refreshToken)
    
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000})
            
            res.send({user, tokens})
    
        } catch (e) {
            return res.status(e.status).json({msg: e.message});   
        }
    }

    async signOut (req, res) {
        try { 
            const { refreshToken } = req.cookies
     
            const tokenData = await TokenModel.deleteOne({ refreshToken })
            
            console.log(tokenData)
            res.clearCookie('refreshToken');
            console.log(req.cookies)
            res.send({
                msg: 'logged out',
                token: tokenData
            })
        } catch (e) {
            return res.status(e.status).json({msg: e.message});  
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
     
            const userData = validateRefreshToken(refreshToken)
            
            const tokenInDB = await TokenModel.findOne({ refreshToken })
             
            console.log(!userData || !tokenInDB)
    
            if(!userData || !tokenInDB) {
                throw AuthServiceError.Unauthorized()
            }
    
            const user = await UserModel.findById(userData._id)
    
            const tokens = createTokens(user.toJSON())
        
            const tokenData = await TokenModel.findOne({ user: user._id })
    
            await saveRefreshToken(tokenData, user, tokens.refreshToken)
        
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000})
    
            res.send({user, tokens})
        } catch (e) {
            return res.status(e.status).json({msg: e.message});   
        }
    }
}


module.exports = new JwtAuthController()