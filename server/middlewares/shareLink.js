require('dotenv').config();
const redis = require('redis')
let jwt = require('jsonwebtoken');

function checkToken (req, res, next) {
    const { unique_token } = req.params;

    jwt.verify(unique_token, process.env.JWT_SHARING_SECRET, function (err, decoded) {
        console.log(unique_token)
        if (err) {
            return res.json({
                success: false,
                message: 'Sharing token is not valid'
            });
        } else {
            // console.log("Middleware!")
            // console.log(decoded)
            req.decoded = decoded;
            return next();
        }
    });
};

module.exports = {
  checkToken: checkToken
}