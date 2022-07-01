const { Router } = require('express')
const JwtAuthController = require('../controllers/JwtAuthController')
const router = Router()

router.post('/sign-up', JwtAuthController.singUp)

router.post('/sign-in', JwtAuthController.signIn)

router.post('/sign-out', JwtAuthController.signOut)
 
router.post('/refresh', JwtAuthController.refresh)

module.exports = router;