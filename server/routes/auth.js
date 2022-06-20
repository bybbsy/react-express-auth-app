const { Router } = require('express')
const UserModel = require('../models/user')
const TokenModel = require('../models/token')

const jwt = require('jsonwebtoken')
const AuthServiceError = require('../models/error')

const router = Router()

const posts = [
    {
        username: 'Jeff',
        title: "Jeff's title"
    },
    {
        username: 'Jimmy',
        title: "Jimmi's post"
    },
    {
        username: 'Kyle',
        title: "Kyle's story"
    }
]


router.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '15s' });
    res.json({
        user,
        accessToken
    })
})

function validateAccessToken(token) {
    try {
        const userData = jwt.verify(token, process.env.ACCESS_TOKEN);
        return userData;
    } catch (e) {
        return null;
    }
}

function validateRefreshToken(token) {
    try {
        const userData = jwt.verify(token, process.env.REFRESH_TOKEN);
        return userData;
    } catch (e) {
        return null;
    }
}

router.post('/sign-up', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const candidate = await UserModel.findOne({email})
    
    if(candidate) {
        throw AuthServiceError.InvalidRequest("User already exists!")
    }

    const user = await UserModel.create({ email, password })

    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN, { expiresIn: '15s'})
    const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN, { expiresIn: '30s'})

    const tokenData = await TokenModel.findOne({ user: user._id })
    
    let token;
    if(tokenData) {
        tokenData.refreshToken = refreshToken;
        await tokenData.save();
    } else {
        token = await TokenModel.create({ user: user._id, refreshToken })
    }

    res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.send({ user, accessToken, refreshToken })
})

router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;
 
    const user = await UserModel.findOne({email});
 
    if(!user) {
        throw AuthServiceError.Unauthorized();
    }

    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN, { expiresIn: '15s'})
    const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN, { expiresIn: '30s'})

    const tokenData = await TokenModel.findOne({ user: user._id })
    
    let token;

    if(tokenData) {
        tokenData.refreshToken = refreshToken;
        await tokenData.save();
    } else {
        token = await TokenModel.create({ user: user._id, refreshToken })
    }

    res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false});
    
    const tokens = {
        accessToken,
        refreshToken
    }

    res.send({user, tokens})
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
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN, { expiresIn: '15s'})
        const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN, { expiresIn: '30s'})
    
        const tokenData = await TokenModel.findOne({ user: user._id })
        
        let token;
    
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            await tokenData.save();
        } else {
            token = await TokenModel.create({ user: user._id, refreshToken })
        }
    
        res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    
        const tokens = {
            accessToken,
            refreshToken
        }

        res.send({user, tokens});
    } catch (e) {
        console.log(e)
        return res.status(e.status).json({msg: e.message});   
    }
})


router.get('/posts', authenticateToken, (req, res) => {
    console.log('Request:', req.user)
     
    const userPosts = posts.filter(post => post.username === req.user.name)
    res.send({
        data: userPosts
    })
    
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log('Auth-Header', token)

    if(token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) return res.sendStatus(403); 
        req.user = user
        next()
    })
 
}


module.exports = router;