const User = require('../models/user');
const uuid = require('uuid');
const constant = require('../config/const');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Validator } = require('node-input-validator');

let user = {
    login: async (req, res) => {
        try {
            //Check Validation
            const v = new Validator(req.body, {
                email: "required",
                password: "required"
            });
            const matched = await v.check();
            if (!matched) {
                return res.status(422).send({ success: 0, message: v.errors })
            }

            //Find user in database
            let userDetail = await User.findOne({
                email: req.body.email
            });

            if (!userDetail) {
                return res.status(200).send({ success: 0, message: "User Not Found" });
            }

            //Check Hashed Password Using Bcrypt
            let comparePassword = await comparePasswords(req.body.password, userDetail.password);
            if (!comparePassword) {
                return res.status(200).send({ success: 0, message: "Password does not match" })
            }

            //Sign Token using jwt
            const token = jwt.sign({ userId: userDetail.userId }, constant.JWTSECRET, { expiresIn: '6h' });

            //Update JWT Token In Database
            await User.findOneAndUpdate({
                userId: userDetail.userId
            }, {
                $set: {
                    jwt: token
                }
            });

            let data = {
                token: token,
                name: userDetail.name
            }

            return res.status(200).send({ success: 1, data: data });
        } catch (error) {
            console.log("Error: ", error)
            return res.status(500).send({ success: 0, message: "Internal Server Error" });
        }
    }
}

async function comparePasswords(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Comparison failed', error);
    }
}

module.exports = user;