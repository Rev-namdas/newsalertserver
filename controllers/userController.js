require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require("../models/Users")


const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY,
        { expiresIn: 30 }
    )
}

const register = async (req, res) => {
    const { username, password, role } = req.body

    Users.findOne({ username }, async (err, user) => {
        if(err) throw err

        if(user) return res.status(202).json({ message: 'Username Already Exist!' })

        if(!user){
            const hashedPassword = await bcrypt.hashSync(password, parseInt(process.env.ENCRYPTER))

            const newUser = new Users({
                username: username,
                password: hashedPassword,
                role: role || 'user',
            })

            await newUser.save()
            return res.status(200).json({ message: 'User Created!' })
        }
    })
}

const login = async (req, res) => {
    const { username, password } = req.body

    Users.findOne({ username }, async (err, user) => {
        if(err) throw err
        if(!user) return res.status(202).json({ message: 'Incorrect Username!' })

        if(user){
            const passwordIsValid = await bcrypt.compareSync(password, user.password)

            if(!passwordIsValid) return res.status(202).json({ message: 'Incorrect Password!' })
            if(passwordIsValid){
                const token = generateAccessToken(user)

                return res.status(200).json({ message: "You are logged in!", token: token, role: user.role })
            }
        }
    })
}

module.exports = {
    login,
    register
}