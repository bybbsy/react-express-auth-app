const { Router } = require('express')
const UserModel = require('../models/user')
const TokenModel = require('../models/token')
const { createTokens, saveRefreshToken, validateRefreshToken, validateAccessToken } = require('../service/token-service')

const jwt = require('jsonwebtoken')
const AuthServiceError = require('../models/error')

const router = Router()

/**
 * @swagger
 * /sign-up:
 *  post:
 *   description: Accepts user credentials to register user and returns access and refresh tokens, registers user in db
 *   summary: Registers a new user account
 *   tags:
 *      - Auth API
 *   requestBody:
 *      description: asdas
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          required: true
 *                      password:
 *                          type: string
 *                          required: true
 *                   
 *   responses:
 *      200:
 *        description: Success sign-up
 *        headers:
 *          Set-Cookie:
 *              description: Contains JWT refresh token (refreshToken=JWT)
 *              type: string
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  user:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                  tokens:
 *                      type: object
 *                      properties:
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string 
 *      422:
 *        description: Invalid email or password or user already exist
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                       msg:
 *                           type: string
 *      500:
 *        description: Some internal server error
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                       msg:
 *                           type: string
 */

router.post('/sign-up', async (req, res) => {
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
})

/**
 * @swagger
 * /sign-in:
 *  post:
 *   description: Accepts user credentials to authenticate and returns access and refresh tokens
 *   summary: Authenticates existing user
 *   tags:
 *      - Auth API
 *   requestBody:
 *      description: asdsa
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          required: true
 *                      password:
 *                          type: string
 *                          required: true
 *                   
 *   responses:
 *      200:
 *        description: Success sign-in
 *        headers:
 *          Set-Cookie:
 *              description: Contains JWT refresh token (refreshToken=JWT)
 *              type: string
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  user:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                  tokens:
 *                      type: object
 *                      properties:
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string 
 *      422:
 *        description: Invalid email or password or user doesn't exist
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                       msg:
 *                           type: string
 *      500:
 *        description: Some internal server error
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                       msg:
 *                           type: string
 */

router.post('/sign-in', async (req, res) => {
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
})

/**
 * @swagger
 * /sign-out:
 *  post:
 *    description: Signs out user
 *    summary: Signs out user
 *    tags:
 *      - Auth API
 *    responses:
 *      200:
 *        description: Success log out
 *      500:
 *        description: Server internal error
 */
router.post('/sign-out', async (req, res) => {
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
})

/**
 * @swagger
 * /refresh:
 *  post:
 *    description: Refreshes user tokens
 *    summary: Refreshes user tokens
 *    tags:
 *      - Auth API
 *    responses:
 *      200:
 *        description: Success sign-up
 *        headers:
 *          Set-Cookie:
 *              description: Contains JWT refresh token (refreshToken=JWT)
 *              type: string
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  user:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                  tokens:
 *                      type: object
 *                      properties:
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string 
 *      401:
 *        description: Invalid token or provided token wasn't stored in database (it was expired or doesn't belong to this user)
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                       msg:
 *                           type: string
 *      500:
 *        description: Some internal server error
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                       msg:
 *                           type: string
 */
router.post('/refresh', async (req, res) => {
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
})

module.exports = router;