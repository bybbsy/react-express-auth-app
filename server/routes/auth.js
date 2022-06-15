const { Router } = require('express')
const jwt = require('jsonwebtoken')

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


const users = [

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


router.post('/sign-up', (req, res) => {
    console.log(users)
    const username = req.body.username;
    const password = req.body.password;

     
    const candidate = users.filter(u => u.username === username)
    if(candidate[0]) {
        throw new Error("User already exists!")
    }

    const user = {
        username,
        password
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '30m'})
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '1d'})

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    users.push(user);

    res.send({
        user
    })
})

router.post('/sign-in', (req, res) => {
    console.log(users)
    const { username, password } = req.body;

    const candidate = users.filter(u => u.username === username);

    if(!candidate[0]) {
        throw new Error('There is no such user');
    }

    const user = {
        username,
        password
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '30m'})
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '1d'})

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    users.forEach(u => {
        if(u.username === username) {
            u.accessToken = accessToken;
            u.refreshToken = refreshToken
        }
    })

    res.send(user)

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