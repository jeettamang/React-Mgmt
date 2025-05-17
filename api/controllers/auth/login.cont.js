const { errorMessage, validationError, env } = require("@/library/functions")
const { User } = require("@/models")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class LoginController {
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email }).select('+password')

            if (user && bcrypt.compareSync(password, user.password)) {
                if (user.status) {
                    const token = jwt.sign({
                        uid: user._id,
                        iat: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
                    }, env('JWT_SECRET'))

                    return res.send({
                        token,
                        name: user.name,
                        email: user.email,
                        message: "Login successfully",
                    })
                } else {
                    return validationError(next, {
                        email: 'The account is deactivated.'
                    })
                }
            }

            // Unified error for both invalid email or password
            return validationError(next, {
                credentials: 'Email or password mismatch.'
            })
        } catch (error) {
            errorMessage(error)
        }
    }
}

module.exports = new LoginController
