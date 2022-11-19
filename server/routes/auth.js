const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


//Route 1: Create a new user
router.post('/signup',[
    body('firstName', 'This field is required').notEmpty(),
    body('lastName', 'This field is required').notEmpty(),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be of atleast 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log({ errors: errors.array()} )
          return res.status(400).json({ errors: errors.array()});
        }

        try {
            // check whether user with this email already exist
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({success, validationError: "A user with this email already exist" })
            }
            var salt = bcrypt.genSaltSync(10);
            const secPass = bcrypt.hashSync(req.body.password, salt);

            user = await User.create({
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            var authtoken = jwt.sign(data, process.env.SECRET);
            success=true;
            res.send({success, authtoken })
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error has occured")
        }
    })

 //Route 2: Sign In a user using credentials
    router.post('/', [
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Password cannot be blank').notEmpty()
    ], async (req, res) => {
        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            // check whether user with this email  exist
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({success, ValidationError: "Please login using correct credentials" })
            };
            let passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({success, ValidationError: "Please login using correct credentials" })
            };
            const data = {
                user: {
                    id: user.id
                }
            }
            var authtoken = jwt.sign(data, process.env.SECRET);
            success=true;
            res.json({success, authtoken })
        } catch (error) {
            res.status(500).send("Internal server error has occured")
        }
    })
    

module.exports = router;