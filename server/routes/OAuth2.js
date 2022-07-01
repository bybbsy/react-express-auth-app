const { Router } = require('express')
const router = Router()


router.get('/sign-in', async (req, res) => {
    try {
        res.send({auth: { url: `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH2_CLIENT_ID}`}})
    } catch (e) {
        return res.status(e.status).json({msg: e.message});   
    }
})

router.get('/refresh', async (req, res) => {
    console.log(req.body)

    res.send({ msg: req.body })
})
module.exports = router