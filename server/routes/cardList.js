const { Router } = require('express')
const CardModel = require('../models/card')
const authMiddleware = require('../middleware/auth-middleware')

const router = Router()
 
/**
 * @swagger
 * /cards:
 *  get:
 *   description: Returns list of cards for authenticated users
 *   summary: Returns list of cards for authenticated users 
 *   tags:
 *    - Cards API
 *   parameters:
 *      - name: cookie
 *        description: contains refreshToken
 *        in: header
 *        required: true
 *        type: string
 *      - name: Authorization
 *        description: contains Bearer info
 *        in: header
 *        required: tue
 *        type: string
 *   responses:
 *      200:
 *       description: successful operation
 *      422:
 *       description: Invalid operation (Email or password are invalid or user already exists)
 *   security:
 *      - bearerAuth: []
 */  
router.get('/cards', authMiddleware, async (req, res) => {
    console.log('access')
    try { 
        console.log('access')
        const cards = await CardModel.find()
     
        res.send(cards)
    } catch (e) {
        console.log('e')
        res.send({ status: e.status, message: e.message })
    }
})

module.exports = router