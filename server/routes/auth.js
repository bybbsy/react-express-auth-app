const { Router } = require('express')
const UserModel = require('../models/user')
const TokenModel = require('../models/token')
const { createTokens, saveRefreshToken, validateRefreshToken, validateAccessToken } = require('../service/token-service')

const jwt = require('jsonwebtoken')
const AuthServiceError = require('../models/error')

const router = Router()

router.post('/sign-up', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
    
        const candidate = await UserModel.findOne({email})
        
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
})

router.post('/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(email)
        const user = await UserModel.findOne({email});
    
        if(!user) {
            throw AuthServiceError.Unauthorized();
        }

        const tokens = createTokens(user.toJSON())

        const tokenData = await TokenModel.findOne({ user: user._id })

        await saveRefreshToken(tokenData, user, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false})
        
        res.send({user, tokens})

    } catch (e) {
        return res.status(e.status).json({msg: e.message});   
    }
})

router.post('/sign-out', async (req, res) => {
    const { refreshToken } = req.cookies
    const tokenData = await TokenModel.deleteOne({ refreshToken })
    
    res.clearCookie('refreshToken');

    res.send({
        msg: 'logged out',
        token: tokenData
    })
})

router.post('/refresh', async (req, res) => {
    try {
        const rt = req.cookies.refreshToken;
        
        const userData = validateRefreshToken(rt)

        const tokenInDB = await TokenModel.findOne({ refreshToken: rt })

        console.log(!userData || !tokenInDB)
        if(!userData || !tokenInDB) {
            throw AuthServiceError.Unauthorized()
        }

        const user = await UserModel.findById(userData._id)

        const tokens = createTokens(user.toJSON())
    
        const tokenData = await TokenModel.findOne({ user: user._id })

        await saveRefreshToken(tokenData, user, tokens.refreshToken)
    
        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false})

        res.send({user, tokens})
    } catch (e) {
        return res.status(e.status).json({msg: e.message});   
    }
})

module.exports = router;