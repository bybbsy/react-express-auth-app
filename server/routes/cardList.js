const { Router } = require('express')
const CardModel = require('../models/card')
const authMiddleware = require('../middleware/auth-middleware')

const router = Router()

router.get('/cards', authMiddleware, async (req, res) => {
    try { 
        const cards = await CardModel.find()
     
        res.send(cards)
    } catch (e) {
        res.send({ status: e.status, message: e.message })
    }
})

module.exports = router