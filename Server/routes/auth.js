const express = require("express");
const User = require('../modules/UserSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/getuser')


// create user using :POST /api/auth
router.post('/', [body('name', "Name should not be empty").notEmpty(),
body('email', "email invalid").isEmail(),
body('password', 'Should me atleast 8 charachter').isLength({ min: 8 })
], async (req, res) => {
    try {
        //Validate that request data is appropriate (using express-validator)
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() })
        }
        // check if user already exist
        const { email } = req.body;
        const existingUser = await User.findOne({ email }, { email: 1 })
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        const data = {
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        };

        const user = await User.create(data);
        const token = jwt.sign(user.id, process.env.JWT_Secret)
        return res.status(201).json({ token: token }); // Add 'return' here

    }

    catch (err) {
        console.error(err.message);
        res.status(400).json({ err: err.message });
    }
});

// authenticate user using post, {No login require}

router.post('/login', [body('email', 'Enter Valid Email').isEmail(),
body('password', "Enter a Valid Password").exists()], async (req, res) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error })
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
           if (!user){
            return res.status(400).json("Invalid Credentials")
           }
        const passwordCompare = bcrypt.compare(password, user.password)
        if (! passwordCompare ){
            return res.status(400).json("Invalid Credentials")
        }
        const authToken = jwt.sign(user.id, process.env.JWT_Secret)
        res.status(201).json({authToken})
        //    return res.status(201).json({user})
    } catch (err) {
        console.log({ err })
        return res.status(500).json({ err: err.message })
    }
})

// route -3 getting user details with post using fetchUser middelware

router.post('/getuser', fetchUser , async (req,res)=>{
    try{
        console.log({user:req.user})
        const userid = req.user;
        const userData = await User.findById(userid).select("-password")
        res.status(200).json(userData)
    }catch (err) {
        console.log({ err })
        return res.status(500).json({ err: err.message })
    }
})

module.exports = router;

