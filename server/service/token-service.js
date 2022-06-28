
const TokenModel = require('../models/token')
const jwt = require('jsonwebtoken')

exports.createTokens = function(user) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '50s' })
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '60s' })

    return {
        accessToken,
        refreshToken
    }
}

exports.saveRefreshToken = async function(tokenData, user, refreshToken) {
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }

    const token = await TokenModel.create({ user: user._id, refreshToken })
    return token;
}

exports.validateAccessToken = function(token) {
    try {
        const userData = jwt.verify(token, process.env.ACCESS_TOKEN);
        return userData;
    } catch (e) {
        return null;
    }
}

exports.validateRefreshToken = function(token) {
    try {
        const userData = jwt.verify(token, process.env.REFRESH_TOKEN);
        return userData;
    } catch (e) {
        return null;
    }
}