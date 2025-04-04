const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

const login= async(req,res) => {
    const {email,password}  = req.body;
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide email and password"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Invalid credentials"});
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Invalid credentials"});
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{username:user.username},token});
}

module.exports = {login};