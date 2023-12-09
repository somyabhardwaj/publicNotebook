const express = require("express");
const User = require('../modules/UserSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/getuser')


// create user using :POST /api/auth
router.post('/create', [
    body('name', "Name should not be empty").notEmpty(),
    body('email', "email invalid").isEmail(),
    body('password', 'Should be at least 8 characters').isLength({ min: 8 })
], async (req, res) => {
    let success = false; // Use let instead of const
    try {
        // Validate that request data is appropriate (using express-validator)
        const result = validationResult(req);
         
        if (!result.isEmpty()) {
            return res.status(400).send({ success: false, result:result.array()})
        }

        // check if user already exists
        const { email } = req.body;
        const existingUser = await User.findOne({ email }, { email: 1 })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
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
        success = true;
        return res.status(201).json({ success: true, token: token });

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ success, err: err.message });
    }
});

// authenticate user using post, {No login require}

router.post('/login', [body('email', 'Enter Valid Email').isEmail(),
body('password', "Enter a Valid Password").exists()], async (req, res) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({success: false, error })
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
           if (!user){
            return res.status(400).json({success: false,msg:"Invalid Credentials"})
           }
        const passwordCompare = bcrypt.compare(password, user.password)
        if (! passwordCompare ){
            return res.status(400).json({success: false,msg:"Invalid Credentials"})
        }
        const auth = jwt.sign(user.id, process.env.JWT_Secret)
        const authToken= auth.toString();
        res.status(201).json({success:true,authToken})
        //    return res.status(201).json({user})
    } catch (err) {
        console.log({ err })
        return res.status(500).json({ err: err.message })
    }
})

// route -3 getting user details with post using fetchUser middelware

router.post('/getuser', fetchUser , async (req,res)=>{
    try{
        
        const userid = req.user;
        const userData = await User.findById(userid).select("-password")
        return res.status(200).json({userData})
    }catch (err) {
       
        return res.status(500).json({ err: err.message })
    }
})

module.exports = router;

